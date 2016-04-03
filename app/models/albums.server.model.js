// Invoke 'strict' JavaScript mode
'use strict';

// Load the module dependencies
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

//Albums schema
var Albums = new Schema({
	_id: Objectid,
	albumTitle: String,
	albumDescription: String,
	publisherName: String,
	releaseYear: Date,
	artistes: [
		{
		artisteName: String
		}
	]
});
	
// Configure the 'Albums' schema to use getters and virtuals when transforming to JSON
Albums.set('toJSON', {
	getters: true,
	virtuals: true
});

// Create the 'Albums' model out of the 'Albums' schema
mongoose.model('Albums', Albums);