// Invoke 'strict' JavaScript mode
'use strict';

// Load the module dependencies
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

//Degree schema
var Degree = new Schema({
    degreeName: String,
    genre: String,
    medium: String,
    syllabus: [Schema.Types.ObjectId]
});

// Configure the 'Degree' schema to use getters and virtuals when transforming to JSON
Degree.set('toJSON', {
    getters: true,
    virtuals: true
});

// Create the 'Degree' model out of the 'Degree' schema
mongoose.model('Degree', Degree);
