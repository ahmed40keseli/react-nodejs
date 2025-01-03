const express = require('express');
const app = express();
const User = require('./routes/auth.js');
const Task = require('./routes/task.js'); 
require('dotenv').config();
const cors = require('cors');

// bazı kütüphaneleri dahil ediyor 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    exposedHeaders: ["Authorization"], // Authorization header'ını erişilebilir hale getir
  }));


// devreye sokar çalıştırmaya başlar

app.use('/',User);
app.use('/',Task);
// routers için kullanılır uzantıları ayarlar düzenler

app.use(express.static('public'));


module.exports = app;

// app işlemlerini paylaşıma açıyor