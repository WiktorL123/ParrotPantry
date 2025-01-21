const mongoose = require('mongoose');

const weeklyWeightNormSchema = new mongoose.Schema({
    day: {
        type: String,
        required: true,
        enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        trim: true
    },
    averageWeight: {
        type: Number,
        required: true,
        min: 100,
        max: 1000
    }
}, { _id: false });

const weightNormSchema = new mongoose.Schema({
    species: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 100
    },
    weeklyWeightNorms: {
        type: [weeklyWeightNormSchema],
        default: [],
        validate: {
            validator: (v) => v.length === 7,
            message: 'Weekly weight norms must contain exactly 7 days.'
        }
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, { versionKey: false });

const WeightNorm = mongoose.model('WeightNorm', weightNormSchema, 'weightNorms');

module.exports = WeightNorm;
