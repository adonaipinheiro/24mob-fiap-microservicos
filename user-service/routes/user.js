require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB connection
mongoose.connect(
    process.env.mongoDbUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }, null);

// Model
const userData = require("../model/users");

// Middlewares
const authMiddleware = require("../middleware/jwtMiddleware");
const apiTokenMiddleware = require("../middleware/apiTokenMiddleware");

const create_token = require("../utils/token");

app.post("/sign-up", apiTokenMiddleware, (req, res) => {
    const data = new userData(req.body);
    data.save().then((result) => {
        res.status(201).send({output: "New User Add", payload: result})
    }).catch((error) => {
        res.status(201).send({output: "Error to add", payload: error})
    })
});

app.get("/validate", authMiddleware, (req, res) => {
    return res.status(200).send({status: true, id: req.content.id});
});

app.post("/sing-in", apiTokenMiddleware, (req, res) => {
    const us = req.body.user
    const ps = req.body.password

    userData.findOne({user: us}, (error, result) => {
        if (error) return res.status(500).send({output: "Error, user no find"})
        if (!result) return res.status(404).send({output: "Error, user not found"})

        bcrypt.compare(ps, result.password, (error, data) => {
            if (error) return res.status(500).send({output: "Error"})
            if (!data) return res.status(400).send({output: "Password fail"})
            const token = create_token(result._id, result.user)
            res.status(200).send({output: "login ok", token, url: "http://"})
        })
    })
});

app.put("/change-password", apiTokenMiddleware, authMiddleware, (req, res) => {
    bcrypt.hash(req.body.password, 10, (error, hashPass) => {
        if (error) return res.status(500).send({output: "Error, user no find"})
        req.body.password = hashPass
        userData.findByIdAndUpdate(req.content.id, req.body, {new: true}, (error, data) => {
            if (error) return res.status(500).send({output: "Error"})
            if (!data) return res.status(400).send({output: "Password fail"})
            return res.status(201).send({output: "update success"});
        })
    })
});

module.exports = app
