import Imagekit from 'imagekit';

const imagekit  = new Imagekit({
    privateKey:process.env.IMAGEKIT_PRIVATE_KEY,
    publicKey:process.env.IMAGEKIT_PUBLIC_KEY,
    urlEndpoint:process.env.IMAGEKIT_URL_ENDPOINT
});

export const uploadFile = async(file,filename)=>{
    const response = await imagekit.upload({
        file:file,
        fileName:filename,
        folder:"social-media"
    });
    return response;
}