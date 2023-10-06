//* importacion de la Referencia sobre la coleccion con su esquema determinado.
const { error } = require('console');
const User = require('../models/User');
const crypto = require('crypto')


const createUser = async(req, res) => {
   
    try {

        //* Validacion de email
        const userEmail = await User.findOne({ email: req.body.email})
        if(userEmail){
            throw new Error('Email en uso')
        }
        //!Encriptar contraseña
        

        //* Guardar informacion en mi base de datos

        const newUser = new User(req.body);
        await newUser.save();


        res.json({success: true, message: "Usuario Creado", info: newUser})
            
    } catch (error) {
        res.json({success: false, message: error.message})
    }
}

const getUsers = async(req, res) => {
    try {
        const users = await User.find().populate('favoriteProducts');
        res.json({success: true, info: users })
    } catch (error) {
        res.json({success: false, message: error.message})
    }
}

// Funciones actualizar y delete

const editUser = async(req, res) => {

    try {
        // throw new Error('error forzado')
        const {id} = req.params;
        const contain = req.body;

        const updateUser = await User.findByIdAndUpdate(id, contain, {new: true});

        res.json({success: true, msg: "usuario actualizado", updateUser})
    } catch (error) {
        res.status(500).json({success: false, message: error.message})
    }
}

const deleteUser =  async(req, res) => {
    try {
        // throw new Error('error forzado')
        const {id} = req.params;

        const destroyUser = await User.findByIdAndDelete(id);

        res.json({success: true, msg: "usuario eliminado", destroyUser})
    } catch (error) {
        res.status(500).json({success: false, message: error.message})
    }
}

module.exports = {createUser, getUsers, editUser, deleteUser};
