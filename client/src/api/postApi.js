import axios from 'axios';

export const getPostRequests = async () => {
    return await axios.get('/posts');
}

export const createPostRequest = async (post) => {
    //instanciamos (creamos) un formulario
    const form = new FormData();

    for (let key in post) {
        form.append(key, post[key]);
    }

    return await axios.post('/posts', form, {
        headers: {
            "Content-type": "multipart/form-data",
        },
     });
};

export const deletePostRequest =  async (id) => {
    return await axios.delete('posts/' + id);
}

export const getPostIdRequest = async (id) => {
    return await axios.get('/posts/' + id);
}

export const updatePostRequest = async (id, newFields) => {
    return await axios.put(`/posts/${id}`, newFields);
}