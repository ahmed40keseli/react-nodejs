const { Sequelize } = require('sequelize');
// projenizde veritabanı işlemleri için modern, kolay ve güçlü bir çözüm yoludur
require('dotenv').config();
// env dosyasındaki bilgileri çeker

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql',
});
// sequelize ile mysql'e bağlanıyoruz database hakkında bilgileri env'den çekiyoruz. Dialect, kullanacağınız veritabanı türünü belirtir

sequelize.authenticate()
    .then(() => console.log('Database connected successfully.'))
// bağlantı başarılı ise konsola mesaj yazdırıyor Veritabanı veya sistem bağlantısının geçerli olup olmadığını kontrol eder.
    .catch(err => console.error('Error connecting to the database:', err));
// hata derlemesi yapıyor

module.exports = sequelize;
// database bağlanma işlemini paylaşıma açıyor