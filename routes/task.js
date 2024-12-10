const express = require('express');
const router = express.Router();
const taskController = require('../controllers/task.js');
const authenticateToken = require('../middleware/auth.js');

// bazı kütüphaneleri dahil ediyor userController işlem yapan fonk dahil eder ve router ile yönlendirme yapılır
    
// router.get('/getTasks', authenticateToken, taskController.getTasks);
router.post('/createTask', authenticateToken, taskController.createTask);
router.get('/getTasks', taskController.getTasks);
router.post('/createTask', taskController.createTask);
router.get('/detailTask/:id', taskController.detailTask);
router.put('/updateTask/:id', taskController.updateTask);
router.delete('/deleteTask/:id', taskController.deleteTask);

// tüm yönlendirmeler yapılır post get put delete vs.

module.exports = router;

// router işlemlerini paylaşıma açıyor
