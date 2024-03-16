import {HeadphoneCollection} from "./dataBase";
import {HeadphoneType} from "../DBSettings/dbSettings";
import {HTTP_STATUSES} from "../utils";

export const headphonesRepository = {
    async findHeadphone(title: any): Promise<HeadphoneType[]> {
        const filter: any = {}
        if(title) {
            filter.title = {$regex: title}
        }

        return HeadphoneCollection.find(filter).toArray()
    },
    async findHeadphoneByID(name: string) {
        let headphones = await HeadphoneCollection.findOne({name: name})
        return headphones
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