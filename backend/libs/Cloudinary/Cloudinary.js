import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv'


dotenv.config()
cloudinary.config({
    cloud_name : process.env.CLOUDINARY_CLOUD_NAME,
    api_key : process.env.CLOUDINARY_API_KEY,
    api_secret : process.env.CLOUDINARY_API_SECRET
})

const uploadImageClodinary = async(image)=>{
    const buffer = image?.buffer || Buffer.from(await image.arrayBuffer())

    const uploadImage = await new Promise((resolve,reject)=>{
        cloudinary.uploader.upload_stream({ folder : "ShopNX"},(error,uploadResult)=>{
            return resolve(uploadResult)
        }).end(buffer)
    })

    return uploadImage
}

const uploadMultipleImages = async (images) => {
    const uploadPromises = images.map(async (image) => {
        const buffer = image.buffer; // Get file buffer
        return new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream(
                { folder: "ShopNX" },
                (error, uploadResult) => {
                    if (error) reject(error);
                    else resolve(uploadResult.secure_url);
                }
            ).end(buffer);
        });
    });

    return Promise.all(uploadPromises); // Wait for all uploads to complete
};
    
export default uploadImageClodinary