import {app} from "./app";
import {startDB} from "./repositories/dataBase";
import dotenv from 'dotenv'
import cors from 'cors'

dotenv.config()

console.log('JWT_SECRET:', process.env.JWT_SECRET);

const PORT = process.env.PORT || 3000

const startApp = async () => {
    await startDB();
    app.use(cors())
    app.listen(PORT, () => {
        console.log(`Example app listening on port: http://localhost:${PORT}`)
    })
}

startApp();