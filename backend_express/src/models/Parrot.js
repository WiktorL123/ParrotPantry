const mongoose = require('mongoose');

const weightRecordSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true,
        default: Date.now
    },
    weight: {
        type: Number,
        required: true,
        min: 100,
        max: 1000
    }
});

const parrotSchema = new mongoose.Schema({
    ownerId: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 50
    },
    species: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 50
    },
    age: {
        type: Number,
        required: true,
        min: 0,
        max: 100
    },
    wingspan: {
        type: Number,
        required: true,
        min: 10,
        max: 100
    },
    food: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 50
    },
    lastVaccination: {
        type: Date
    },
    weightRecords: {
        type: [weightRecordSchema],
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: null
    }
});

const parrot = mongoose.model('Parrot', parrotSchema);

module.exports = parrot;
