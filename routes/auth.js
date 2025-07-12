const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();
const dotenv = require('dotenv');
const {generateToken} = require('../utils/token'); 
dotenv.config();

router.post('/signup', async (req, res) => {
    const { username, password, role } = req.body;

    if(!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
    }
    
    try {
        // Check if user already exists
        let user = await User.findOne({ username });
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }
        // Create new user
        user = new User({
            username,
            password: await bcrypt.hash(password, 10), // Hash the password
        });
        if (role) {
            user.role = role; 
        }
        await user.save();
        res.status(201).json({ message: `${role ? role : 'User'} registered successfully` });
    } catch (error) {
        console.error('Signup error:', error);
        return res.status(500).json({ message: 'Server error' });
    }
});


router.post('/login', async (req, res) => {
    const { username, password, role } = req.body;
    if(!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
    }

    
    try {
        // Check if user already exists
        let user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        // Generate JWT token
        const token = generateToken(user, role);
        res.status(200).json({ token, message: 'Login successful' });
       
    } catch (error) {
        console.error('Login error:', error);
        return res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
