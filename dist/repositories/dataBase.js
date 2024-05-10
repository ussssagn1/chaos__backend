"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.startDB = exports.usersCollection = exports.HeadphoneCollection = exports.db = exports.client = void 0;
const mongodb_1 = require("mongodb");
const mongoURI = process.env.mongoURI || 'mongodb://0.0.0.0:27017';
exports.client = new mongodb_1.MongoClient(mongoURI);
exports.db = exports.client.db('headphones');
exports.HeadphoneCollection = exports.db.collection('headphone');
exports.usersCollection = exports.db.collection('users');
async function startDB() {
    try {
        await exports.client.connect();
        await exports.client.db('headphones').command({ ping: 1 });
        console.log('Connected successfully to mongo server');
    }
    catch (e) {
        await exports.client.close();
        console.log(`Error connect to DataBase: ${e}`);
    }
}
exports.startDB = startDB;
