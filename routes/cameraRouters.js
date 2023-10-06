const express = require('express');

const { getCameras, createCamera } = require('../controllers/camera.controller');

const cameraRouters = express.Router()

cameraRouters.route('/')
    .post(createCamera)
    .get(getCameras)

module.exports = cameraRouters;