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

api.delete('/user/:id', (req, res) => {
    const id = req.params.id; //get the specific id
    const users = store.getUsers(); //get the users
    let deleted = false;
    let contactindex = users.length-1;
    while (!deleted) { //while loop runs until user is deleted
        if (users[contactindex].id == id) { //checking if id of array[index]==specifc id
            var runner = 0; //runner to store new indeces
            while (contactindex != users.length-1) {
                runner = users[contactindex];
                users[contactindex] = users[contactindex + 1];
                users[contactindex + 1] = runner;
                contactindex++;
            }
            users.pop();
            deleted = true;
        }
        contactindex--;
    }

    store.saveUsers(users)
    res.json(users);
})

module.exports = api