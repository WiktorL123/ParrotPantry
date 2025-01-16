const mongoose = require('mongoose');

const shopSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 100
    },
    url: {
        type: String,
        required: true,
        trim: true,
        match: /^https?:\/\/[^\s$.?#].[^\s]*$/
    },
    logo: {
        type: String,
        required: true,
        trim: true,
        match: /^https?:\/\/[^\s$.?#].[^\s]*$/
    },
    description: {
        type: String,
        required: true,
        trim: true,
        minlength: 10,
        maxlength: 500
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {versionKey: false});


const shop = mongoose.model('Shop', shopSchema);

module.exports = shop;