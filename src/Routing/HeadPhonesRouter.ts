/*
    1-Я ПРОСЛОЙКА - ПРЕЗЕНТАЦИОННЫЙ СЛОЙ (PRESENTATION LAYER)
*/

import express from "express";
import {HTTP_STATUSES} from "../utils";
import {headphoneService} from "../domain/headphones-service";


export const getHeadphonesRouter = () => {
    const headphonesRouter = express.Router();

    headphonesRouter.get('/', async (req, res) => {
        const title: string | undefined = req.query.title as string | undefined;
        const company = req.query.company as string;
        const sortBy: string = req.query.sortBy as string || '_id';
        const sortOrder: number = parseInt(req.query.sortOrder as string) || 1;

        try {
            const foundHeadphones = await headphoneService.findHeadphone(title, company, sortBy, sortOrder);
            res.status(HTTP_STATUSES.OK_200).send(foundHeadphones);
        } catch (error) {
            console.error('Error fetching data', error);
            res.status(HTTP_STATUSES.INTERNAL_SERVER_ERROR_500).send({ error: 'Error fetching data' });
        }
    });

    headphonesRouter.get('/:name', async (req, res) => {
        const foundHeadphone = await headphoneService.findHeadphoneByName(req.params.name);
        if (!foundHeadphone) {
            res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
            return;
        }

        res.json(foundHeadphone);
    })

    headphonesRouter.post('/', async (req, res) => {
        const createdHeadphone = await headphoneService.createHeadphone(req.body.name);
        return res.status(HTTP_STATUSES.CREATED_201).json(createdHeadphone)
    })

    headphonesRouter.put('/:name', async (req, res) => {
        try {
            if (!req.body || Object.keys(req.body).length === 0) {
                return res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400);
            }

            const updateResult = await headphoneService.updateHeadphone(req.params.name, req.body);

            res.sendStatus(updateResult.status)
        } catch (e) {
            console.error("Error updating course:", e);
            res.sendStatus(HTTP_STATUSES.INTERNAL_SERVER_ERROR_500);
        }
    })

    headphonesRouter.delete('/:name', async (req, res ) => {
        const isDeleted = await headphoneService.deleteHeadphone(req.params.name)
        isDeleted ? res.sendStatus(HTTP_STATUSES.NO_CONTENT_204) : res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
    })

    return headphonesRouter;
}