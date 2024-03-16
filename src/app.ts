import express from 'express'
import {getHeadphonesRouter} from "./Routing/HeadPhonesRouter";

export const app = express()
export const jsonBodyMiddleware = express.json()

app.use(jsonBodyMiddleware)

const headphonesRouter = getHeadphonesRouter()

app.use('/headphones', headphonesRouter)