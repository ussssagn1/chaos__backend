import express from 'express'
import {getHeadphonesRouter} from "./Routing/HeadPhonesRouter";
import {getAuthRouter} from "./Auth/Routes/Auth";

export const app = express()
export const jsonBodyMiddleware = express.json()

app.use(jsonBodyMiddleware)

const authRouter = getAuthRouter()
app.use('/api/auth', authRouter)

const headphonesRouter = getHeadphonesRouter()
app.use('/headphones', headphonesRouter)