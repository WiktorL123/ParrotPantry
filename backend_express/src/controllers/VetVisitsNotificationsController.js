const VetVisitNotification = require("../Models/VetVisitNotification");
const Parrot = require('../models/Parrot')

const getAllVisitsNotification = async (req, res) => {
    try {
        const { parrotId } = req.params;
        const userId = req.user.id;

        if (!parrotId) {
            return res.status(404).json({ message: "Invalid ID format" });
        }

        const allVetVisits = await VetVisitNotification.find({ parrotId, ownerId: userId });

        if (!allVetVisits.length) {
            return res.status(404).json({ message: "No vet visits found" });
        }

        res.status(200).json(allVetVisits);
    } catch (error) {
        res.status(500).json(error);
    }
};

const addVetVisitNotification = async (req, res) => {
    try {
        const { parrotId, vetId } = req.params;
        const userId = req.user.id;

        if (!parrotId || !vetId) {
            return res.status(400).json({ message: "Invalid parrot ID or vet ID format." });
        }

        const { name, description, status, date, hour } = req.body;

        if (!name || !description || !status || !date || !hour) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const parrot = await Parrot.findOne({ _id: parrotId, ownerId: userId });
        if (!parrot) {
            return res.status(403).json({ message: "You do not have permission to add a vet visit for this parrot." });
        }

        const newVetVisitNotification = new VetVisitNotification({
            ownerId: userId,
            parrotId,
            vetId,
            name,
            description,
            date,
            hour,
            status,
        });

        const savedVetVisitNotification = await newVetVisitNotification.save();
        res.status(201).json(savedVetVisitNotification);
    } catch (error) {
        res.status(500).json({ message: "Error creating vet visit notification.", error: error.message });
    }
}
const deleteVetVisitNotification = async (req, res) => {
    try {
        const { parrotId, id } = req.params;
        const userId = req.user.id;

        // Walidacja danych wejściowych
        if (!parrotId || !id) {
            return res.status(400).json({ message: "Invalid parrot ID or notification ID format." });
        }

        // Sprawdzenie, czy papuga należy do użytkownika
        const parrot = await Parrot.findOne({ _id: parrotId, ownerId: userId });
        if (!parrot) {
            return res.status(403).json({ message: "You do not have permission to delete notifications for this parrot." });
        }

        // Usunięcie wizyty
        const deletedVetVisitNotification = await VetVisitNotification.findOneAndDelete({
            _id: id,
            parrotId,
        });

        if (!deletedVetVisitNotification) {
            return res.status(404).json({ message: "No notification found for the given parrot and user." });
        }

        res.status(200).json({ message: "Notification deleted successfully." });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getAllVisitsNotification,
    addVetVisitNotification,
    deleteVetVisitNotification,
};
