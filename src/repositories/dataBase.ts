import {MongoClient} from "mongodb";
import {HeadphoneType} from "../DBSettings/dbSettings";

const mongoURI = process.env.mongoURI || 'mongodb://0.0.0.0:27017';

export const client = new MongoClient(mongoURI);
export const db = client.db('headphones');

export const HeadphoneCollection = db.collection<HeadphoneType>('headphone');

export async function startDB () {
    try {
        await client.connect();

        await client.db('headphones').command({ping: 1});
        console.log('Connected successfully to mongo server')
    } catch (e) {
        await client.close();
        console.log(`Error connect to DataBase: ${e}`);
    }
}