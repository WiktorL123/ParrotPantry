const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();


const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(401).json({ message: 'Email and password are required' });
        }

        const user = await User.findOne({email})
        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '600m'})
        return res.status(200).json({
            message: 'Login successful',
            token: token,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            userId: user._id,
            profileBackgroundColor: user.profileBackgroundColor,
        });
    }
    catch (error) {
        console.error("Error during login", error)
        return res.status(500).json(error)
    }
}

const logoutUser = async (req, res) => {
    try {
        res.status(200).json({message: 'Logged out successfully'})
    }
    catch (error) {
        console.error("Error during logout", error)
        return res.status(500).json(error)
    }
}


module.exports = {
    loginUser,
    logoutUser,
}