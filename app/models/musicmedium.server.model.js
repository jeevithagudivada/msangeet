// Invoke 'strict' JavaScript mode
'use strict';

// Load the module dependencies
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

//MusicMedium schema
var MusicMedium = new Schema({
    mediumName: String
});

// Configure the 'MusicMedium' schema to use getters and virtuals when transforming to JSON
MusicMedium.set('toJSON', {
    getters: true,
    virtuals: true
});

// Create the 'MusicMedium' model out of the 'MusicMedium' schema
mongoose.model('MusicMedium', MusicMedium);
