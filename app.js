const express = require('express');
const app = express();
const User = require('./routes/auth.js');
const Task = require('./routes/task.js'); 
// const bodyParser = require('body-parser');
// const cookieParser = require('cookie-parser')
require('dotenv').config();
const sequelize = require('./config/database.js'); 
const cors = require('cors');


app.use(express.json());
// app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
// app.use(bodyParser.json());
app.use(express.static('public'));
app.use(cors());

// app.get('/', (req, res) => {
//     return res.json("from backend side");
// });

// app.get('/users', async (req, res) => {
//     try {
//         const [data, fields] = await sequelize.query("SELECT * FROM users");
//         res.json(data);
//     } catch (err) {
//         res.json(err);
//     }
// });

app.use('/',User);
app.use('/',Task);

module.exports = app;
