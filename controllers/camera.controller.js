const Camera = require('../models/Camera');

const createCamera = async(req, res) => {
   
    try {
        //* Guardar informacion en mi base de datos

        const newCamera =  new Camera(req.body);
        await newCamera.save();


        res.json({success: true, message: "Cámara Creado", info: newCamera})
            
    } catch (error) {
        res.status(500).json({success: false, message: error.message})
    }
}

const getCameras = async(req, res) => {
    try {
        const cameras = await Camera.find()
        res.json({success: true, msg: "Lista de Cámaras", info: cameras})
    } catch (error) {
        res.status(500).json({success: false, message: error.message})
    }
}

module.exports = {getCameras, createCamera}