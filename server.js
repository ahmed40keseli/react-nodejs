const app = require('./app');
const sequelize = require('./config/database.js');
require('dotenv').config();

const PORT = process.env.PORT || 8081;

sequelize.sync()
    .then(() => {
        console.log('Database connected and synchronized successfully.');
        app.listen(PORT, () => {
            console.log(`Server is running at port ${PORT}`);
        });
    })
    .catch(err => console.error('Error connecting or synchronizing database:', err));