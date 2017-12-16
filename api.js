const express = require("express")
const api = express.Router()

const store = require('./data/store')

api.post('/user', (req, res) => {
    const user = req.body
    const users = store.getUsers()

    let userId = 1

    if (users.length > 0) {
        userId = users[users.length - 1].id + 1
    }

    const newUser = {
        id: userId,
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone
    }

    users.push(newUser)
    console.log(users); //checking to make sure values are saved
    store.saveUsers(users)

    res.json(users)
})

api.get('/user', (req, res) => {
    const users = store.getUsers()
    res.json(users)
})

module.exports = api