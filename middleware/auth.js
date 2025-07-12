const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
const User = require('../models/User');
const { generateToken } = require('../utils/token');



const auth = async (req, res, next, role) => {
    const token = req.headers['authorization']?.split(' ')[1]; 

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        if(role && role === 'admin') {
            const decoded = jwt.verify(token, process.env.ADMIN_JWT_SECRET);
            const user = await User.findById(decoded.id);
            if (!user) {
                return res.status(403).json({ message: 'Invalid token' });
            }
            if (user.role !== 'admin') {
                return res.status(403).json({ message: 'Forbidden: Insufficient permissions' });
            }
            user.role = 'admin'; 
            req.user = user; 
            next();
        }
        else{
            const decoded = jwt.verify(token, process.env.USER_JWT_SECRET);
            const user = await User.findById(decoded.id);

            if (!user) {
                return res.status(404).json({ message: 'Invalid token' });
            }

            req.user = user; 
            next(); 
        }
    } catch (error) {
        console.error('Authentication error:', error);
        return res.status(401).json({ message: 'Invalid token' });
    }
};

module.exports = {
    auth,
    userAuth: (req, res, next) => auth(req, res, next, 'user'),
    adminAuth: (req, res, next) => auth(req, res, next, 'admin')
};