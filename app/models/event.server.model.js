// Invoke 'strict' JavaScript mode
'use strict';

// Load the module dependencies
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

//Event schema
var Event = new Schema({
    eventName: String,
    hostorg: String,
    eventYear: {
        type: Number,
        match: [/d{4}/, "Please fill correct year"]
    }
});

// Configure the 'Event' schema to use getters and virtuals when transforming to JSON
Event.set('toJSON', {
    getters: true,
    virtuals: true
});

// Create the 'Event' model out of the 'Event' schema
mongoose.model('Event', Event);
