import express from 'express';
import mongoose from 'mongoose';

import Products from '../models/Products.js';

const router = express.Router();

export const getProducts = async (req, res) => { 
    try {
        const products = await Products.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(404).json({ getProducts_message: error.message });
    }
}

export const getProduct = async (req, res) => { 
    const { id } = req.params;

    try {
        const product = await Products.findById(id);
        res.status(200).json(product);
    } catch (error) {
        res.status(404).json({ getProduct_message: error.message });
    }
}

export const createProduct = async (req, res) => {
    console.log(req)
    const { productName,vat,qty,gprice,stock,image  } = req.body;

    const newProduct = new Products({ productName,vat,qty,gprice,stock,image })

    try {
        await newProduct.save();
        res.status(201).json(newProduct );
    } catch (error) {
        res.status(409).json({ createProduct_message: error.message });
    }
}

export const updateProduct = async (req, res) => {
    const { id } = req.params;
    
    const { productName,vat,qty,gprice,stock,image  } = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No product with id: ${id}`);
    const updatedProduct = { productName,vat,qty,gprice,stock,image, _id: id };
    await Products.findByIdAndUpdate(id, updatedProduct, { new: true });
    res.json(updatedProduct);
}

export const deleteProduct = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No Product with id: ${id}`);

    await Products.findByIdAndRemove(id);

    res.json({ message: "Product deleted successfully." });
}

export default router;