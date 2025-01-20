const Medicine = require("../models/MedicineNotification");

const getAllMedicines = async (req, res) => {
    try {
        const { parrotId } = req.params;
        const userId = req.user.id;

        if (!parrotId) {
            return res.status(404).json({ message: "Invalid ID format" });
        }

        const allMedicines = await Medicine.find({ parrotId, userId });

        if (!allMedicines.length) {
            return res.status(404).json({ message: "No medicines found." });
        }

        res.status(200).json(allMedicines);
    } catch (error) {
        res.status(500).json(error);
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

        if (!name || !description || !type || !date || !hour) {
            return res.status(400).json({ message: "All fields (name, description, type, date, hour) are required." });
        }

        const newMedicine = new Medicine({
            parrotId,
            userId,
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

        if (!parrotId) {
            return res.status(404).json({ message: "Invalid ID format" });
        }

        const deleteMedicine = await Medicine.findOneAndDelete({ _id: id, parrotId, userId });

        if (!deleteMedicine) {
            return res.status(404).json({ message: "No medicine found." });
        }

        res.status(200).json("Medicine notification deleted successfully.");
    } catch (error) {
        res.status(500).json(error);
    }
};

module.exports = {
    getAllMedicines,
    addMedicine,
    deleteMedicine,
};
