const Parrot = require('../models/Parrot');

const getAllParrots = async (req, res) => {
    try {
        const userId = req.user.id;
        const allParrot = await Parrot.find({ownerId: userId})

        if(!userId) {
            return res.status(404).json({message: 'User not found'});
        }

        if(!allParrot){
            return res.status(404).json({message: 'Parrots not found'})
        }

        if (allParrot.length === 0) {
            return res.status(404).json({ message: 'No parrots found for this user' });
        }

        return res.status(200).json(allParrot)
    }
    catch (error) {
        return res.status(400).json(error)
    }
}

const getParrotsById = async (req, res) => {
    try {
        const userId = req.user.id;
        const {id} = req.params;

        if (!userId) {
            return res.status(404).json({message: 'User not found'});
        }

        if (!id){
            return res.status(401).json({message: 'Invalid ID format'})
        }

        const parrot = await Parrot.findById({_id: id, ownerId: userId});
        if(!parrot){
            return res.status(404).json({message: 'Parrot not found'})
        }
        return res.status(200).json(parrot)
    }
    catch (error) {
        return res.status(400).json(error)
    }
}

const addParrot = async (req, res) => {
    try {
        const userId = req.user.id;
        const parrot = {...req.body, ownerId: userId};

        if(!userId) {
            return res.status(404).json({message: 'User not found'})
        }

        if (!parrot){
            return res.status(400).json({message: 'Request body empty'})
        }

        const newParrot = new Parrot(parrot)
        const saveParrot = await newParrot.save()

        return res.status(200).json({message: 'Parrot added successfully', saveParrot})
    }
    catch (error) {
        return res.status(400).json(error)
    }
}

const updateParrot = async (req, res) => {
    try {
        const userId = req.user.id;
        const {id} = req.params;

        if (!userId) {
            return res.status(404).json({message: 'User not found'})
        }

        if (!id){
            return res.status(400).json({message: 'Invalid ID format'})
        }

        const parrot = req.body;
        if (!parrot){
            return res.status(400).json({message: 'Request body empty'})
        }

        const updateParrot = await Parrot.findByIdAndUpdate({_id: id, ownerId: userId}, parrot, { new: true, runValidators: true })
        if(!updateParrot){
            return res.status(400).json({message: 'Parrot not found'})
        }

        return res.status(200).json({message: 'Parrot updated successfully'})
    }
    catch (error) {
        return res.status(400).json(error)
    }
}


const deleteParrot = async (req, res) => {
    try {
        const userId = req.user.id;
        const {id} = req.params;

        if (!userId) {
            return res.status(404).json({message: 'User not found'})
        }

        if (!id){
            return res.status(400).json({message: 'Invalid ID format'})
        }

        const deleteParrot = await Parrot.findByIdAndDelete({_id: id, ownerId: userId})
        if(!deleteParrot){
            return res.status(400).json({message: 'Parrot not found'})
        }

        return res.status(200).json({message: 'Parrot deleted successfully'})
    }
    catch (error) {
        return res.status(400).json(error)
    }
}


module.exports = {
    getAllParrots,
    getParrotsById,
    addParrot,
    updateParrot,
    deleteParrot,
}