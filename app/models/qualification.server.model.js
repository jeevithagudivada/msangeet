// Invoke 'strict' JavaScript mode
'use strict';

// Load the module dependencies
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

//Qualification schema
var Qualification = new Schema({
    qualificationName: String,
    awardingOrg: String,
    qualificationYear: {
        type: Number,
        match: [/d{4}/, "Please fill correct year"]
    }
});

// Configure the 'Qualification' schema to use getters and virtuals when transforming to JSON
Qualification.set('toJSON', {
    getters: true,
    virtuals: true
});

// Create the 'Qualification' model out of the 'Qualification' schema
mongoose.model('Qualification', Qualification);
