const express = require('express');
const router = express.Router();
const Data = require('../models/model');
require('dotenv').config;
const jwt = require('jsonwebtoken');
require('./passport');

router.use(express.json());

//post
router.post('/new', async (req,res)=>{

    const contact = new Data({
        lname : req.body.lname,
        fname : req.body.fname,
        phone_number : req.body.phone_number
    });

    await contact.save().then(contact => {
        res.send(contact);
    }).catch(error => {
        res.status(500).send("Fail to add");
    })
    res.end();

})

// Get all Data
router.get('/', async (req,res)=>{
    res.json(data = await Data.find());
})

//Get by Last name
router.get('/getByLname',async(req,res)=>{
    const data = await Data.find({lname:req.body.lname}).then(data => {
        res.json(data);
        });
    //res.json(data = await Data.findOne({lname : req.params.lname}));
})

//Get by First name
router.get('/getByFname',async(req,res)=>{
    res.json(data = await Data.find({fname: req.body.fname}));
})

//Get by Phone Number
router.get('/getByPhoneNumber', async(req,res)=>{
    res.json(data = await Data.findOne({phone_number: req.body.phone_number}));
})

// Delete Data
router.delete('/delete/:_id', async(req,res)=>{
    const deleteData = await Data.findByIdAndDelete(req.params._id);
    res.json(deleteData);
})

// Update
router.patch('/update/:_id', async(req,res)=>{
    const put = await Data.findByIdAndUpdate(req.params._id,
        {
            lname: req.body.lname,
            fname: req.body.fname,
            phone_number: req.body.phone_number
        }
        )
    res.json(put);
})

module.exports = router;

