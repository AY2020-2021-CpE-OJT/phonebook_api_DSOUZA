const express = require('express');
const router = express.Router();
const Data = require('../models/model');

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
router.get('/getByLname/:lname',async(req,res)=>{
    const data = await Data.find({lname:req.params.lname}).then(data => {
        res.json(data);
        });
    //res.json(data = await Data.findOne({lname : req.params.lname}));
})

//Get by First name
router.get('/getByFname/:fname',async(req,res)=>{
    res.json(data = await Data.find({fname: req.params.fname}));
})

//Get by Phone Number
router.get('/getByPhoneNumber/:phoneNumber', async(req,res)=>{
    res.json(data = await Data.findOne({phone_number: req.params.phone_number}));
})

// Delete Data
router.delete('/delete/:lname', async(req,res)=>{
    res.json(Delete = await Data.findOneAndDelete({lname: req.body.lname}));
})

router.delete('/delete/:fname', async(req,res)=>{
    res.json(Delete = await Data.findOneAndDelete({lname: req.body.fname}));
})

router.delete('/delete/:phoneNumber', async(req,res)=>{
    res.json(Delete = await Data.findOneAndDelete({lname: req.body.lname}));
})

// Update Last name
router.patch('/updateLname/:lname', async(req,res)=>{
    const patch = await Data.findOneAndUpdate({lname: req.body.lname})
    res.json(patch);
})

// Update First name
router.patch('/updateFname/:fname', async(req,res)=>{
    res.json(patch = await Data.fineOneAndupdate({fname: req.body.fname}));
})

// Update Phone number
router.patch('/updatePhoneNumber/:phone_number', async(req,res)=>{
    res.json(patch = await Data.fineOneAndupdate({phone_number: req.body.phone_number}));
})

module.exports = router;

