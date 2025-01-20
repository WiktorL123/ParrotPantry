const FeedingNotification = require('../models/FeedingNotification')

const getAllFeedingNotifications = async (req, res) => {
    try {
        const {parrotId} = req.params;
        const userId  = req.user.id;

        if (!parrotId) {
            return res.status(404).json('Invalid ID format');
        }
        const allFeedingNotifications = await FeedingNotification.find({parrotId, userId})

        if (!allFeedingNotifications.length) {
            return res.status(404).json('No notifications Found');
        }

        return res.status(200).json(allFeedingNotifications);
    }
    catch (error) {
        res.status(500).json(error)
    }
}

const addFeedingNotification = async (req, res) => {
    try {
        const {parrotId} = req.params;
        const userId = req.user.id;

        const {name, description, type, date, hour}  = req.body

        if (!name || !description || !type || !date || !hour) {
            return res.status(400).json('Missing required fields');
        }

        const newFeedingNotification = new FeedingNotification({parrotId, name, description, type, date, hour});

        const savedFeedingNotification = await newFeedingNotification.save();
        return res.status(200).json({
            message: 'Added feeding notification',
            savedFeedingNotification
        });
    }

    catch (error) {
        res.status(500).json(error)
    }
}

const deleteFeedingNotification = async (req, res) => {
    try {
        const {parrotId, id} = req.params;
        const userId = req.user.id;

        if (!parrotId) {
            return res.status(404).json('Invalid ID format');
        }

        const deletedFeedingNotification = await FeedingNotification.findByIdAndDelete({_id: id, parrotId, userId})
        if (!deletedFeedingNotification) {
            return res.status(404).json(
                {message: 'No notification Found'});
        }
        return res.status(200).json(
            {message: ' Feeding notification deleted successfully.',
                deletedFeedingNotification
            });


    }
    catch (error) {
        res.status(500).json(error)
    }
}

module.exports = {
    getAllFeedingNotifications,
    addFeedingNotification,
    deleteFeedingNotification,
}