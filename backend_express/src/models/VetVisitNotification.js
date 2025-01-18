const mongoose = require('mongoose');

const vetVisitNotificationSchema = new mongoose.Schema({
    parrotId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Parrot',
        required: true
    },
    vetId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Veterinarian',
        required: true
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
    },
    status: {
        type: String,
        required: true,
        enum: ['upcoming', 'completed', 'cancelled'],
        default: 'upcoming'
    }
}, {versionKey: false});


const vetVisitNotification =  mongoose.model('VetVisitNotification', vetVisitNotificationSchema, 'vetVisitNotifications');


module.exports = vetVisitNotification;