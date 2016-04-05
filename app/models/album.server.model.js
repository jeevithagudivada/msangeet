// Invoke 'strict' JavaScript mode
'use strict';

// Load the module dependencies
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

//Album schema
var Album = new Schema({
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

// Configure the 'Album' schema to use getters and virtuals when transforming to JSON
Album.set('toJSON', {
    getters: true,
    virtuals: true
});

// Create the 'Album' model out of the 'Album' schema
mongoose.model('Album', Album);
