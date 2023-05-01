
const mongoose = require('mongoose');
const { MONGOLOCAL, MONGOATLAS} = require('../config/config');

//Conexion: Método 1

const getConnection = mongoose.connect(MONGOATLAS,{
    useNewUrlParser: true, 
    useUnifiedTopology: true
});

mongoose.connection.on('connected', ()=>{
    console.log(`Conexión a la Database correcta`);
});

mongoose.connection.on('error', ()=>{
    console.log(`Error en la conexión a la Database`);
});


//Conexión: Método 2
/*
const otraConnection = mongoose.connect(MONGOLOCAL)
.then(
    () => {console.log(`Database conectada`)},
    err => { console.log(`Error en la connection: ${err}`) }
    );
*/

module.exports = {
    getConnection
}