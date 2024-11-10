const express = require('express');
const router = express.Router();
const taskController = require('../controllers/task.js');


router.get('/', taskController.getTasks);
router.post('/', taskController.creatTask);
router.get('/:id', taskController.detailTask);
router.put('/:id', taskController.updateTask);
router.delete('/:id', taskController.deleteTask);

module.exports = router;
