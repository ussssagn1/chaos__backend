import {db} from "../../repositories/dataBase";
import {Request, Response} from "express";
import bcrypt from 'bcrypt'


export const getRegisterController = async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;

        // Проверяем, существует ли пользователь с таким username
        const isUsed = await db.collection('users').findOne({ username });
        if (isUsed) {
            return res.status(402).json({ message: 'Данный username уже занят' });
        }

        // Хешируем пароль
        const salt = bcrypt.genSaltSync(10); // Сложность пароля
        const hash = bcrypt.hashSync(password, salt); // Хеширование пароля

        // Создаем новую запись пользователя
        await db.collection('users').insertOne({ username, password: hash });

        res.json({ message: 'Регистрация прошла успешно.' });
    } catch (e) {
        res.json({message: 'Ошибка при создании пользователя.'})
    }
}

export const getLoginController = async (req: Request, res: Response) => {
    try {

    } catch (e) {

    }
}

export const getMeController = async (req: Request, res: Response) => {
    try {

    } catch (e) {

    }
}