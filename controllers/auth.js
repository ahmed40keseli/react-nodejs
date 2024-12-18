const Auth = require('../models/auth.js');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// bazı kütüphaneleri dahil ediyor auth sql düzeni için jwt token işlemleri için

const Cregister = async(req,res) => { 
    try {
        const {username,email,user_password,referansNo} = req.body 
        // dışarıdan req beklediğimiz değerler
        const user = await Auth.findOne({ where: { email } }); 
        // gelen email verisini karşılaştırır 
        const referansnumber = await Auth.findOne({ where: { referansNo } }); 
        //gelen referansno karşılaştırılır


        if(user){
            return res.status(500).json({message: 'bu hesap zaten var'})
            // user(email) eğer veritabanında var ise bu hesap zaten var diye döner
        }
        if (referansnumber){
            return res.status(500).json({message: 'bu referans numarasi zaten var'})
            // eğer referansno veri tabanında var ise ozaman bu referans numarasi zaten var döner
        }
        if (referansNo.length < 6 ) {
            return res.status(500).json({message:"referans numarasi 6 haneden fazla olmali"})
            // referansno 6 karakterden az olamaz
        }
        if ( user_password.length < 6) {
            return res.status(500).json({message:"parolaniz 6 haneden fazla olmali"})
            // parola oluşturulurken 6 karakterden az olamaz
        }
        
        const newUser = await Auth.create({username,email,user_password,referansNo,roleId: 1})
        //yeni kayıt işlemini gerçekleştirir otomatik şirket kayıt ekranı olduğu için roleıd "1" olur

        const token = jwt.sign({ email: newUser.email }, process.env.JWT_SECRET, {
            expiresIn: '30m',
            }); 
            // 30dk geçerli olacak şekilde token oluşturulur token içinde sadece email tutulur

            await newUser.update({ token }); 
            // her giriş işlemi yapıldığında token işlemi yenilenir

        res.status(201).json({
            status: "OK",
            token,
            newUser,
            referansNo
        })
        // başarılı bir şekilde işlem gerçekleştirildiğinde response döner 

    }catch (error) {
        return res.status(500).json({message: error.message})
        //hata mesajı içeriği vs.    
    }
};

// şirket kayıtları için işlem yapar req ile giriş yapılan değerleri kontrol eder bazı değerlerin uzunlukları kont. edilir

const getAuth = async (req, res) => {
    try {
        const auths = await Auth.findAll();
        // tüm kişiler user tablosundan getirilir
        let allReferansNoKey = ['username','referansNo']
        // başlıkları oluşturulmuş array oluşturulur

        const newArray = auths.map(item => {
            // yeni değişken tanımlanır ve içinde döngü oluşturulur
            let newItem = {};
            // newitem adında değişken boş bir şekilde oluşturulur
            allReferansNoKey.forEach(key => {
              if (item[key] !== undefined) {
                // eğer veri boş dönmüyor ise
                newItem[key] = item[key];
                // teker teker başlıklar altına veriler oluşturulur
              }
            });
            return newItem;
            // ilk başta boş olan değişken teker teker doldurulmuş olarak geri döndürülür
            
          });
        res.status(200).json({ newArray });
        // işlem başarılı gerçekleştirildiğinde response döner
    } catch (error) {
        res.status(500).json({ message: error.message });
        //hata mesajı içeriği vs.    

    }
};

// tüm kullanıcıların isimlerini ve referans numaralarını getirir  

const register = async(req,res) => {
    try {
        const {username,email,user_password,referansNo} = req.body
        // kullanıcı tarafından girilen veriler çekilir
        const user = await Auth.findOne({ where: { email } });
        // veritabanından email karşılaştırıldıktan sonra

        if(user){
            return res.status(500).json({message: 'bu hesap zaten var'})
            // user(email) eğer veritabanında var ise bu hesap zaten var diye döner
        }
        if (referansNo.length < 6 ) {
            return res.status(500).json({message:"referans numarasi 6 haneden fazla olmali"})
            // eğer referansno veri tabanında var ise ozaman bu referans numarasi zaten var döner
        }
        if ( user_password.length < 6) {
            return res.status(500).json({message:"parolaniz 6 haneden fazla olmali"})
            // parola oluşturulurken 6 karakterden az olamaz
        }
        
        const newUser = await Auth.create({username,email,user_password,referansNo,roleId: 3})
        //yeni kayıt işlemini gerçekleştirir otomatik şirket kayıt ekranı olduğu için roleıd "3" olur


        const token = jwt.sign({ email: newUser.email }, process.env.JWT_SECRET, {
            expiresIn: '30m',
        }); 
        // 30dk geçerli olacak şekilde token oluşturulur token içinde sadece email tutulur

    
            await newUser.update({ token }); 
            // her giriş işlemi yapıldığında token işlemi yenilenir


        res.status(201).json({
            status: "OK",
            token,
            newUser,
            referansNo,
        })
        // başarılı bir şekilde işlem gerçekleştirildiğinde response döner 

    }catch (error) {
        return res.status(500).json({message: error.message}) 
        //hata mesajı içeriği vs.    
    }
};

// normal kullanıcıları kayıt işlemi için kullanılır ve bazı değerlerin uzunlukları kont. edilir

const login = async (req, res) => {
    try {
      const { email, user_password} = req.body;
        // kullanıcı tarafından girilen veriler çekilir
      const user = await Auth.findOne({ where: { email } });
        // veritabanından email karşılaştırıldıktan sonra
  
      if (!user) {
        return res.status(500).json({ message: "User not found" });
            // user(email) eğer veritabanında yok ise "User not found" mesaj döner
      }
  
      if (user_password !== user.user_password) {
        return res.status(500).json({ message: "Incorrect password" });
        // user_password karşılaştırılır eğer veritabanında yok ise "Incorrect password"
      }

      const token = jwt.sign({ userId: user.userId, username:user.username}, process.env.JWT_SECRET, {
        expiresIn: '30m',
        }); 
        // 30dk geçerli olacak şekilde token oluşturulur token içinde sadece email tutulur

        await user.update({ token });   
            // her giriş işlemi yapıldığında token işlemi yenilenir
  
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
        // başarılı bir şekilde işlem gerçekleştirildiğinde response döner 
  
    } catch (error) {
      return res.status(500).json({ message: error.message });
        //hata mesajı içeriği vs.    
    }
};

// email ve password ile giriş işlemlerini yapar ve aynı zamanda token oluşturur

const deleteAccount =async(req,res) => {
    try {
    const {email,user_password} = req.body ;
        // kullanıcı tarafından girilen veriler çekilir
    const user = await Auth.findOne({ where: { email } });
        // veritabanından email karşılaştırıldıktan sonra

    if (!user) {
        return { status: 'error', message: 'User not found.' };
            // user(email) eğer veritabanında yok ise "User not found" mesaj döner
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
        //hata mesajı içeriği vs.    
    }
};

// kullanıcıyı email ve password bilgilerini alarak veritabanından siler

const passwordReviz = async (req, res) => {
    try {
        const { username, email, user_password } = req.body;
        // kullanıcı tarafından girilen veriler çekilir
        const user = await Auth.findOne({ where: { email } });
        // veritabanından email karşılaştırıldıktan sonra

        if (!user) {
            return res.status(404).json({ status: 'error', message: 'User not found.' });
            // user(email) eğer veritabanında yok ise "User not found" mesaj döner
        }

        if (user.username === username) {
            // isimler aynı ise 
            await user.update({ user_password });
            // şifre yenilenir
            return res.status(200).json({
                status: "OK",
                message: "Password updated successfully.",
                user: {
                    email: user.email,
                    username: user.username,
                    password: user.user_password
                }
            });
        // başarılı bir şekilde işlem gerçekleştirildiğinde response döner 
        } else {
            return res.status(400).json({ message: "Incorrect username." });
        }
    } catch (error) {
        console.error('Error updating user:', error);
        return res.status(500).json({ status: 'error', message: 'An error occurred while processing your request.' });
        //hata mesajı içeriği vs.    
    }
};

module.exports = {register,login,deleteAccount,passwordReviz,Cregister,getAuth}

// controller işlemlerini paylaşıma açıyor
