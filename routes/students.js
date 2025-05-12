const express = require('express');
const studentsRouter = express.Router();
const fs = require('fs');
const path = require('path')
const fp = path.join(__dirname, '..', 'students.json')
let students = fs.readFileSync(fp)
let allStudents = JSON.parse(students.toString())

studentsRouter.get('/', (req, res) => {
    res.render('allStudents', {students: allStudents})
})

studentsRouter.post('/addstudents', (req, res) => {
    console.log(req.body)
    allStudents.push(req.body)
    fs.writeFileSync(fp,JSON.stringify(allStudents))
    res.redirect('/students')
})

module.exports = studentsRouter;