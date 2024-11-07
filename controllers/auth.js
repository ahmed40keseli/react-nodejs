const Auth = require('../models/auth.js');
// const jwt = require('jsonwebtoken');

const register = async(req,res) => { // async = asenkron olmasını sağlar, kayıt işlemleri için
    try {
        const {username,email,user_password} = req.body // dışarıdan req beklediğimiz değerler
        const user = await Auth.findOne({ where: { email } });

        if(user){
            return res.status(500).json({message: 'bu hesap zaten var'})
        }
        if ( user_password.length < 6) {
            return res.status(500).json({message:"parolaniz 6 haneden fazla olmali"})
        }
        
        const newUser = await Auth.create({username,email,user_password})//yeni kayıt işlemini gerçekleştirir

        res.status(201).json({ // true dönen değerlerin içeriği 
            status: "OK",
            newUser,
        })

    }catch (error) {
        return res.status(500).json({message: error.message})//hata mesajı içeriği vs.    
    }
}

const login = async (req, res) => {
    try {
      const { email, user_password } = req.body;
      const user = await Auth.findOne({ where: { email } });
  
      if (!user) {
        return res.status(500).json({ message: "User not found" });
      }
  
      if (user_password !== user.user_password) {
        return res.status(500).json({ message: "Incorrect password" });
      }
  
      // You could generate and return a token here if using JWT
  
      res.status(200).json({
        status: "OK",
        user,  // send user data if needed
      });
  
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };
  

// const login = async(req,res) =>{ // async: a senkron olmasını sağlar, giriş işlemleri için kullanılır
//  try {
//     const {email,user_password} = req.body ; // kullanıcıdan gelen cevaplar 
//     const user = await Auth.findOne({ where: { email } });
//     if(!user){ // email databasede olmadığı zaman 
//         return res.status(500).json({message: "boyle bir kullanici bulunamadis"})//döneceği yanıt
//     }
//     if(user_password !== user.user_password){
//         return res.status(500).json({message:"Incorrect password"})
//     }

//     res.status(200).json({
//         status: "OK",
//         user,
//         user_password
//     })

//  } catch (error) {
//     return res.status(500).json({message:error.message})
//  }   
// }

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
}

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

module.exports = {register,login,deleteAccount,passwordReviz}

// const Auth = require('../models/auth')
// const jwt = require('jsonwebtoken');

// const test = (req,res) => {
//     res.json('test is working')
// }

// const registerUser = async (req,res) => {
//     try {
//         const {name, email, password} = req.body
//         if(!name) {
//             return res.json({
//                 error: 'name is required'
//             });
//         }
//         if(!password || password.lenght < 6 ){
//             return res.json({
//                 error: 'password is required and should be at least 6 characters long '
//             });
//         }
//         const exist = await Auth.findOne({email});
//         if (exist) {
//             return res.json({
//                 error:'email is taken already'
//             })
//         }
//         const user = await Auth.create({
//             user,
//             email,
//             password
//         })
//         return res.json(user)
//     } catch (error) {
//         console.log(error)
//     }
// }

// const loginUser = async (req, res) => {
//     try {
//         const {email, password} = req.body;
//         const user = await Auth.findOne({email});
//         if(!user) {
//             return res.json({
//                 error: 'no user found'
//             })  
//         }

//         const match = await comparePassword(password, user.password)
//         if(match){
//             jwt.sign({email:user.email, id:user._id, name:user.name},)
//         }
//         if(!match){
//             res.json({
//                 error:'passwords do not match '
//             })
//         }
//     } catch (error) {
//         console.log(error)
//     }
// }
// module.exports = {
//     test,
//     registerUser,
//     loginUser
// }