// Invoke 'strict' JavaScript mode
'use strict';

// Load the module dependencies
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

//Location schema
var Location = new Schema({
    locationName: String,
    pinCode: {
        type: Number,
        match: [/d{6}/, "Please fill correct year"]
    },
    area: String,
    addressText: String,
    city: String,
    country: String
});

// Configure the 'Location' schema to use getters and virtuals when transforming to JSON
Location.set('toJSON', {
    getters: true,
    virtuals: true
});

// Create the 'Location' model out of the 'Location' schema
mongoose.model('Location', Location);
