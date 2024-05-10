"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMeController = exports.getLoginController = exports.getRegisterController = void 0;
const dataBase_1 = require("../../repositories/dataBase");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const mongodb_1 = require("mongodb");
const getRegisterController = async (req, res) => {
    try {
        const { username, password } = req.body;
        // Проверяем, существует ли пользователь с таким username
        const isUsed = await dataBase_1.usersCollection.findOne({ username });
        if (isUsed) {
            return res.status(402).json({ message: 'Данный username уже занят' });
        }
        // Хешируем пароль
        const salt = bcrypt_1.default.genSaltSync(10); // Сложность пароля
        const hash = bcrypt_1.default.hashSync(password, salt); // Хеширование пароля
        // Создаем новую запись пользователя
        await dataBase_1.db.collection('users').insertOne({ username, password: hash });
        res.send(201).json({ message: 'Регистрация прошла успешно.' });
    }
    catch (e) {
        res.send(500).json({ message: 'Ошибка при создании пользователя.' });
    }
};
exports.getRegisterController = getRegisterController;
const getLoginController = async (req, res) => {
    try {
        const { username, password } = req.body;
        // Поиск пользователя в базе данных по имени пользователя
        const user = await dataBase_1.usersCollection.findOne({ username });
        if (!user) {
            return res.status(401).json({ message: 'Такого пользователя не существует' });
        }
        // Проверка корректности пароля
        const isPasswordCorrect = await bcrypt_1.default.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(401).json({ message: 'Неверный пароль!' });
        }
        // Создание JWT для пользователя
        const token = jsonwebtoken_1.default.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' });
        // Отправка успешного ответа с токеном и информацией о пользователе
        res.status(200).json({
            token,
            user,
            message: 'Вы вошли в систему.'
        });
    }
    catch (e) {
        // Обработка ошибки аутентификации
        console.error('Ошибка авторизации:', e);
        res.status(500).json({ message: 'Ошибка авторизации.' });
    }
};
exports.getLoginController = getLoginController;
const getMeController = async (req, res) => {
    try {
        const userId = req.userId; // Предполагается, что userId является строкой
        const userIdObject = new mongodb_1.ObjectId(userId); // Преобразуем строку userId в ObjectId
        const user = await dataBase_1.usersCollection.findOne({ _id: userIdObject });
        if (!user) {
            return res.status(401).json({ message: 'Такого пользователя не существует' });
        }
        const token = jsonwebtoken_1.default.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' });
        res.json({ user, token });
    }
    catch (e) {
        res.json({ message: "нет доступа" });
    }
};
exports.getMeController = getMeController;
