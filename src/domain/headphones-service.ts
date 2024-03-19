/*
    2-Я ПРОСЛОЙКА - БИЗНЕС ЛОГИКА (BUSINESS LAYER)
*/


import {headphonesRepository} from "../repositories/headphonesRepoDB";

import {HeadphoneType} from "../DBSettings/dbSettings";

export const headphoneService = {
    async findHeadphone(title: string | undefined, company: string, sortBy: string, sortOrder: number): Promise<HeadphoneType[]> {
        return headphonesRepository.findHeadphone(title, company, sortBy, sortOrder);
    },
    async findHeadphoneByName(name: string) {
        return headphonesRepository.findHeadphoneByName(name)
    },
    async updateHeadphone(name: string, updateParams: Partial<HeadphoneType>) {
        return headphonesRepository.updateHeadphone(name, updateParams)
    },
    async deleteHeadphone(name: string) {
        return headphonesRepository.deleteHeadphone(name)
    },
    async createHeadphone(headphoneData: HeadphoneType) {
        return await headphonesRepository.createHeadphone(headphoneData);
    }

}