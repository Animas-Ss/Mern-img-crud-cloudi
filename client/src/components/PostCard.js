import toast from 'react-hot-toast';
import { usePost } from '../context/postContext';
import { useNavigate } from 'react-router-dom';




export const PostCard = ({post}) => {

    const { deletePost } = usePost();
    const navigate = useNavigate();


    const handleDelete = (_id) =>{
        toast((t) =>(
            <div>
                <p className='text-white'>Seguro que desea Eliminar?<strong>{_id}</strong></p>
                <button
                className='bg-red-500 hover:bg-red-400 px-3 py-2 text-sm text-white rounded-sm mx-2'
                onClick={() =>{
                    deletePost(_id);
                    toast.dismiss(t._id);
                }}
                >Eliminar</button>
                <button 
                className='bg-slate-400 hover:bg-slate-600 px-3 py-2 text-sm text-white rounded-sm mx-2'
                onClick={() => toast.dismiss(t._id)}
                >Cancelar</button>
            </div>
        ), {
            style:{
                background:"#202020"
            }
        })
    }
  return (
    <div
    className="bg-zinc-800 text-white rounded-sm shadow-md shadow-black hover:bg-zinc-700 hover:cursor-pointer"
    onClick={() => navigate(`/posts/${post._id}`)}
    >
        <div className="px-4 py-5">
            <div className="w-full flex justify-center mb-3">
                <h3 className='font-bold'>
                 {post.title}
               </h3>
            </div>
           <p className='mb-2'>
            {post.description}
          </p>
          {post.image && <img src={post.image.url} className="w-40 h-40 rounded-full object-cover m-auto mb-2"/>}
          <div className='flex justify-end mt-6'>
          <button className="bg-red-400 hover:bg-red-600 px-2 py-1 text-sm rounded-md"
               onClick={(e) => {
                e.stopPropagation();
                handleDelete(post._id)
               }}
               >
                  Eliminar
               </button>
          </div>

        </div>
    </div>
  )
}
