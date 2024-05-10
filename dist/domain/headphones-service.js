"use strict";
/*
    2-Я ПРОСЛОЙКА - БИЗНЕС ЛОГИКА (BUSINESS LAYER)
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.headphoneService = void 0;
const headphonesRepoDB_1 = require("../repositories/headphonesRepoDB");
exports.headphoneService = {
    async findHeadphone(title, company, sortBy, sortOrder) {
        return headphonesRepoDB_1.headphonesRepository.findHeadphone(title, company, sortBy, sortOrder);
    },
    async findHeadphoneByName(name) {
        return headphonesRepoDB_1.headphonesRepository.findHeadphoneByName(name);
    },
    async updateHeadphone(name, updateParams) {
        return headphonesRepoDB_1.headphonesRepository.updateHeadphone(name, updateParams);
    },
    async deleteHeadphone(name) {
        return headphonesRepoDB_1.headphonesRepository.deleteHeadphone(name);
    },
    async createHeadphone(headphoneData) {
        return await headphonesRepoDB_1.headphonesRepository.createHeadphone(headphoneData);
    }
};
