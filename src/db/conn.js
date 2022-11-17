require('dotenv').config()
const mongoose = require("mongoose");

mongoose.connect(`mongodb://localhost:27017/${process.env.COLLECTION}`)
    .then(() => {
        console.log("Sucess ! Coneected to mongo db");
    })
    .catch((e) => {
        console.log("Failed ! Not connected to mongo db" + e);
    })