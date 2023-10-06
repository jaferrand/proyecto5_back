const Product = require('../models/Product');

const createProduct = async(req, res) => {
   
    try {
        //* Guardar informacion en mi base de datos

        const newProduct =  new Product(req.body);
        await newProduct.save();


        res.json({success: true, message: "Producto Creado", info: newProduct})
            
    } catch (error) {
        res.status(500).json({success: false, message: error.message})
    }
}

const getProducts = async(req, res) => {
    try {
        const products = await Product.find()
        res.json({success: true, msg: "Lista de productos", info: products})
    } catch (error) {
        res.status(500).json({success: false, message: error.message})
    }
}

module.exports = {getProducts, createProduct}