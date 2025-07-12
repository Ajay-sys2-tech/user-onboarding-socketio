const express = require('express');
const User = require('../models/User');
const router = express.Router();
const dotenv = require('dotenv');
const { adminAuth } = require('../middleware/auth');
dotenv.config();


router.get('/drop-off', adminAuth, async (req, res) => {
    try {
        let userData = await User.aggregate([
            {
                $match:{
                    role: { $ne: 'admin' }, // Exclude admin users
                }
            },
            {
                $group: {
                _id: '$chatStatus',
                dropOffs: { $sum: 1 }
                }
            },
            {
                $project:{
                    _id: 0,
                    screen: '$_id',
                    dropOffs: 1
                }
            },
            {
                $sort: { screen: 1 }
            }
        ]);

        console.log('User Data:', userData);
        if (!userData || userData.length === 0) {
            return res.status(404).json({ message: 'No users found' });
        }

        return res.status(200).json({
            data: userData
        });

    } catch (error) {
        console.error('Error fetching drop-off data:', error);
        res.status(500).json({ message: 'Server error' });
    }
}) 

module.exports = router;