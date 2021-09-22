const express = require('express');
const app = express();
const { User } = require('./models');

app.use(express.urlencoded({ extended: false }));

app.set("view engine", "ejs");

app.get('/users/create', (req, res) => {
    res.render('users/create')
})




app.post('/users', (req, res) => {
    User.create({
            username: req.body.username,
            password: req.body.password
        })
        .then(user => {
            res.status(200).send('Success');
        })
});

app.get('/users', (req, res) => {
    User.findAll()
        .then(data => {
            res.render('users/index', {
                data
            })
        })
})

app.get('/users/:id', (req, res) => {
    User.findOne({
            where: { id: req.params.id }
        })
        .then(data => {
            res.render('users/show', {
                data
            })
        })
})

app.get('/users/delete/:id', (req, res) => {
    User.destroy({ where: { id: req.params.id } })
        .then(() => {
            res.send('User berhasil dihapus');
        });
})

app.get('/users/update/:id', (req, res) => {
    User.findOne({ where: { id: req.params.id } })
        .then((data) => {
            res.render('users/update', { data });
        });
});

app.post('/users/update/:id', (req, res) => {
    User.update({
            username: req.body.username,
            password: req.body.password
        }, { where: { id: req.params.id } })
        .then(() => {
            res.send('User berhasil diupdate');
        });
});

app.listen(4000);