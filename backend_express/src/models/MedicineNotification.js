const mongoose = require('mongoose');

const medicineNotificationSchema = new mongoose.Schema({
    parrotId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Parrot',
        required: true
    },
    ownerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
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
    date: {
        type: Date,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    type: {
        type: String,
        required: true,
        enum: ['one-time', 'recurring']
    }
}, { versionKey: false });

const MedicineNotification = mongoose.model('MedicineNotification', medicineNotificationSchema, 'medicineNotifications');

module.exports = MedicineNotification;
