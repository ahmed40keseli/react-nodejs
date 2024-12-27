const jwt = require('jsonwebtoken');
require('dotenv').config();

// Token doğrulama middleware'i
const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'] && req.headers['authorization'].split(' ')[1]; // Token, Bearer <token> formatında olmalı

    if (!token) {
        return res.status(401).json({ message: 'Token gerekli!' }); // Token yoksa hata mesajı
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => { // Token doğrulama
        if (err) {
            return res.status(403).json({ message: 'Geçersiz token!' }); // Token geçersizse hata mesajı
        }

        req.user = decoded; // Token'dan gelen kullanıcı bilgilerini req.user'a ekliyoruz
        next(); // Sonraki middleware'e geçiş
    });
};

module.exports = verifyToken;