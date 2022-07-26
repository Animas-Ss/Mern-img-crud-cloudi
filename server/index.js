import {connectDB} from './db.js'
import { PORT } from './config.js'
import app from './app.js'


//coneccion con la base de datos 
connectDB();

//puerto de nuestro servidor
app.listen(PORT);
console.log(`Server is running port ${PORT}`);