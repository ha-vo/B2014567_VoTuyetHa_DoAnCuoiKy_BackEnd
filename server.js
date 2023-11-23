const app = require('./main.js');
const config = require('./src/config/db/index.js');
const Mongodb = require('./src/utils/mongodb.utils.js')

async function StartServer() {
    try {
        await Mongodb.connect(config.db.uri)
        console.log("connect successful")

        const PORT = config.app.port
        app.listen(PORT, () => {
            console.log(`app is running at http://localhost:${PORT}`);
        })

    } catch {
        console.log('connect failed')
        process.exit()
    }
}

StartServer()