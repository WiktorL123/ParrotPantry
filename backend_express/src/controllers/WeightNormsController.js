const WeightNorm = require("../models/WeightNorm");

const getAllWeightNorms = async (req, res) => {
    try {
        const allWeightNorms = await WeightNorm.find()

        if(!allWeightNorms) {
            return res.status(404).json({message: 'No weight norms found'})
        }

        return res.status(200).json(allWeightNorms)
    }
    catch (error) {
        return res.status(400).json(error)
    }
}

const getWeightNormById = async (req, res) => {
    try {
        const id = req.params.id;

        if(!id) {
            return res.status(400).json({message: 'Invalid ID format'})
        }

        const weightNorm = await WeightNorm.findById(id)
        if(!weightNorm) {
            return res.status(404).json({message: 'No weight norms found'})
        }

        return res.status(200).json(weightNorm)
    }
    catch (error) {
        return res.status(400).json(error)
    }
}


const addWeightNorm = async (req, res) => {
    try {
        const weightNorm = req.body
        if(!weightNorm) {
            return res.status(400).json({message: 'Request body empty'})
        }

        const newWeightNorm = new WeightNorm(weightNorm)
        await newWeightNorm.save()
        return res.status(200).json(newWeightNorm)
    }
    catch (error) {
        return res.status(400).json(error)
    }
}

const updateWeightNorm = async (req, res) => {
    try {
        const id = req.params.id;
        if(!id) {
            return res.status(400).json({message: 'Invalid ID format'})
        }

        const weightNorm = req.body
        if(!weightNorm) {
            return res.status(400).json({message: 'Request body empty'})
        }

        const updateWeightNorm = await WeightNorm.findByIdAndUpdate(id, weightNorm)
        if(!updateWeightNorm) {
            return res.status(404).json({message: 'Weight norm not found'})
        }
        return res.status(200).json({message: 'Weight norm updated successfully'})
    }
    catch (error) {
        return res.status(400).json(error)
    }
}

const deleteWeightNorm = async (req, res) => {
    try {
        const id = req.params.id;

        if(!id) {
            return res.status(400).json({message: 'Invalid ID format'})
        }

        const deleteWeightNorm = await WeightNorm.findByIdAndDelete(id)
        if(!deleteWeightNorm) {
            return res.status(4004).json({message: 'Weight norm not found'})
        }
        return res.status(200).json({message: 'Weight norm deleted successfully'})
    }
    catch (error) {
        return res.status(400).json(error)
    }
}

module.exports = {
    getAllWeightNorms,
    getWeightNormById,
    addWeightNorm,
    updateWeightNorm,
    deleteWeightNorm,
}