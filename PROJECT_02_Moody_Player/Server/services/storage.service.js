import ImageKit from "imagekit";
import dotenv from 'dotenv';
dotenv.config();
var imageKit = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT
});

export const uploadFile = (file) => {
    return new Promise((resolve, reject) => {
        imageKit.upload({
            file: file.buffer,
            fileName: "hello"
        }, (error, result) => {
            if (error) {
                return reject(error);
            }else{
            resolve(result)
    }});
    })
}
