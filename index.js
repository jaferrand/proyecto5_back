const express = require("express");
const userRouter = require("./routes/userRoutes");
const productRouter = require('./routes/productRoutes')
const cameraRouters= require('./routes/cameraRouters')

require('dotenv').config();
//* traemos la coneccion de nuestra base de datos las servidor
require('./config/database');
//* Instanciamos express

const app = express();

//* middleware

app.use(express.json());

app.use('/users',userRouter);
app.use(productRouter);
app.use('/cameras', cameraRouters)


app.listen(process.env.PORT, () => console.log(`Servidor conectado en puerto: ${process.env.PORT}`))