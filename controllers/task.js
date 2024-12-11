const Task = require('../models/task.js');
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

// exports.createTask = async (req, res) => {
//     try {
//         const token = req.headers["authorization"];
            
//         if (!token) {
//             return res.status(401).json({ message: "Token gerekli" });
//           }
          
//         const task = await Task.create(req.body);
//         console.log("Gelen token doğrulandı:", req.user);
//         res.status(201).json({ message: "Task created successfully", task });
//     } catch (err) {
//         console.error("Error creating task:", err);
//         res.status(500).json({ message: "Error creating task", error: err.message });
//     }
// };

exports.getTasks = async (req, res) => {
    try {
        const tasks = await Task.findAll();
        res.status(200).json({ tasks });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
// exports.getTasks = async(req,res)=>{
//     try {
//         const {referansNo,roleId} = req.body
//         const referansNoo = await Auth.findOne({ where: { referansNo } });

//         if(referansNoo){
//             return
//         }

//     } catch (error) {
//         res.status(500).json({ message: error.message });

//     }
// }

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
