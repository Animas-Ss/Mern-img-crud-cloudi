import Post from '../models/Post.js';
import { deleteImage, uploadImage} from '../libs/Cloudinary.js';
import fs from 'fs-extra';

export const getPosts =  async (req, res)=>{
    // para el manejo de errores lo hacemos con un try catch!!
    // para que no quede esperando respuesta returnamos una respuesta al cliente 
    // de dice el mensaje de error!!
    try {
        const posts = await Post.find()
        res.send(posts);
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
}

export const createPosts = async (req, res)=>{
 try {
       //destructuramos el cuerpo de lo que resivimos 
       const {title, description} = req.body;
       // inicializamos una variable apra guardar la direccion de la imagen y el id 
       // para luego guardar esos datos en nuestra base de datos 
       let image;

       //validacion si el elemento imagen es cargado realizar la subida a nuestro almacen de imagenes

       if(req.files?.image){
        const result = await uploadImage(req.files.image.tempFilePath);
        // para remover el archivo de la carpeta de temporales!!
        await fs.remove(req.files.image.tempFilePath);
        image = {
            url: result.secure_url,
            public_id: result.public_id
        }
    
       }
       // creamos un nuevos Post instancia de nuestro Schema !!
       // lo aguardamos en una variable asi podemos utilizarlo luego
       const newPost = new Post({title: title, description: description, image: image});
       console.log(newPost);
       // guardamos en la base de datos !!
       // como va a escribir nuestra base de datos es asincrono lo que significa que lleva await
       await newPost.save()
       return res.json(newPost);
 } catch (error) {
    return res.status(500).json({message: error.message});
 }
}

export const updatePosts = async (req, res)=>{
 try {
    //req.params = nos devuelve el id que se tipea
    //req.body = el cuerpo de la consulta 
    //{new: true} nos devuelve la consula actualizada 

    // buscamos la publicacion por id con findByIdAndUpdate y actualiza 
    const updatePost = await Post.findByIdAndUpdate(req.params.id, req.body, {new: true});
    //console.log(updatePost);
    return res.send(updatePost);
 } catch (error) {
    return res.status(500).json({message: error.message});
 }
}

export const deletePosts = async (req, res)=>{
try {
    //buscamos la publicacion por el id y la eliminamos de mi base de datos 
    const postRemoved = await Post.findByIdAndDelete(req.params.id);
    // validamos si el dato fue encontrado 
    // respondemos con codigo de estados sendStatus y le pasamos como parametro el codigo de estado
    if(!postRemoved) return res.sendStatus(404);

    // si el post tiene imagen con una id publico lo remuevo de mi almacen de imagenes en este caso cloudinary

    if(postRemoved.image.public_id){
        await deleteImage(postRemoved.image.public_id);
    }

   
    // si la publicacion fue encointrada significa se se elimino y respondemos con le codigo de estado 204
    return res.sendStatus(204);
} catch (error) {
    return res.status(500).json({message: error.message});
}
}

export const getPost = async (req, res)=>{
try {
    const post = await Post.findById(req.params.id)
    if(!post) return res.sendStatus(404);
    return res.json(post);
} catch (error) {
    return res.status(500).json({message: error.message});
}
}