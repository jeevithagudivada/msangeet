// Invoke 'strict' JavaScript mode
'use strict';

// Load the module dependencies
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

//Award schema
var Award = new Schema({
    awardName: String,
    awardingOrg: String,
    awardYear: {
        type: Number,
        match: [/d{4}/, "Please fill correct year"]
    }
});

// Configure the 'Award' schema to use getters and virtuals when transforming to JSON
Award.set('toJSON', {
    getters: true,
    virtuals: true
});

// Create the 'Award' model out of the 'Award' schema
mongoose.model('Award', Award);
