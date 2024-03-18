import {db, usersCollection} from "../../repositories/dataBase";
import {Request, Response} from "express";
import bcrypt from 'bcrypt'
import jwt, {Secret} from 'jsonwebtoken'
import {ObjectId} from "mongodb";

export const getRegisterController = async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;

        // Проверяем, существует ли пользователь с таким username
        const isUsed = await usersCollection.findOne({ username });
        if (isUsed) {
            return res.status(402).json({ message: 'Данный username уже занят' });
        }

        // Хешируем пароль
        const salt = bcrypt.genSaltSync(10); // Сложность пароля
        const hash = bcrypt.hashSync(password, salt); // Хеширование пароля

        // Создаем новую запись пользователя
        await db.collection('users').insertOne({ username, password: hash });

        res.send(201).json({ message: 'Регистрация прошла успешно.' });
    } catch (e) {
        res.send(500).json({message: 'Ошибка при создании пользователя.'})
    }
}

export const getLoginController = async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;

        // Поиск пользователя в базе данных по имени пользователя
        const user = await usersCollection.findOne({ username });
        if (!user) {
            return res.status(401).json({ message: 'Такого пользователя не существует' });
        }

        // Проверка корректности пароля
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(401).json({ message: 'Неверный пароль!' });
        }

        // Создание JWT для пользователя
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as Secret, { expiresIn: '30d' });

        // Отправка успешного ответа с токеном и информацией о пользователе
        res.status(200).json({
            token,
            user,
            message: 'Вы вошли в систему.'
        });
    } catch (e) {
        // Обработка ошибки аутентификации
        console.error('Ошибка авторизации:', e);
        res.status(500).json({ message: 'Ошибка авторизации.' });
    }
};

export const getMeController = async (req: Request, res: Response) => {
    try {
        const userId: string = (req as any).userId; // Предполагается, что userId является строкой

        const userIdObject = new ObjectId(userId); // Преобразуем строку userId в ObjectId

        const user = await usersCollection.findOne({ _id: userIdObject });

        if (!user) {
            return res.status(401).json({ message: 'Такого пользователя не существует' });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as Secret, { expiresIn: '30d' });

        res.json({ user, token });
    } catch (e) {
        res.json({ message: "нет доступа" });
    }
};