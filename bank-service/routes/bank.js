require("dotenv").config()

const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")

const app = express()
app.use(express.json())
app.use(cors())

mongoose.connect(
    process.env.mongoDbUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }, null);

// Model
const bank = require("../model/bank");

// Middlewares
const authMiddleware = require("../middleware/jwtMiddleware");
const apiTokenMiddleware = require("../middleware/apiTokenMiddleware");

app.post("/insert", apiTokenMiddleware, authMiddleware, (req, res) => {
    const _bank = new bank(req.body);
    _bank.user_id = req.content.id
    _bank.save().then((result) => {
        res.status(201).send({output: "New bank Add", payload: result})
    }).catch((error) => {
        res.status(204).send({output: "Error to add bank", payload: error})
    })
});

app.put("/update/:id", apiTokenMiddleware, authMiddleware, (req, res) => {
    bank.findByIdAndUpdate(req.params.id, req.body, {new: true}, (error, data) => {
        if (error) return res.status(500).send({output: "Error"})
        if (!data) return res.status(400).send({output: "update fail"})
        return res.status(201).send({output: "update success"});
    })
});

app.delete("/delete/:id", apiTokenMiddleware, authMiddleware, (req, res) => {
    bank.findByIdAndDelete(req.params.id, {new: true}, (error, data) => {
        if (error) return res.status(500).send({output: "Error"})
        if (!data) return res.status(400).send({output: "delete fail"})
        return res.status(201).send({output: "delete success"});
    })
});

app.get("/:id", apiTokenMiddleware, authMiddleware, (req, res) => {
    bank.findById(req.params.id, (error, data) => {
        if (error) return res.status(500).send({output: "Error"})
        if (!data) return res.status(400).send({output: "data not found"})
        return res.status(201).send({output: data});
    })
});

app.get("/", apiTokenMiddleware, authMiddleware, (req, res) => {
    bank.find({user_id: req.content.id}, (error, data) => {
        if (error) return res.status(500).send({output: "Error"})
        if (!data) return res.status(400).send({output: "data not found"})
        return res.status(201).send({output: data});
    })
});

module.exports = app
