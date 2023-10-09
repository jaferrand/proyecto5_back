const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    nombre: {
        type: String,
        default: "Nombre no especificado",
        trim: true,
        lowercase: true,
        minLength: 2
    },
    apellido: {
        type: String,
        default: "Apellido no especificado",
        trim: true,
        lowercase: true,
        minLength: 2
    },
    rut: {
        type: String,
        default: "Nombre no especificado",
        trim: true,
        lowercase: true,
        minLength: 2
    },
    email: {
        type: String,
        trim: true,
        match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g],
        required: true
    },
    edad: {
        type: Number,
        min: 16,
        max: 120
    },
    password: {
        type: String,
        match: [/^(?=.*\d)(?=.*[a-z])(?=.*[a-zA-Z]).{8,}$/gm],
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    favoriteProducts: {
        type: mongoose.Types.ObjectId,
        ref: "product"
    }
})

const User = mongoose.model('user', userSchema);

module.exports = User;