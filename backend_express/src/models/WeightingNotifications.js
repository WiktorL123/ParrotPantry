const mongoose = require('mongoose');

const weightingNotificationSchema = new mongoose.Schema({
    parrotId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Parrot',
        required: true
    },
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 100
    },
    description: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        maxlength: 500
    },
    type: {
        type: String,
        required: true,
        enum: ['one-time', 'recurring']
    },
    date: {
        type: Date,
        required: true,
    },
    hour: {
        type: String,
        required: true,
        match: /^([01]\d|2[0-3]):([0-5]\d)$/
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, { versionKey: false });

const WeightingNotification = mongoose.model('WeightingNotification', weightingNotificationSchema, 'weightingNotifications');

module.exports = WeightingNotification;
