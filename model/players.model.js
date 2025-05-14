const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
    name: String,
    age: Number,
    sport: String,
    country: String,
    image: String,
    playingrole: String,
    discription: String
})

const playerModel = new mongoose.model('player', playerSchema);
module.exports = playerModel;