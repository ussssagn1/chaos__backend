import {app} from "./app";
import {startDB} from "./repositories/dataBase";
import dotenv from 'dotenv'

dotenv.config()

console.log('JWT_SECRET:', process.env.JWT_SECRET);

const PORT = process.env.PORT || 5000

const startApp = async () => {
    await startDB();
    app.listen(PORT, () => {
        console.log(`Example app listening on port: http://localhost:${PORT}`)
    })
}

startApp()