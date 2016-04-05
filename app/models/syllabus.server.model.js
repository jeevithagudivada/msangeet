// Invoke 'strict' JavaScript mode
'use strict';

// Load the module dependencies
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

//Syllabus schema
var Syllabus = new Schema({
    syllabusName: String
});

// Configure the 'Syllabus' schema to use getters and virtuals when transforming to JSON
Syllabus.set('toJSON', {
    getters: true,
    virtuals: true
});

// Create the 'Syllabus' model out of the 'Syllabus' schema
mongoose.model('Syllabus', Syllabus);
