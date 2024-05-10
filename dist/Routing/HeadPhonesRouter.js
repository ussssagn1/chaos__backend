"use strict";
/*
    1-Я ПРОСЛОЙКА - ПРЕЗЕНТАЦИОННЫЙ СЛОЙ (PRESENTATION LAYER)
*/
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHeadphonesRouter = void 0;
const express_1 = __importDefault(require("express"));
const utils_1 = require("../utils");
const headphones_service_1 = require("../domain/headphones-service");
const getHeadphonesRouter = () => {
    const headphonesRouter = express_1.default.Router();
    headphonesRouter.get('/', async (req, res) => {
        const title = req.query.title;
        const company = req.query.company;
        const sortBy = req.query.sortBy || '_id';
        const sortOrder = parseInt(req.query.sortOrder) || 1;
        try {
            const foundHeadphones = await headphones_service_1.headphoneService.findHeadphone(title, company, sortBy, sortOrder);
            res.status(utils_1.HTTP_STATUSES.OK_200).send(foundHeadphones);
        }
        catch (error) {
            console.error('Error fetching data', error);
            res.status(utils_1.HTTP_STATUSES.INTERNAL_SERVER_ERROR_500).send({ error: 'Error fetching data' });
        }
    });
    headphonesRouter.get('/:name', async (req, res) => {
        const foundHeadphone = await headphones_service_1.headphoneService.findHeadphoneByName(req.params.name);
        if (!foundHeadphone) {
            res.sendStatus(utils_1.HTTP_STATUSES.NOT_FOUND_404);
            return;
        }
        res.json(foundHeadphone);
    });
    headphonesRouter.post('/', async (req, res) => {
        const createdHeadphone = await headphones_service_1.headphoneService.createHeadphone(req.body.name);
        return res.status(utils_1.HTTP_STATUSES.CREATED_201).json(createdHeadphone);
    });
    headphonesRouter.put('/:name', async (req, res) => {
        try {
            if (!req.body || Object.keys(req.body).length === 0) {
                return res.sendStatus(utils_1.HTTP_STATUSES.BAD_REQUEST_400);
            }
            const updateResult = await headphones_service_1.headphoneService.updateHeadphone(req.params.name, req.body);
            res.sendStatus(updateResult.status);
        }
        catch (e) {
            console.error("Error updating course:", e);
            res.sendStatus(utils_1.HTTP_STATUSES.INTERNAL_SERVER_ERROR_500);
        }
    });
    headphonesRouter.delete('/:name', async (req, res) => {
        const isDeleted = await headphones_service_1.headphoneService.deleteHeadphone(req.params.name);
        isDeleted ? res.sendStatus(utils_1.HTTP_STATUSES.NO_CONTENT_204) : res.sendStatus(utils_1.HTTP_STATUSES.NOT_FOUND_404);
    });
    return headphonesRouter;
};
exports.getHeadphonesRouter = getHeadphonesRouter;
