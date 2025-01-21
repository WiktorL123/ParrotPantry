const mongoose = require('mongoose');

const weightRecordSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true,
        default: Date.now,
        unique: true
    },
    weight: {
        type: Number,
        required: true,
        min: 100,
        max: 10000
    }
}, { _id: false });

const parrotSchema = new mongoose.Schema({
    ownerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
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
        default: [],
        validate: {
            validator: (records) => {
                const uniqueDates = new Set(records.map((record) => record.date.toISOString()));
                return uniqueDates.size === records.length;
            },
            message: 'Duplicate weight records for the same date are not allowed.'
        }
    },
    historicalWeightRecords: {
        type: [[weightRecordSchema]],
        default: []
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: null
    }
}, { versionKey: false });

parrotSchema.pre('save', function (next) {
    this.updatedAt = new Date();
    next();
});

const Parrot = mongoose.model('Parrot', parrotSchema);

module.exports = Parrot;
