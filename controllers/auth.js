const Auth = require('../models/auth.js');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// bazı kütüphaneleri dahil ediyor auth sql düzeni için jwt token işlemleri için

const Cregister = async(req,res) => { 
    try {
        const {username,email,user_password,referansNo} = req.body // dışarıdan req beklediğimiz değerler
        const user = await Auth.findOne({ where: { email } });
        const referansnumber = await Auth.findOne({ where: { referansNo } });


        if(user){
            return res.status(500).json({message: 'bu hesap zaten var'})
        }
        if (referansnumber){
            return res.status(500).json({message: 'bu referans numarasi zaten var'})
        }
        if (referansNo.length < 6 ) {
            return res.status(500).json({message:"referans numarasi 6 haneden fazla olmali"})
        }
        if ( user_password.length < 6) {
            return res.status(500).json({message:"parolaniz 6 haneden fazla olmali"})
        }
        
        const newUser = await Auth.create({username,email,user_password,referansNo,roleId: 1})//yeni kayıt işlemini gerçekleştirir

        const token = jwt.sign({ email: newUser.email }, process.env.JWT_SECRET, {
            expiresIn: '30m',
            }); 
    
            await newUser.update({ token }); 

        res.status(201).json({ // true dönen değerlerin içeriği 
            status: "OK",
            token,
            newUser,
            referansNo
        })

    }catch (error) {
        return res.status(500).json({message: error.message})//hata mesajı içeriği vs.    
    }
};

// şirket kayıtları için işlem yapar req ile giriş yapılan değerleri kontrol eder bazı değerlerin uzunlukları kont. edilir

const getAuth = async (req, res) => {
    try {
        const auths = await Auth.findAll();
        let allReferansNoKey = ['username','referansNo']

        const newArray = auths.map(item => {
            let newItem = {};
            allReferansNoKey.forEach(key => {
              if (item[key] !== undefined) {
                newItem[key] = item[key];
              }
            });
            return newItem;
            
          });
        res.status(200).json({ newArray });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// tüm kullanıcıların isimlerini ve referans numaralarını getirir  

const register = async(req,res) => {
    try {
        const {username,email,user_password,referansNo} = req.body
        const user = await Auth.findOne({ where: { email } });

        if(user){
            return res.status(500).json({message: 'bu hesap zaten var'})
        }
        if (referansNo.length < 6 ) {
            return res.status(500).json({message:"referans numarasi 6 haneden fazla olmali"})
        }
        if ( user_password.length < 6) {
            return res.status(500).json({message:"parolaniz 6 haneden fazla olmali"})
        }
        
        const newUser = await Auth.create({username,email,user_password,referansNo,roleId: 3})

        const token = jwt.sign({ email: newUser.email }, process.env.JWT_SECRET, {
            expiresIn: '30m',
        }); 
    
            await newUser.update({ token }); 

        res.status(201).json({
            status: "OK",
            token,
            newUser,
            referansNo,
        })

    }catch (error) {
        return res.status(500).json({message: error.message}) 
    }
};

// normal kullanıcıları kayıt işlemi için kullanılır ve bazı değerlerin uzunlukları kont. edilir

const login = async (req, res) => {
    try {
      const { email, user_password} = req.body;
      const user = await Auth.findOne({ where: { email } });
  
      if (!user) {
        return res.status(500).json({ message: "User not found" });
      }
  
      if (user_password !== user.user_password) {
        return res.status(500).json({ message: "Incorrect password" });
      }

      const token = jwt.sign({ userId: user.userId, username:user.username}, process.env.JWT_SECRET, {
        expiresIn: '30m',
        }); 

        await user.update({ token });   
  
      res.status(200).json({
        status: "OK",
        token,
        user: {
            userId :user.userId,
            username: user.username,
            email: user.email,
            referansNo: user.referansNo,
            roleId: user.roleId
        },
      });
  
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
};

// email ve password ile giriş işlemlerini yapar ve aynı zamanda token oluşturur

const deleteAccount =async(req,res) => {
    try {
    const {email,user_password} = req.body ;
    const user = await Auth.findOne({ where: { email } });
    if (!user) {
        return { status: 'error', message: 'User not found.' };
    }
    if (user.user_password === user_password) {
        await user.destroy();
        return res.status(200).json({
            status: "OK",
            user,
            user_password
        })
    } else {
        return res.status(500).json({message:"Incorrect email or password."})
    }
    } catch (error) {
        console.error('Error deleting user:', error);
        return { status: 'error', message: 'An error occurred while processing your request.' };
    }
};

// kullanıcıyı email ve password bilgilerini alarak veritabanından siler

const passwordReviz = async (req, res) => {
    try {
        const { username, email, user_password } = req.body;

        const user = await Auth.findOne({ where: { email } });

        if (!user) {
            return res.status(404).json({ status: 'error', message: 'User not found.' });
        }

        if (user.username === username) {
            await user.update({ user_password });
            return res.status(200).json({
                status: "OK",
                message: "Password updated successfully.",
                user: {
                    email: user.email,
                    username: user.username,
                    password: user.user_password
                }
            });
        } else {
            return res.status(400).json({ message: "Incorrect username." });
        }
    } catch (error) {
        console.error('Error updating user:', error);
        return res.status(500).json({ status: 'error', message: 'An error occurred while processing your request.' });
    }
};

module.exports = {register,login,deleteAccount,passwordReviz,Cregister,getAuth}

// controller işlemlerini paylaşıma açıyor
