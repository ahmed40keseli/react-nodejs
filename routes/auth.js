const express = require('express');
const userController = require('../controllers/auth.js');
const router = express.Router();

router.post('/register',userController.register);
router.post('/login',userController.login);
router.post('/deleteAccount',userController.deleteAccount);
router.post('/passwordReviz/:email',userController.passwordReviz);

module.exports = router;