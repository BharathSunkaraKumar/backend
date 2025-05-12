const express = require('express');
const usersRouter = express.Router();

usersRouter.get('/', (req, res) => {
    res.send('all users')
})
usersRouter.get('/user:id', (req, res) => {
    res.send(`user ${req.params.id}`)
})

module.exports = usersRouter;