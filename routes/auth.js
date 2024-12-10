const express = require('express');
const userController = require('../controllers/auth.js');
const router = express.Router();

// bazı kütüphaneleri dahil ediyor userController işlem yapan fonk dahil eder ve router ile yönlendirme yapılır


router.get('/getAuth',userController.getAuth);
router.post('/register',userController.register);
router.post('/login',userController.login);
router.post('/deleteAccount',userController.deleteAccount);
router.post('/passwordReviz/:email',userController.passwordReviz);
router.post('/Cregister',userController.Cregister);

// tüm yönlendirmeler yapılır post get put delete vs.

module.exports = router;

// router işlemlerini paylaşıma açıyor
