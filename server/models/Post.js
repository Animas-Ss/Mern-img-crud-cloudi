// importamos mongoose y creamos un modelo de datos junto con su esquema !!
import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
        trim: true
    },
    description:{
        type: String,
        requiered: true,
        trim: true
    },
    image:{
        url: String,
        public_id: String
    }
});

export default mongoose.model('Post', postSchema);