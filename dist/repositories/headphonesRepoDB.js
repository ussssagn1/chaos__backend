"use strict";
/*
    3-Я ПРОСЛОЙКА - УРОВЕНЬ ДОСТУПА К ДАННЫМ (DATA ACCESS LAYER)
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.headphonesRepository = void 0;
const dataBase_1 = require("./dataBase");
const utils_1 = require("../utils");
exports.headphonesRepository = {
    async findHeadphone(title, company, sortBy, sortOrder) {
        const filter = {};
        if (title) {
            filter.title = { $regex: title };
        }
        if (company) {
            filter.company = company;
        }
        const sortOptions = {};
        sortOptions[sortBy] = sortOrder;
        return await dataBase_1.HeadphoneCollection.find(filter).sort(sortOptions).toArray();
    },
    async findHeadphoneByName(name) {
        return await dataBase_1.HeadphoneCollection.findOne({ name: name });
    },
    async createHeadphone(createdHeadphone) {
        await dataBase_1.HeadphoneCollection.insertOne(createdHeadphone);
        return createdHeadphone;
    },
    async updateHeadphone(name, updateParams) {
        const result = await dataBase_1.HeadphoneCollection.updateOne({ name: name }, { $set: updateParams });
        if (result.matchedCount) {
            return { status: utils_1.HTTP_STATUSES.NO_CONTENT_204 };
        }
        else {
            return { status: utils_1.HTTP_STATUSES.NOT_FOUND_404 };
        }
    },
    async deleteHeadphone(name) {
        const result = await dataBase_1.HeadphoneCollection.deleteOne({ name: name });
        return result.deletedCount === 1;
    }
};
