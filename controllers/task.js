const Task = require('../models/task.js');
const jwt = require('jsonwebtoken');
require('dotenv').config();


exports.createTask = async (req, res) => {
    try {
        const token = req.headers["authorization"];
        if (!token) {
            return res.status(401).json({ message: "Token gerekli" });
          }
          jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
              return res.status(403).json({ message: "Geçersiz token" });
            }
        
            res.json({ message: `Merhaba ${decoded.username}, burası korunan bir sayfadır.` });
          });
          
        const task = await Task.create(req.body);
        console.log("Gelen token doğrulandı:", req.user);
        res.status(201).json({ message: "Task created successfully", task });
    } catch (err) {
        console.error("Error creating task:", err);
        res.status(500).json({ message: "Error creating task", error: err.message });
    }
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
