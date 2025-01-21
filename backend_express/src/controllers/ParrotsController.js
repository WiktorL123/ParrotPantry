const Parrot = require('../models/Parrot');

const getAllParrots = async (req, res) => {
    try {
        const userId = req.user.id;

        const allParrots = await Parrot.find({ ownerId: userId });

        if (!allParrots || allParrots.length === 0) {
            return res.status(404).json({ message: 'No parrots found for this user' });
        }

        return res.status(200).json(allParrots);
    } catch (error) {
        return res.status(500).json({ message: 'Error retrieving parrots', error: error.message });
    }
};

const getParrotsById = async (req, res) => {
    try {
        const userId = req.user.id;
        const { id } = req.params;

        const parrot = await Parrot.findOne({ _id: id, ownerId: userId });

        if (!parrot) {
            return res.status(404).json({ message: 'Parrot not found' });
        }

        return res.status(200).json(parrot);
    } catch (error) {
        return res.status(500).json({ message: 'Error retrieving parrot', error: error.message });
    }
};

const addParrot = async (req, res) => {
    try {
        const userId = req.user.id;

        const parrot = { ...req.body, ownerId: userId };

        const newParrot = new Parrot(parrot);
        const savedParrot = await newParrot.save();

        return res.status(201).json({ message: 'Parrot added successfully', parrot: savedParrot });
    } catch (error) {
        return res.status(500).json({ message: 'Error adding parrot', error: error.message });
    }
};

const updateParrot = async (req, res) => {
    try {
        const userId = req.user.id;
        const { id } = req.params;

        const updatedParrot = await Parrot.findOneAndUpdate(
            { _id: id, ownerId: userId },
            req.body,
            { new: true, runValidators: true }
        );

        if (!updatedParrot) {
            return res.status(404).json({ message: 'Parrot not found' });
        }

        return res.status(200).json({ message: 'Parrot updated successfully', parrot: updatedParrot });
    } catch (error) {
        return res.status(500).json({ message: 'Error updating parrot', error: error.message });
    }
};

const deleteParrot = async (req, res) => {
    try {
        const userId = req.user.id;
        const { id } = req.params;

        const deletedParrot = await Parrot.findOneAndDelete({ _id: id, ownerId: userId });

        if (!deletedParrot) {
            return res.status(404).json({ message: 'Parrot not found' });
        }

        return res.status(200).json({ message: 'Parrot deleted successfully' });
    } catch (error) {
        return res.status(500).json({ message: 'Error deleting parrot', error: error.message });
    }
};

module.exports = {
    getAllParrots,
    getParrotsById,
    addParrot,
    updateParrot,
    deleteParrot,
};
