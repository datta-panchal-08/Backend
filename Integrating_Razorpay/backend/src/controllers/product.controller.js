import { productModel } from "../models/product.model.js";

export const createProduct = async (req, res)=>{
    const { image, title, description, price: { amount, currency }, category } = req.body;
    try {
        const product = await productModel.create({
            image,title,description,price:{amount,currency},category
        });
        return res.status(201).json({
            message:"Product Created Successfully!",
            success:true,
            product
        })
    } catch (error) {
        console.log(error);
    }
}


export const getAllProducts = async (req,res)=>{
    try {
        const products = await productModel.find({});

        return res.status(200).json({
            message:"Fetched Products",
            success:true,
            products
        })
    } catch (error) {
        console.log("")
    }
}