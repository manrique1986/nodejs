
//reaponde a la ruta '/'

const express = require('express');
const { check, body } = require('express-validator');
const router = express.Router();
const {
    homeUser,
    getLogin,
    getRegistro,
    loginUser,
    registerUser
} = require('../controllers/userController')


router.get('/', homeUser);
router.get('/login', getLogin);
router.get('/registro', getRegistro);
/* router.post(
    '/login', 
    [
        check('email').isEmail(),
        check('password').isLength({ min: 8 })
    ]
    ,loginUser
); */

router.post(
    '/login',
        body('email').isEmail(),
        body('password').isLength({ min: 8 })
    ,loginUser
); 

router.post(
    '/registro',
        body('nombre').isLength({min : 4}),
        body('email').isEmail(),
        body('password').isLength({ min: 8 })
    ,registerUser
); 







module.exports = router;