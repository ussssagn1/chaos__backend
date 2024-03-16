/*
    2-Я ПРОСЛОЙКА - БИЗНЕС ЛОГИКА (BUSINESS LAYER)
*/


import {headphonesRepository} from "../repositories/headphonesRepoDB";
import {HeadphoneType} from "../DBSettings/dbSettings";

export const headphoneService = {
    async findHeadphone (title: any) {
        return headphonesRepository.findHeadphone(title)
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