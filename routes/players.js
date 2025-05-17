const express = require('express');
const playersRouter = express.Router();
const checkAuth = require('../app');
const playerModel = require('../model/players.model')
// const collection = database.collection('testcollection')
playersRouter.get('/', (req, res) => {
    playerModel.find({}).then(players => {
        res.render('players', {players: players})
    })
})
playersRouter.get('/playerDetails/:pid', (req, res) => {
    let playerId = req.params.pid.toString()
    playerModel.find({name: playerId}).then(details=>{
        res.render('playerdetails', {details: details})
    })
})

playersRouter.post('/addplayer', (req, res) => {
    const newplayer = new playerModel(req.body)
    console.log(newplayer)
    newplayer.save()
    res.redirect('/players')
})

playersRouter.get('/:id/edit', async(req, res) => {
    let player = await playerModel.findById(req.params.id);
    console.log(player)
    res.render('updateplayers', {player})
})

playersRouter.put('/:id', async(req, res) => {
    let updatedPlayer = await playerModel.findByIdAndUpdate(req.params.id, req.body);
    res.redirect('/players')
})

playersRouter.delete('/:id', async(req, res) => {
    let deletePlayer = await playerModel.findByIdAndDelete(req.params.id);
    res.redirect('/players')
})



module.exports = playersRouter;