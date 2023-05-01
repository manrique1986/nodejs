
//Configuración del Server
//import express from 'express'
const express = require('express');
const app = express();
//librería independiente de path
const path = require('path');
//path noativo de node
//const path = require('node:path'); 
const hbs = require('hbs');
const userRouter = require('./router/userRouter');
/* const clientRouter = require('./router/clientRouter'); */
//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//uso de rutas
app.use('/', userRouter);
/* app.use('/client', clientRouter)
app.use('/product', productRouter)  */



//Configuramos el motor de Plantillas de HBS
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
hbs.registerPartials(path.join(__dirname, 'views/partials'));

/*
Imprime la ruta del directorio donde estoy parado
console.log(__dirname)
console.log(__dirname, 'views')
*/



//export app
module.exports = app;


