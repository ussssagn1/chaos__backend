/*
    3-Я ПРОСЛОЙКА - УРОВЕНЬ ДОСТУПА К ДАННЫМ (DATA ACCESS LAYER)
*/


import {HeadphoneCollection} from "./dataBase";
import {HeadphoneType} from "../DBSettings/dbSettings";
import {HTTP_STATUSES} from "../utils";
import { Sort} from "mongodb";

export const headphonesRepository = {
    async findHeadphone(title: string | undefined, company: string, sortBy: string, sortOrder: any): Promise<HeadphoneType[]> {
        const filter: any = {};
        if (title) {
            filter.title = { $regex: title };
        }
        if (company) {
            filter.company = company;
        }

        const sortOptions: Sort = {};
        sortOptions[sortBy] = sortOrder;

        return await HeadphoneCollection.find(filter).sort(sortOptions).toArray();
    },
    async findHeadphoneByName(name: string) {
        return await HeadphoneCollection.findOne({name: name})
    },
    async createHeadphone(createdHeadphone: HeadphoneType) {
        await HeadphoneCollection.insertOne(createdHeadphone)
        return createdHeadphone;
    },
    async updateHeadphone(name: string, updateParams: Partial<HeadphoneType>) {
        const result = await HeadphoneCollection.updateOne({name: name}, { $set: updateParams})
        if(result.matchedCount) {
            return { status: HTTP_STATUSES.NO_CONTENT_204}
        } else {
            return { status: HTTP_STATUSES.NOT_FOUND_404}
        }
    },
    async deleteHeadphone(name: string) {
        const result = await HeadphoneCollection.deleteOne({name: name})
        return result.deletedCount === 1;
    }
}