const FeedingNotification = require('../models/FeedingNotification');
const Parrot = require('../models/Parrot'); // Model Parrot do weryfikacji właściciela papugi
const mongoose = require('mongoose');

// Pobranie wszystkich powiadomień
const getAllFeedingNotifications = async (req, res) => {
    try {
        const { parrotId } = req.params;
        const userId = req.user.id;

        console.log('User ID:', userId);
        console.log('Parrot ID:', parrotId);

        if (!parrotId) {
            return res.status(400).json({ message: 'Invalid ID format' });
        }

        // Weryfikacja właściciela papugi
        const parrot = await Parrot.findOne({
            _id: new mongoose.Types.ObjectId(parrotId),
            ownerId: new mongoose.Types.ObjectId(userId),
        });
        if (!parrot) {
            return res.status(403).json({ message: "You do not have permission to access this parrot's notifications." });
        }

        // Pobranie powiadomień dla tej papugi
        const allFeedingNotifications = await FeedingNotification.find({
            parrotId: new mongoose.Types.ObjectId(parrotId),
            ownerId: new mongoose.Types.ObjectId(userId),
        });

        if (!allFeedingNotifications.length) {
            return res.status(404).json({ message: 'No notifications found' });
        }

        return res.status(200).json(allFeedingNotifications);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Dodanie powiadomienia
const addFeedingNotification = async (req, res) => {
    try {
        const { parrotId } = req.params;
        const userId = req.user.id;
        const { name, description, type, date, hour } = req.body;

        if (!parrotId) {
            return res.status(400).json({ message: 'Invalid ID format' });
        }

        // Weryfikacja właściciela papugi
        const parrot = await Parrot.findOne({
            _id: new mongoose.Types.ObjectId(parrotId),
            ownerId: new mongoose.Types.ObjectId(userId),
        });
        if (!parrot) {
            return res.status(403).json({ message: "You do not have permission to add a notification for this parrot." });
        }

        if (!name || !description || !type || !date || !hour) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        const newFeedingNotification = new FeedingNotification({
            parrotId: new mongoose.Types.ObjectId(parrotId),
            ownerId: new mongoose.Types.ObjectId(userId),
            name,
            description,
            type,
            date,
            hour,
        });

        const savedFeedingNotification = await newFeedingNotification.save();
        return res.status(201).json({
            message: 'Added feeding notification',
            notification: savedFeedingNotification,
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Usunięcie powiadomienia
const deleteFeedingNotification = async (req, res) => {
    try {
        const { parrotId, id } = req.params;
        const userId = req.user.id;

        console.log('User ID:', userId);
        console.log('Parrot ID:', parrotId);

        if (!parrotId || !id) {
            return res.status(400).json({ message: 'Invalid ID format' });
        }

        // Weryfikacja właściciela papugi
        const parrot = await Parrot.findOne({
            _id: new mongoose.Types.ObjectId(parrotId),
            ownerId: new mongoose.Types.ObjectId(userId),
        });
        if (!parrot) {
            return res.status(403).json({ message: "You do not have permission to delete a notification for this parrot." });
        }

        // Usunięcie powiadomienia
        const deletedFeedingNotification = await FeedingNotification.findOneAndDelete({
            _id: new mongoose.Types.ObjectId(id),
            parrotId: new mongoose.Types.ObjectId(parrotId),
            ownerId: new mongoose.Types.ObjectId(userId),
        });
        if (!deletedFeedingNotification) {
            return res.status(404).json({ message: 'No notification found' });
        }

        return res.status(200).json({
            message: 'Feeding notification deleted successfully.',
            notification: deletedFeedingNotification,
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = {
    getAllFeedingNotifications,
    addFeedingNotification,
    deleteFeedingNotification,
};
