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

exports.getTasks = async (req, res) => { 
    try {
        const authorization = req.headers.authorization; 
        // Header'dan token alınıyor
        
        if (!authorization) {
            return res.status(401).json({ message: "Unauthorized - No Token Provided" });
            // eğer token yok ise hata döner
        }
        const token = authorization.split(' ')[1];

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const username = decoded.username;
        // Token çözülüyor ve içinden 'username' alınıyor

        const tasks = await Task.findAll({ where: { assignProfile: username } });
        // assignProfile başlığı altında username eklenerek aranır

        if (!tasks || tasks.length === 0) {
            return res.status(404).json({ message: "No tasks found for this user" });
            // eğer görev yok ise mesaj döner
        }
        return res.status(200).json({
            message: "Tasks retrieved successfully",
            tasks
            // başarı ile gerçekleşir ise mesaj ve veri döner
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "An error occurred", error: error.message });
        // hata mesajı döner
    }
};
// kişiye özel görevlerini getirir

exports.detailTask = async (req, res) => {
    try {
        const task = await Task.findByPk(req.params.id);
        // id alarak görev detayları gözükür
        if (task) {
            res.status(200).json({ task });
            // başarı ile gerçekleşir ise response ile task döner
        } else {
            res.status(404).json({ message: "Task not found" });
            // görev yok ise
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
        // hata mesajı döner
    }
};
// görev detaylarını getirir

exports.updateTask = async (req, res) => {
    try {
        const task = await Task.findByPk(req.params.id);
        // kullanıcıdan id alınarak görevleri bulunur
        if (task) {
            await task.update(req.body);
            // gelen kullanıcı verilerini alır ve update edilir
            res.status(200).json({ message: "Task updated successfully", task });
            // başarılı bir şekilde işlem gerçekleşirse mesaj döner
        } else {
            res.status(404).json({ message: "Task not found" });
            // eğer göreev yok ise mesaj döner
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
        // hata mesajı vs. 
    }
};
// görevi düzeltir update eder

exports.deleteTask = async (req, res) => {
    try {
        const task = await Task.findByPk(req.params.id);
        // id alınarak bulunur
        if (task) {
            await task.destroy();
            res.status(200).json({ message: "Task deleted successfully" });
            // silme işlemi gerçekleştirildikten sonra mesaj döner
        } else {
            res.status(404).json({ message: "Task not found" });
            // görev bulunamaz ise hta mesajı döner
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
        // hata mesajı döner
    }
};
// görevi silmek için kullanılır
