const Veterinarian = require('../models/Veterinarian');


const getAllVeterinarian = async (req, res) => {
    try {
        const allVeterinarians = await Veterinarian.find()

        if(!allVeterinarians){
            return res.status(404).send('Veterinarians not found');
        }

        return res.status(200).json(allVeterinarians);
    }
    catch (error) {
        return res.status(400).json(error)
    }
}

const getVeterinarianById = async (req, res) => {
    try {
        const id = req.params.id

        if(!id) {
            return res.status(400).json('Invalid ID format')
        }

        const veterinarian = await Veterinarian.findById(id)

        if(!veterinarian){
            return res.status(404).send('Veterinarian not found')
        }

        return res.status(200).json(veterinarian);
    }
    catch (error) {
        return res.status(400).json(error)
    }
}

const addVeterinarian = async (req, res) => {
    try {

        const veterinarian = req.body

        if(!veterinarian){
            return res.status(400).send('Request body empty')
        }

        const newVeterinarian = new Veterinarian(veterinarian)
        await newVeterinarian.save()
        return res.status(200).json(newVeterinarian);
    }
    catch (error) {
        return res.status(400).json(error)
    }
}


const updateVeterinarian = async (req, res) => {
    try {
        const id = req.params.id

        if(!id) {
            return res.status(400).send('Invalid ID format')
        }

        const veterinarian = req.body
        if(!veterinarian){
            return res.status(400).send('Request body empty')
        }

        const updateVeterinarian = await Veterinarian.findByIdAndUpdate(id, veterinarian)
        if(!updateVeterinarian){
            return res.status(404).send('Veterinarian not found')
        }
        return res.status(200).json({message: 'Veterinarian updated successfully'});
    }
    catch (error) {
        return res.status(400).json(error)
    }
}

const deleteVeterinarian = async (req, res) => {
    try {
        const id = req.params.id

        if(!id) {
            return res.status(400).send('Invalid ID format')
        }

        const deleteVeterinarian = await Veterinarian.findByIdAndDelete(id)
        if(!deleteVeterinarian){
            return res.status(404).send('Veterinarian not found')
        }

        return res.status(200).json({message: 'Veterinarian deleted successfully'});
    }
    catch (error) {
        return res.status(400).json(error)
    }
}

module.exports = {
    getAllVeterinarian,
    getVeterinarianById,
    addVeterinarian,
    updateVeterinarian,
    deleteVeterinarian,

}