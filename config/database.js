const { Sequelize } = require('sequelize');
require('dotenv').config();
// bazı kütüphaneleri import ediyoruz

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql',
});
// database hakkında bilgileri env'den çekiyoruz  

sequelize.authenticate()
    .then(() => console.log('Database connected successfully.'))
    .catch(err => console.error('Error connecting to the database:', err));
// hata derlemesi yapıyor

module.exports = sequelize;
// database bağlanma işlemini paylaşıma açıyor