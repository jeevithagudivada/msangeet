// Invoke 'strict' JavaScript mode
'use strict';

// Load the module dependencies
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

//Books schema
var Books = new Schema({
    bookName: String,
    publisherName: String,
    publicationYear: {
        type: Number,
        match: [/d{4}/, "Please fill correct year"]
    },
    authors: [
        {
            authorName: String
		}
	]
});

// Configure the 'Books' schema to use getters and virtuals when transforming to JSON
Books.set('toJSON', {
    getters: true,
    virtuals: true
});

// Create the 'Books' model out of the 'Books' schema
mongoose.model('Books', Books);
