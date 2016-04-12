// Invoke 'strict' JavaScript mode
'use strict';

// Load the module dependencies
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var TwilioUser = new mongoose.Schema({
    phone: {
        type: String,
        required: true
    },
    verified: {
        type: Boolean,
        default: false
    },
    code: String,
});

// Configure the 'TwilioUser' schema to use getters and virtuals when transforming to JSON
TwilioUser.set('toJSON', {
    getters: true,
    virtuals: true
});

// Create the 'Syllabus' model out of the 'Syllabus' schema
mongoose.model('TwilioUser', TwilioUser);
