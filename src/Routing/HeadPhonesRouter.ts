import express from "express";
import {HTTP_STATUSES} from "../utils";
import {headphonesRepository} from "../repositories/headphonesRepoDB";


export const getHeadphonesRouter = () => {
    const headphonesRouter = express.Router();

    headphonesRouter.get('/', async (req, res) => {
        const headphones = headphonesRepository.findHeadphone(req.query.title);
        const foundHeadphones = await headphones
        res.status(HTTP_STATUSES.OK_200).send(foundHeadphones)
    })

    headphonesRouter.get('/:name', async (req, res) => {
        const foundHeadphone = await headphonesRepository.findHeadphoneByID(req.params.name);
        if (!foundHeadphone) {
            res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
            return;
        }

        res.json(foundHeadphone);
    })

    headphonesRouter.post('/', async (req, res) => {
        const createdHeadphone = await headphonesRepository.createHeadphone(req.body.name);
        return res.status(HTTP_STATUSES.CREATED_201).json(createdHeadphone)
    })

    headphonesRouter.put('/:name', async (req, res) => {
        try {
            if (!req.body || Object.keys(req.body).length === 0) {
                return res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400);
            }

            const updateResult = await headphonesRepository.updateHeadphone(req.params.name, req.body);

            res.sendStatus(updateResult.status)
        } catch (e) {
            console.error("Error updating course:", e);
            res.sendStatus(HTTP_STATUSES.INTERNAL_SERVER_ERROR_500);
        }
    })

    headphonesRouter.delete('/:name', async (req, res ) => {
        const isDeleted = await headphonesRepository.deleteHeadphone(req.params.name)
        isDeleted ? res.sendStatus(HTTP_STATUSES.NO_CONTENT_204) : res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
    })

    return headphonesRouter;
}