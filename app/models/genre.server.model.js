// Invoke 'strict' JavaScript mode
'use strict';

// Load the module dependencies
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

//Genre Schema
var Genre = new Schema({
	_id: Objectid,
	genreName: String
});
	
// Configure the 'Genre' schema to use getters and virtuals when transforming to JSON
Genre.set('toJSON', {
	getters: true,
	virtuals: true
});

// Create the 'Genre' model out of the 'Genre' schema
mongoose.model('Genre', Genre);