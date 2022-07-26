// coneccion a mi base de datos!!

import mongoose from "mongoose";

// coneccion con mi archivo config!!
import { MONGODB_URI } from './config.js'

//funcion asincrona que me permite la coneccion con mi base de datos 
export async function connectDB (){
    try {
        const db = await mongoose.connect(MONGODB_URI)
        console.log("connected to", db.connection.name )
    } catch (error) {
        console.log(error)
    }
}
