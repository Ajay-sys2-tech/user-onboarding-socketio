const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const generateToken = (user, role) => {
    return jwt.sign(
        { id: user._id, username: user.username },
        role === 'admin' ? process.env.ADMIN_JWT_SECRET : process.env.USER_JWT_SECRET,                    
    );
};

const verifyToken = (token, role) => {
    try {
        return jwt.verify(token, role === 'admin' ? process.env.ADMIN_JWT_SECRET : process.env.USER_JWT_SECRET, );
    } catch (error) {
        console.error('Token verification failed:', error);
        return null;
    }
};

module.exports = {
    generateToken,  
    verifyToken,
};