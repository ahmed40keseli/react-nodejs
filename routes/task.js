const express = require('express');
const router = express.Router();
const taskController = require('../controllers/task.js');


router.get('/getTasks', taskController.getTasks);
router.post('/createTask', taskController.creatTask);
router.get('/detailTask/:id', taskController.detailTask);
router.put('/updateTask/:id', taskController.updateTask);
router.delete('/deleteTask/:id', taskController.deleteTask);

module.exports = router;
