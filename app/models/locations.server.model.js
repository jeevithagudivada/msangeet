// Invoke 'strict' JavaScript mode
'use strict';

// Load the module dependencies
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

//Locations schema
var Locations = new Schema({
	_id: Objectid,
	locationName: String,
	pinCode: {
		type: Number,
		match: [/d{6}/,"Please fill correct year"]
	},
	area: String,
	
	
	
	
	gmapURL:
	
	
	
	
	addressText: String,
	city: String,
	country: String
});

// Configure the 'Locations' schema to use getters and virtuals when transforming to JSON
Locations.set('toJSON', {
	getters: true,
	virtuals: true
});

// Create the 'Locations' model out of the 'Locations' schema
mongoose.model('Locations', Locations);