//importamos la funcion creada con mi contexto
import { usePost } from "../context/postContext";
import {Link} from 'react-router-dom';

import{VscEmptyWindow} from 'react-icons/vsc';

import { PostCard } from "../components/PostCard";

export const HomePage = () => {
    const {posts} = usePost();

    //validacion



    const renderMain = () => {
      if(posts.length === 0) {
        return(
          <div className="flex flex-col justify-center items-center">
            <VscEmptyWindow className="w-48 h-48 text-white"/>
            <h1 className="text-white text-2xl">Sin Publicaciones!!</h1>
          </div>
        )
      }

      return (
        <div className="grid grid-cols-4 gap-2">
        {posts.map(post => (
          <PostCard post={post} key={post._id}/>
        ))}
        </div>
      );

    }


  return (
    <div className="text-white">

      <div className="flex justify-between bg-zinc-800 py-4 px-2 mb-5 rounded-md">
        <h3 className="text-2xl text-gray-500 font-bold">Publicaciones {posts.length}</h3>
      <Link to='/new' className="bg-red-500 hover:bg-red-700 font-bold py-2 px-4 rounded-full ">Crea una publicacion</Link>
      </div>

      {renderMain()}
    </div>
  )
}
