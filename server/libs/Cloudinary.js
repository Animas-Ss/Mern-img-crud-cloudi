import {v2 as cloudinary} from 'cloudinary';

cloudinary.config({
    cloud_name:"animas",
    api_key: "446523458312223",
    api_secret: "FjtkudtMpsXb1NA01miuVQYqZOs"
})

export const uploadImage = async (filePath) => {
    return await cloudinary.uploader.upload(filePath, {
        folder: 'post'
    })
}

export const deleteImage = async (id) => {
    return await cloudinary.uploader.destroy(id)
}
