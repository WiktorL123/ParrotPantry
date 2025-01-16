const User = require('../models/User');



const registerUser = async (req, res) => {
    try {
        const {firstName, lastName, username, email, password} = req.body;

        if(!firstName || !lastName || !username || !email || !password || !password.trim()){
            return res.status(400).json({error: 'All fields are required'});
        }

        const existingUser = await User.findOne({email})

        if(existingUser){
            return res.status(400).json({error: 'User already exists'});
        }

        const newUser = new User({firstName, lastName, username, email, password})

        await newUser.save();

        res.status(201).json({ message: 'User registered successfully' });

    }
    catch(error) {
        console.error("Error during registration", error)
        return res.status(500).json(error)
    }
}

const getUserById = async (req, res) => {
    try {
        const id = req.params.id;

        if(!id){
            return res.status(400).json({error: 'Invalid ID format'});
        }

        const user = await User.findById(id)

        if(!user){
            return res.status(400).json({error: 'User not found'});
        }
        return res.status(200).json({user})
    }
    catch(error) {
        return res.stats(400).json(error)
    }
}

const updateUser = async (req, res) => {
    try {
        const id = req.params.id;
        if(!id){
            return res.status(400).json({error: 'Invalid ID format'});
        }

        const user = req.body
        if(!user){
            return res.status(400).json({error: 'Request body empty'});
        }

        const updateUser = await User.findByIdAndUpdate(id, user)
        if(!updateUser){
            return res.status(400).json({error: 'User not found'});
        }

        return res.status(200).json({message: 'User updated successfully'})
    }
    catch(error) {
        return res.status(400).json(error)
    }
}

const deleteUser = async (req, res) => {
    try {
        const id = req.params.id;
        if(!id){
            return res.status(400).json({error: 'Invalid ID format'});
        }

        const deleteUser = await User.findByIdAndDelete(id)
        if(!deleteUser){
            return res.status(400).json({error: 'User not found'});
        }

        return res.status(200).json({message: 'User deleted successfully'})
    }
    catch(error) {
        return res.status(400).json(error)
    }
}

module.exports = {
    registerUser,
    getUserById,
    updateUser,
    deleteUser
}