const Medicine = require("../models/MedicineNotification");
const Parrot = require("../models/Parrot");
const mongoose = require("mongoose");

const getAllMedicines = async (req, res) => {
    try {
        const { parrotId } = req.params;
        const userId = req.user.id;

        if (!parrotId) {
            return res.status(400).json({ message: "Invalid ID format" });
        }

        // Weryfikacja właściciela papugi
        const parrot = await Parrot.findOne({
            _id: new mongoose.Types.ObjectId(parrotId),
            ownerId: new mongoose.Types.ObjectId(userId),
        });
        if (!parrot) {
            return res.status(403).json({ message: "You do not have permission to access this parrot's notifications." });
        }

        // Pobranie powiadomień
        const allMedicines = await Medicine.find({
            parrotId: new mongoose.Types.ObjectId(parrotId),
            ownerId: new mongoose.Types.ObjectId(userId),
        });

        if (!allMedicines.length) {
            return res.status(404).json({ message: "No medicines found." });
        }

        res.status(200).json(allMedicines);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};


const addMedicine = async (req, res) => {
    try {
        const { parrotId } = req.params;
        const userId = req.user.id;

        const { name, description, type, date, hour } = req.body;

        if (!parrotId) {
            return res.status(400).json({ message: "Invalid parrot ID format." });
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
            return res.status(400).json({ message: "All fields (name, description, type, date, hour) are required." });
        }

        const newMedicine = new Medicine({
            parrotId: new mongoose.Types.ObjectId(parrotId),
            ownerId: new mongoose.Types.ObjectId(userId),
            name,
            description,
            type,
            date,
            hour,
        });

        const savedMedicine = await newMedicine.save();

        res.status(201).json({
            message: "Medicine notification created successfully.",
            notification: savedMedicine,
        });
    } catch (error) {
        res.status(500).json({ message: "Error creating medicine notification.", error: error.message });
    }
};
const deleteMedicine = async (req, res) => {
    try {
        const { parrotId, id } = req.params;
        const userId = req.user.id;

        if (!parrotId || !id) {
            return res.status(400).json({ message: "Invalid ID format" });
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
        const deletedMedicine = await Medicine.findOneAndDelete({
            _id: new mongoose.Types.ObjectId(id),
            parrotId: new mongoose.Types.ObjectId(parrotId),
            ownerId: new mongoose.Types.ObjectId(userId),
        });

        if (!deletedMedicine) {
            return res.status(404).json({ message: "No medicine found." });
        }

        res.status(200).json({
            message: "Medicine notification deleted successfully.",
            notification: deletedMedicine,
        });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};
module.exports = {
    getAllMedicines,
    addMedicine,
    deleteMedicine,
}