const Task = require('../models/task.js');
const Auth = require('../models/auth.js')
const jwt = require('jsonwebtoken');
require('dotenv').config();

// bazı kütüphaneleri dahil ediyor Task sql düzeni için jwt token işlemleri için

exports.createTask = async (req, res) => {
    try {
        // `authenticateToken` middleware'i sayesinde `req.user` kullanılabilir
        const task = await Task.create({
            ...req.body,
            createdBy: req.user.username, // Token'dan gelen username bilgisi
        });

        res.status(201).json({ message: "Task başarıyla oluşturuldu.", task });
    } catch (err) {
        console.error("Task oluşturulurken hata oluştu:", err);
        res.status(500).json({ message: "Task oluşturulamadı.", error: err.message });
    }
};

// token kontrol eder ve eğer var ise yeni bir görev oluşturur

exports.getTasks = async (req, res) => { 
    try {
        const token = req.headers.token; // Header'dan token alınıyor
        if (!token) {
            return res.status(401).json({ message: "Unauthorized - No Token Provided" });
        }

        // Token çözülüyor ve içinden 'username' alınıyor
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const username = decoded.username;

        console.log("Username:", username);

        const tasks = await Task.findAll({ where: { assignProfile: username } });

        if (!tasks || tasks.length === 0) {
            return res.status(404).json({ message: "No tasks found for this user" });
        }

        return res.status(200).json({
            message: "Tasks retrieved successfully",
            tasks
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "An error occurred", error: error.message });
    }
};

// exports.getTasks = async (req, res) => {
//     try {
//       const { userId,assignProfile } = req.body;
//     //   kullanıcının girmiş olduğu değerler
//       const idUser = await Auth.findAll();
//     //   tüm kullanıcıları getirir
//         let newTasksArray = {idUser}
//     if(!userId) {
//         return res.status(500).json({ message: "UserId not found" });
//     }
//     if (assignProfile === idUser.assignProfile) {
//         if ()
//         return 
//     }

//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

// tüm oluşturulmuş görevleri getirir

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

// görev detaylarını getirir

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

// görevi düzeltir update eder

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

// görevi silmek için kullanılır
