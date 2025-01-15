const mongoose = require('mongoose');
require('dotenv').config();

const dbUrl = process.env.DATABASE_URL

const connectDB = () => {
    mongoose.connect(dbUrl)
        .then(() => {
            console.log('MongoDB Connected');
        })
        .catch((err) => {
            console.error(err);
        })
}


module.exports = connectDB;