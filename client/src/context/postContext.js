//archivo que arma el contexto un contexto es una porcion de codigo que nos permite utilizar el mismo estado en diferentes 
//partes de nuestra aplicacion 

import { useState, createContext, useContext, useEffect} from "react";
//importotamos nuestra funcion de coneccion api
import { getPostRequests, createPostRequest, deletePostRequest, getPostIdRequest, updatePostRequest } from "../api/postApi";
// creamos el contexto
const postContext = createContext();
// luego lo usamos para encapsular a los children en la etiqueta <context.Provider>
// y asi poder pasarle valores o lo que queremos compartir en nuestor contexto

//creamos una funcion para que podamos usar el contexto creado en cualquier otra parte de nuestro entorno
export const usePost = () => {
  const context = useContext(postContext);
  return context;
}


export const PostProvider = ({children}) => {

    //console.log("Contenedor contex");
    const[posts, setPosts]=useState([]);

    //funcion para crear un nuevo post
    const createPost = async (post) => {
        //
     const res = await createPostRequest(post)

      //agregamos nuestra publiacion al estado!! usamos el spreate operetion!!
     setPosts([...posts, res.data])


     //intentamos optener una respuesta del bakend
     //console.log(res);
     
     //para poder ver la trasferencia de mi formulario al contexto global
     //console.log({postContext : post})
    }

    //funcion poara eliminar de nuestro contexto publiaciones
    const deletePost = async (id) => {
      //console.log(id);
      const res = await deletePostRequest(id);
      //console.log(res);
      if(res.status === 204) {
        setPosts(posts.filter((post)=> post._id !== id));
      }


    }

    // funcion para consultar a nuestra base de datos 
    const getPost = async () => {
      const res =  await getPostRequests();
      //console.log(res);
      setPosts(res.data);

    }

    //pedir un solo post

    const getPostId = async (id) => {
     const res = await getPostIdRequest(id);
     //console.log(res);
     return res.data
    }

    //actualizar datos

    const updatePost = async (id, post) => {
      const res = await updatePostRequest(id, post);
      //console.log(res);
      setPosts(posts.map((post) => (post._id === id? res.data : post)))
    }

    
    useEffect(()=>{
        getPost();
      },[]);

  return (
    <postContext.Provider value={{
        posts, // esto es igual a poner post: post,
        getPost,
        createPost,
        deletePost,
        getPostId,
        updatePost
        //setPost // y esto es igual a poner setPost: setPost
    }}>
        {children}
    </postContext.Provider>
  )
}

