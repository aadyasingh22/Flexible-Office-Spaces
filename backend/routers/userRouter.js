const express = require('express');
const Model = require('../models/userModel');
const jwt = require('jsonwebtoken');
const verifyToken = require('./verifyToken');
require('dotenv').config();

const router = express.Router();

router.post('/add', (req, res) => {
    console.log(req.body);

    new Model(req.body).save()
        .then((result) => {
            res.json(result);
        })
        .catch((err) => {
            console.log(err);
            res.json(err);
        });

});
router.get('/getall', (req,res)=>{
    Model.find({})
        .then((result) => {
            res.json(result);
        }).catch((err) => {
            res.json(err)
        });
});

//: denotes url parameter
router.get('/getbyemail/:email', (req, res) => {
    console.log(req.params.email);

    Model.findOne({ email: req.params.email })
        .then((result) => {
            res.json(result);
        }).catch((err) => {
            res.json(err);
        });
});
router.get('/getbyid/:id', (req, res) => {

    Model.findById(req.params.id)
        .then((result) => {
            res.json(result);
        }).catch((err) => {
            res.json(err);
        });
});
router.put('/update/:id', (req, res) => {
    Model.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then((result) => {
            res.json(result);
        }).catch((err) => {
            res.json(err);
        });
});
router.get('/delete/:id',(req,res)=>{
    Model.findByIdAndDelete(req.params.id)
        .then((result) => {
            res.json(result);
        }).catch((err) => {
            res.json(err);
        });
});

router.post('/authenticate', (req, res) => {
    Model.findOne(req.body)
        .then((result) => {

            if (result) {
                const {_id, name, role, email, avatar} = result;
                const payload = { _id, email, role };

                // create token
                jwt.sign(
                    payload,
                    process.env.JWT_SECRET,
                    { expiresIn: '7 days' },
                    (err, token) => {
                        if (err) {
                            console.log(err);
                            res.status(500).json(err);
                        }
                        else res.status(200).json({ token, name, avatar, role });
                    }
                )
            }

            else res.status(400).json({ message: "Login Failed" });
        }).catch((err) => {
            console.log(err);
            res.json(err)
        });
});

module.exports = router;