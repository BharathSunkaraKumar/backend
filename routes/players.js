const express = require('express');
const playersRouter = express.Router();
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

playersRouter.put('/updateplayer/:id', async(req, res) => {
    console.log('pit req')
    // const {name, age, sport, country, image, playingrole, discription} = req.body
    // const myPlayer = await playerModel.findByIdAndUpdate(
    //     req.params.id, 
    //     {name, age, sport, country, image, playingrole, discription}
    // )
    // console.log(myPlayer)
    res.send('updated')
})
playersRouter.get('/update/:id', (req, res) => {
    res.render('updateplayers', {id: req.params.id})
})



module.exports = playersRouter;