const app = require('./app');
const sequelize = require('./config/database.js');
require('dotenv').config();
// kütüphaneleri import eder 

const PORT = process.env.PORT || 8081;
// port adresi tarif edilir

sequelize.sync()
    .then(() => {
        console.log('Database connected and synchronized successfully.');
        // bağlanma başarılı ise mesaj döner
        app.listen(PORT, () => {
            console.log(`Server is running at port ${PORT}`);
            // porta bağlanır ve konsola bilgi döner
        });
    })
    .catch(err => console.error('Error connecting or synchronizing database:', err));
    // başarısız işlem halinde mesaj döner