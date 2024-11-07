// const express = require('express');
// const userController = require('../controllers/auth.js');
// const router = express.Router();

// router.post('/register',userController.register);
// router.post('/login',userController.login);
// router.post('/deleteAccount',userController.deleteAccount);
// router.post('/passwordReviz/:email',userController.passwordReviz);

// module.exports = router;

const express = require('express');
const router = express.Router();
const cors = require('cors');
const {test, registerUser} = require('../controllers/auth')

router.use(
    cors({
        credentials: true,
        origin: 'http://localhost:5173'
    })
)

router.get('/', test)
router.post('/register',registerUser)

module.exports = router