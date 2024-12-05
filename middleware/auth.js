const jwt = require('jsonwebtoken');
const Auth = require('../models/auth.js');

const authenticateToken = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(403).json({ message: 'Token gerekli!' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await Auth.findOne({ where: { token } });
        if (!user) {
            return res.status(403).json({ message: 'Geçersiz token!' });
        }

        req.user = decoded.userId;
        next();
    } catch (error) {
        res.status(403).json({ message: 'Geçersiz token!' });
    }
};

module.exports = authenticateToken;