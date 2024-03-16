import express from "express";
import {HTTP_STATUSES} from "../utils";
import {headphonesRepository} from "../repositories/headphonesRepoDB";


export const getHeadphonesRouter = () => {
    const headphonesRouter = express.Router();

    headphonesRouter.get('/', async (req, res) => {
        const headphones = headphonesRepository.findHeadphones(req.query.title);
        const foundHeadphones = await headphones
        res.status(HTTP_STATUSES.OK_200).send(foundHeadphones)
    })

    return headphonesRouter;
}