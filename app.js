const express = require('express');
const app = express();
const User = require('./routes/auth.js');
const Task = require('./routes/task.js'); 
require('dotenv').config();
// const sequelize = require('./config/database.js'); 
const cors = require('cors');

// app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(cors());

app.use('/',User);
app.use('/',Task);

module.exports = app;