
const { validationResult } = require('express-validator');
const Usuario = require('../models/userModel');
const bcrypt = require('bcrypt');



//Controladores de userRouter

const homeUser = (req, res) => {
    /*     console.log(req);
        console.log(req.url);
        console.log(req.headers); */   
        res.render('home')
}

const getLogin = (req, res) => {
    res.render('login')
}

const getRegistro = (req, res) => {
    res.render('registro')
}

const loginUser = async (req, res) => {

    let validacion = "Usuario o Contraseña incorrectos o Regístrese"

    const errores = validationResult(req);

    if(!errores.isEmpty()){
        return res.status(400).json({
            Errores: errores.array()
        })
    }
    //desestructurar variables
    const { email, password } = req.body;
    console.log(`1. Datos: ${email} - ${password}`); 

    //1. Buscamos el email para el login
    try {

        let usuario = await Usuario.findOne({ email })
        
        //2. imprimimos el email del user
        console.log(`2. Usuario: ${usuario}`);

        //3. Verificamos el user si no existe
        if(!usuario){
            return res.status(404).render('login', {
                validacion
            })
        }

        //4. Confirmamos el password
        let controlPassword = bcrypt.compareSync(password, usuario.password);

        //5. Imprimimos el reultado de la comparación
        console.log(`3. Verificación: ${controlPassword}`);
        
        //6. Respuesta a la comparación de password
        if(controlPassword){
            res.render('admin');
        }else{
            res.render('login', {
                validacion
            })
        }
    } catch (error) {
        res.status(404).render('error')
    }
}


const registerUser = async (req, res) => {
    //1. Verificamos los datos
    const errores = validationResult(req);
    if(!errores.isEmpty()){
        return res.status(400).json({
            Errores: errores.array()
        })
    }
    //2. Desestructurar variables
    const { nombre, email, password } = req.body;
    //3. Verificamos si ya existe el usuario
    try {
        let existeUsuario = await Usuario.findOne({ email });
        console.log(`Existe: ${existeUsuario}`);
        if(existeUsuario){
            return res.status(400).json({
                Errores: 'El usuario con ese email ya existe'
            })
        }
    //4. Si no existe, creamos el usuario
    let nuevoUsuario = new Usuario(req.body);
    console.log(`Nuevo User: ${nuevoUsuario}`);

    //5. Creamos la salt para encriptar el password
    const salt = bcrypt.genSaltSync();
    console.log(salt);

    //6. Mezclamos la salt con el password del user
    nuevoUsuario.password = bcrypt.hashSync(password, salt);
    console.log(nuevoUsuario.password);

    //7. Guardo el nuevo usuario en la database
    await nuevoUsuario.save();
    
    res.render('enviado');
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            Errores: 'Haremos lo posible para una soluición rápida'
        })
    }
}



module.exports = {
    homeUser,
    getLogin,
    getRegistro,
    loginUser,
    registerUser
}
