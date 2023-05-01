

require('dotenv').config();

const PORT = process.env.PORT || 9000;
const MONGOLOCAL = process.env.MONGOLOCAL;
const MONGOATLAS = process.env.MONGOATLAS;


module.exports = {
    PORT,
    MONGOLOCAL,
    MONGOATLAS
}

