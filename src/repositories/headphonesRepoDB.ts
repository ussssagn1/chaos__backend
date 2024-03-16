import {HeadphoneCollection} from "./dataBase";
import {HeadphoneType} from "../DBSettings/dbSettings";

export const headphonesRepository = {
    async findHeadphones(title: any): Promise<HeadphoneType[]> {
        const filter: any = {}
        if(title) {
            filter.title = {$regex: title}
        }

        return HeadphoneCollection.find(filter).toArray()
    },

}