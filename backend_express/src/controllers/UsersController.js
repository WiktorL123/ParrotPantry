const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


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

module.exports = {
    registerUser,
}