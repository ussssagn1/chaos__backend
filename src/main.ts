import {app} from "./app";
import {startDB} from "./repositories/dataBase";

const PORT = process.env.PORT || 5000

const startApp = async () => {
    await startDB();
    app.listen(PORT, () => {
        console.log(`Example app listening on port: http://localhost:${PORT}`)
    })
}

startApp()