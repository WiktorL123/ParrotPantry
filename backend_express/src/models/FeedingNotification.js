const mongoose = require('mongoose');

const feedingNotificationSchema = new mongoose.Schema({
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
        minlength: 10,
        maxlength: 500
    },
    amount: {
        type: Number,
        required: true,
        min: 1,
        max: 1000
    },
    date: {
        type: Date,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        required: true,
        enum: ['pending', 'completed', 'cancelled'],
        default: 'pending'
    }
}, {versionKey: false});


const feedingNotification = mongoose.model('FeedingNotification', feedingNotificationSchema, 'feddingNotifications');


module.exports = feedingNotification;