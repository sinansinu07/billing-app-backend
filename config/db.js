const mongoose = require("mongoose")

const configureDB = async () => {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/billing-app")
        console.log("Connected to Database")
    } catch(err) {
        console.log("Error Connecting to Database", err)
    }
}

module.exports = configureDB