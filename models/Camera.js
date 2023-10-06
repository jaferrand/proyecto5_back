const mongoose = require('mongoose');

// const cacSpecialSchema = new mongoose.Schema({
//     red: {
//         type: String
//     },
//     blue: {
//         type: String
//     }
// })

const cameraSchema = new mongoose.Schema({
    
    marca: {
        type: String,
        required: true,
        trim: true
    },
    modelo: {
        type: String,
        required: true,
        trim: true
        },

    year: {
        type: Number,
        required: true,
        min: 0,
        max: 2023
    },
    formato_Pel: {
        type: String,
        required: true,
        trim: true,
    },
    estado: {
        type: String,
        required: true,
        trim: true,
    },
    precio: {
        type: Number,
        required: true,
        trim: true,
    },
    foto: {
        type: String,
        required: true,
        trim: true,
    }
})

const Camera = mongoose.model("camera", cameraSchema)

module.exports = Camera;