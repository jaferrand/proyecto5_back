const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512');
  return {
    salt: salt,
    hashedPassword: hash.toString('hex')
  };
}

function generateToken(userId) {
  return jwt.sign({ userId }, 'tu_secreto_secreto', { expiresIn: '1h' });
}

function verifyPassword(inputPassword, salt, hashedPassword) {
  const hash = crypto.pbkdf2Sync(inputPassword, salt, 1000, 64, 'sha512').toString('hex');
  return hash === hashedPassword;
}

const createUser = async (req, res) => {
  try {
    const { salt, hashedPassword } = hashPassword(req.body.password);

    const newUser = new User({
      nombre: req.body.nombre,
      apellido: req.body.apellido,
      rut: req.body.rut,
      edad: req.body.edad,
      email: req.body.correo,
      password: hashedPassword,
      salt: salt,
    });

    await newUser.save();

    res.json({ success: true, message: 'Usuario Creado', info: newUser });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

const registerUser = async (req, res) => {
  try {
    // Implementa la lógica para registrar al usuario aquí
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.correo });

    if (!user) {
      throw new Error('Usuario no encontrado');
    }

    const isPasswordValid = verifyPassword(req.body.password, user.salt, user.password);

    if (!isPasswordValid) {
      throw new Error('Contraseña incorrecta');
    }

    const token = generateToken(user._id);

    res.json({ success: true, message: 'Inicio de sesión exitoso', token });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find().populate('favoriteProducts');
    res.json({ success: true, info: users });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

const editUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true });
    res.json({ success: true, message: 'Usuario actualizado', info: updatedUser });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await User.findByIdAndDelete(id);
    res.json({ success: true, message: 'Usuario eliminado', info: deletedUser });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { createUser, registerUser, loginUser, getUsers, editUser, deleteUser };
