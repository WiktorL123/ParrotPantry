const mongoose = require('mongoose');
const WeightingNotification = require('../models/WeightingNotifications');
const Parrot = require('../models/Parrot');

const getAllWeighingNotifications = async (req, res) => {
    try {
        const { parrotId } = req.params;
        const userId = req.user.id;

        console.log('Parrot ID:', parrotId);
        console.log('User ID:', userId);

        if (!parrotId) {
            return res.status(400).json({ message: "Invalid ID format" });
        }

        const parrot = await Parrot.findOne({
            _id: new mongoose.Types.ObjectId(parrotId),
            ownerId: new mongoose.Types.ObjectId(userId),
        });
        console.log('Parrot Query Result:', parrot);

        if (!parrot) {
            return res.status(403).json({ message: "You do not have permission to access this parrot's notifications." });
        }

        const allNotifications = await WeightingNotification.find({
            parrotId: new mongoose.Types.ObjectId(parrotId),
            ownerId: new mongoose.Types.ObjectId(userId),
        });

        if (!allNotifications.length) {
            return res.status(404).json({ message: "No notifications found" });
        }

        return res.status(200).json(allNotifications);
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};



const addWeightingNotification = async (req, res) => {
    try {
        const { parrotId } = req.params;
        const userId = req.user.id;

        const { name, description, type, date, hour } = req.body;

        if (!parrotId) {
            return res.status(400).json({ message: "Invalid ID format" });
        }

        const parrot = await Parrot.findOne({
            _id: new mongoose.Types.ObjectId(parrotId),
            ownerId: new mongoose.Types.ObjectId(userId),
        });
        if (!parrot) {
            return res.status(403).json({ message: "You do not have permission to add a notification for this parrot." });
        }

        if (!name || !description || !type || !date || !hour) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const newNotification = new WeightingNotification({
            parrotId: new mongoose.Types.ObjectId(parrotId),
            ownerId: new mongoose.Types.ObjectId(userId),
            name,
            description,
            type,
            date,
            hour,
        });

        const savedWeightingNotification = await newNotification.save();

        return res.status(201).json({
            message: "Weighting notification saved",
            notification: savedWeightingNotification,
        });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};


const deleteWeightingNotification = async (req, res) => {
    try {
        const { parrotId, id } = req.params;
        const userId = req.user.id;

        if (!parrotId || !id) {
            return res.status(400).json({ message: "Invalid ID format" });
        }

        const parrot = await Parrot.findOne({
            _id: new mongoose.Types.ObjectId(parrotId),
            ownerId: new mongoose.Types.ObjectId(userId),
        });
        if (!parrot) {
            return res.status(403).json({ message: `You do not have permission to delete a weighing notification for this parrot: ${parrotId}.` });
        }

        const deletedNotification = await WeightingNotification.findOneAndDelete({
            _id: new mongoose.Types.ObjectId(id),
            parrotId: new mongoose.Types.ObjectId(parrotId),
            ownerId: new mongoose.Types.ObjectId(userId),
        });

        if (!deletedNotification) {
            return res.status(404).json({ message: "Weighting notification does not exist" });
        }

        res.status(200).json({
            message: "Notification deleted successfully",
            notification: deletedNotification,
        });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};


module.exports = {
    getAllWeighingNotifications,
    addWeightingNotification,
    deleteWeightingNotification,
};
