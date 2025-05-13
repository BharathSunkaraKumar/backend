const express = require('express');
const unicornRouter = express.Router();
const mongoose = require('mongoose');

const mongodbUrl = 'mongodb+srv://may-13:bharath118@cluster0.zrqxmhu.mongodb.net/may-13?retryWrites=true&w=majority&appName=Cluster0';
mongoose.connect(mongodbUrl);

const unicornModel = require('../model/unicorns.model');

unicornRouter.get('/', (req, res) => {
    unicornModel.find({gender:'m'}).then((data) => {
        res.json(data)
    })
})

module.exports = unicornRouter;
