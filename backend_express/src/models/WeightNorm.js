const mongoose = require('mongoose');

const weeklyWeightNormSchema = new mongoose.Schema({
    day: {
        type: String,
        required: true,
        enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'], // Dni tygodnia
        trim: true
    },
    averageWeight: {
        type: Number,
        required: true,
        min: 100,
        max: 1000
    }
});

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
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});


const weightNorm = mongoose.model('WeightNorm', weightNormSchema);


module.exports = weightNorm;