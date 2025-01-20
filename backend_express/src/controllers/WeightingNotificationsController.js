const WeightingNotification = require('../models/WeightingNotifications');

const getAllWeighingNotifications = async (req, res) => {
    try {
        const { parrotId } = req.params;
        const userId = req.user.id;

        if (!parrotId) {
            return res.status(404).json({ message: "Invalid ID format" });
        }

        const allNotifications = await WeightingNotification.find({ parrotId, userId });

        if (!allNotifications.length) {
            return res.status(404).json({ message: "No notifications found" });
        }

        return res.status(200).json(allNotifications);
    } catch (error) {
        res.status(500).send(error);
    }
};

const addWeightingNotification = async (req, res) => {
    try {
        const { parrotId } = req.params;
        const userId = req.user.id;

        if (!parrotId) {
            return res.status(404).json({ message: "Invalid ID format" });
        }

        const { name, description, type, date, hour } = req.body;
        if (!name || !description || !type || !date || !hour) {
            return res.status(400).json({ message: "Missing required field" });
        }

        const newNotification = new WeightingNotification({
            parrotId,
            userId,
            name,
            description,
            type,
            date,
            hour,
        });

        const savedWeightingNotification = await newNotification.save();
        res.status(200).json({ message: "Weighting notification saved", notification: savedWeightingNotification });
    } catch (error) {
        res.status(500).send(error);
    }
};

const deleteWeightingNotification = async (req, res) => {
    try {
        const { parrotId, id } = req.params;
        const userId = req.user.id;

        if (!parrotId || !id) {
            return res.status(404).json({ message: "Invalid ID format" });
        }

        const deletedNotification = await WeightingNotification.findOneAndDelete({ _id: id, parrotId, userId });

        if (!deletedNotification) {
            return res.status(404).json({ message: "Weighting notification does not exist" });
        }

        res.status(200).json({ message: "Notification deleted successfully" });
    } catch (error) {
        res.status(500).send(error);
    }
};

module.exports = {
    getAllWeighingNotifications,
    addWeightingNotification,
    deleteWeightingNotification,
};
