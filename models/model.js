const mongoose = require('mongoose');

//Schema
const dataSchema = new mongoose.Schema({
        lname : {
            type: String,
            required : true
        },

        fname : {
            type : String,
            required: true
        },
    phone_number:{
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Phonebook', dataSchema);