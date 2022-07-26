import {Formik, Form, Field, ErrorMessage} from 'formik';
// validaciones!! con yup
import * as Yup from 'yup';
import { usePost } from '../context/postContext';
import { useNavigate, useParams, Link } from 'react-router-dom';

import { useEffect, useState } from 'react';

import {AiOutlineLoading3Quarters} from 'react-icons/ai'


export const PostForm = () => {

  const {createPost, getPostId, updatePost} = usePost();
  const navigate = useNavigate(); // para poder usar la navegacion de react router sin refescar la pagina
  const params = useParams();
  const [post, setPost] = useState({
    title: "",
    description: "",
    image: null
  })

  useEffect(() => {
    // una funcion nombrada para poder utilizar asycn y await dentro de un useEffect
    (async ()=>{
      if(params.id){
        const post = await getPostId(params.id);
        setPost(post)
     }
    })();

  }, [params.id])

  return (
    <div className='flex items-center justify-center'>
      <div className='bg-zinc-800 p-10 shadow-md shadow-black'>
        <header className='flex items-center justify-between py-4 text-white'>
          <h3 className='text-xl'>Publicacion</h3>
          <Link to='/' className='text-gray-400 hover:text-gray-300 text-sm'>Atras</Link>
        </header>
      <Formik
      initialValues={post}
      //validaciones
      validationSchema = {Yup.object({
        title: Yup.string().required("Campo Obligatorio"),
        description: Yup.string().required("Campo Obligatorio")
      })}
      // vemos que hace la funcion onSubmit
      // podemos hacer esta funcion asincrona
      onSubmit = { async (values, actions) => {
        if(params.id){
          await updatePost(params.id, values);
        }else{
          await createPost(values);
        }
        //cambiar el envio a falso para que el boton se vuyelva a activar
        actions.setSubmitting(false);
        //navigate es un hook de react router nos permite navegar entre nuestra pagina
        navigate('/');
      }}
      enableReinitialize = {true}
      >
        {({handleSubmit, setFieldValue, isSubmitting}) =>(
                <Form onSubmit={handleSubmit} className="">
                  <label htmlFor='title'
                  className='text-sm block font-bold text-gray-400'
                  >Titulo</label>
                  <Field name='title' placeholder="Titulo"
                  className="px-3 py-2 focus:outline-none rounded bg-gray-600 text-white w-full"
                  />
                  <ErrorMessage component="div" className="text-red-400 text-sm" name='title'/>

                  <label htmlFor='description'
                  className='text-sm block font-bold text-gray-400'
                  >Descripcion</label>

                  <Field component="textarea" name='description' placeholder="Descripcion"
                  className="px-3 py-2 focus:outline-none rounded bg-gray-600 text-white w-full mb-4"
                  rows={3}
                  />
                  <ErrorMessage component="div" className="text-red-400 text-sm" name='description'/>
                  <label htmlFor='image'
                  className='text-sm block font-bold text-gray-400'
                  >Titulo</label>
                  <input type="file" name="image" 
                  className='px-3 py-2 focus:outline-none rounded bg-gray-600 text-white w-full mb-3' 
                  onChange={(e)=> setFieldValue('image', e.target.files[0])}
                  />
                  <button type='submit' 
                  className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-3 rounded-full block'
                  disabled= {isSubmitting}
                  >{isSubmitting ? (
                    <div className='flex items-center'>
                    <p>Cargando</p>
                    <div className='ml-3'>
                    <AiOutlineLoading3Quarters className='animate-spin h-4 w-4'/>
                    </div>
                    </div>
                   
                  ) : 'Guardar'}</button>
                </Form>
        )}

      </Formik>

      </div>
    </div>
  )
}
