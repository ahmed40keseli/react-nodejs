const Task = require('../models/task.js');
// const assProfile = require('./auth.js');

exports.creatTask = (req, res, next) => {
    // const { title, description, completed, assignProfile, startDate, endDate, reminderDate } = req.body;
    const { title, description, completed, assignProfile, endDate, reminderDate } = req.body;


    Task.create({
        title: title,
        description: description,
        completed: completed,
        assignProfile:assignProfile,
        // startDate:startDate,
        endDate:endDate,
        reminderDate:reminderDate
    })
    .then(result => {
        res.status(201).json({ message: "Task created successfully", task: result });
    })
    .catch(err => {
        console.error('Error creating task:', err);
        res.status(500).json({ message: "Error creating task" });
    });
};

exports.getTasks = async (req, res) => {
    try {
        const tasks = await Task.findAll();
        res.status(200).json({ tasks });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.detailTask = async (req, res) => {
    try {
        const task = await Task.findByPk(req.params.id);
        if (task) {
            res.status(200).json({ task });
        } else {
            res.status(404).json({ message: "Task not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateTask = async (req, res) => {
    try {
        const task = await Task.findByPk(req.params.id);
        if (task) {
            await task.update(req.body);
            res.status(200).json({ message: "Task updated successfully", task });
        } else {
            res.status(404).json({ message: "Task not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteTask = async (req, res) => {
    try {
        const task = await Task.findByPk(req.params.id);
        if (task) {
            await task.destroy();
            res.status(200).json({ message: "Task deleted successfully" });
        } else {
            res.status(404).json({ message: "Task not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
