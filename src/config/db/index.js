let config = {
    app: {
        port: process.env.PORT || 5000
    },
    db: {
        uri: process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/ban_my_pham"
    }
}

module.exports = config