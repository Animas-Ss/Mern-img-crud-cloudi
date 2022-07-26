// archivo que relaciona mis variables de entorno con la coneccion con mi base de datos
// dotenv nos permite usar las variables de entorno
import dotenv from 'dotenv';

dotenv.config();

export const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1/testdb";
export const PORT = process.env.PORT || 3001;