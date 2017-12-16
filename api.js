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

    // const newUser = {
    //     id: userId,
    //     ...user
    // }

    users.push(newUser)
    store.saveUsers(users)

    res.json(users)
})

api.get('/user', (req, res) => {
    const users = store.getUsers()
    res.json(users)
})

module.exports = api