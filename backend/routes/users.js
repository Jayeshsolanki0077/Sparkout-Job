const express = require('express');
const registrationRoutes = express.Router();
const bcrypt = require('bcryptjs')
let Registration = require('../models/User');
let RouteNames = require("../constants/constants");


//Registration route
registrationRoutes.route(RouteNames.register).post(function(req, res) {
    let register = new Registration(req.body);
    register.save()
        .then(reg => {
            res.sendStatus(200);
        })
        .catch(err => {
            console.log(err);
            res.status(400).send("Failed to store to database");
        });
});

// Login Router
registrationRoutes.route(RouteNames.login).post(function(req, res) {
    Registration.findOne({ email: req.body.email })
        .then(user => {
            console.log("User from login", user)
            if (!user) res.sendStatus(204);
            else {
                bcrypt.compare(req.body.password, user.password)
                    .then(passwordMatch => passwordMatch ? res.sendStatus(200) : res.sendStatus(204))
            }
        });
});


registrationRoutes.route(RouteNames.validate)
    .post(function(req, res) {
        Registration.findOne({ email: req.body.email })
            .then(user => user ? res.sendStatus(204) : res.sendStatus(200))
    });


registrationRoutes.route(RouteNames.data).get(function(req, res) {
    Registration.find((err, data) => err ? res.status(400).send("Error occured") : res.json(data));
});

module.exports = registrationRoutes;