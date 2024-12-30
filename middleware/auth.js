const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyToken = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization || req.headers['authorization'];
        // Authorization header'ını kontrol et
        
        if (!authHeader) {
            return res.status(401).json({ message: 'Authorization header bulunamadı!' });
        }

        if (!authHeader.startsWith('Bearer ')) {
        // Header'ın Bearer token formatında olduğunu kontrol et

            return res.status(401).json({ message: 'Geçersiz token formatı!' });
        }

        const token = authHeader.split(' ')[1];
        // Bearer'dan sonraki token'ı al        
        if (!token) {
            return res.status(401).json({ message: 'Token bulunamadı!' });
        }

        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        // Token'ı doğrula
            if (err) {
                console.error('Token doğrulama hatasi:', err);
                return res.status(403).json({ 
                    message: 'Geçersiz token!',
                    error: err.message 
                });
            }
            
            req.user = decoded;
            next();
        });

    } catch (error) {
        console.error('Middleware hatası:', error);
        return res.status(500).json({ 
            message: 'Token doğrulama sırasında bir hata oluştu',
            error: error.message 
        });
    }
};

module.exports = verifyToken;