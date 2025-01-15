const mongoose = require('mongoose');

const veterinarianSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 100
    },
    address: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        maxlength: 200
    },
    contact: {
        type: String,
        required: true,
        trim: true,
        match: /^\+\d{10,15}$/
    },
    specialization: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
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
    createdAt: {
        type: Date,
        default: Date.now
    }
});


const veterinarian = mongoose.model('Veterinarian', veterinarianSchema);


module.exports = veterinarian;