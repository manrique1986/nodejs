
//require('dotenv').config()
const app = require('./server');
//const PORT = process.env.PORT || 9000;
const { PORT } = require('./config/config');
require('./database/conexion');

//app.get()

//se lo utiliza para levantar la app 
app.listen(PORT, () =>{
    console.log(`Server corriendo en el puerto ${PORT}`);
});






