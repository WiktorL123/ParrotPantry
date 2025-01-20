const VetVisitNotification = require("../Models/VetVisitNotification");

const getAllVisitsNotification = async (req, res) => {
    try {
        const {parrotId} = req.params;

        if (!parrotId) {
            return res.status(404).json({message: "Invalid ID format"});
        }
        const allVetVisits = await VetVisitNotification.find({parrotId})
        if (!allVetVisits) {
            return res.status(404).json({message: "no vet visits found"});
        }
        res.status(200).json(allVetVisits);
    }
    catch (error) {
        res.status(500).json(error)
    }
}
const addVetVisitNotification = async (req, res) => {
    try {
        const {parrotId, vetId} = req.params;

        if(!parrotId || !vetId) {
            return res.status(400).json({message: "Invalid parrot ID format."});
        }
        const { name, description, status, date, hour } = req.body;

        if (!name || !description || !status || !date || !hour) {
            return res.status(400).json({message: "Missing required fields"});
        }

        const newVetVisitNotification = new VetVisitNotification(
            {parrotId,
                vetId,
                name,
                description,
                date,
                hour,
                status
            });
        const savedVetVisitNotification = await newVetVisitNotification.save();
        res.status(200).json(savedVetVisitNotification);

    }
    catch (error) {
        res.status(500).json(error)
    }
}

const deleteVetVisitNotification = async (req, res) => {
    try {
        const { parrotId, id } = req.params;

        if (!parrotId || !id) {
            return res.status(400).json({ message: "Invalid parrot ID or notification ID format." });
        }

        const deletedVetVisitNotification = await VetVisitNotification.findOneAndDelete({ _id: id, parrotId });

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
}