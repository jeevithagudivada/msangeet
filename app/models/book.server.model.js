// Invoke 'strict' JavaScript mode
'use strict';

// Load the module dependencies
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

//Book schema
var Book = new Schema({
    bookName: String,
    publisherName: String,
    publicationYear: {
        type: Number,
        match: [/d{4}/, "Please fill correct year"]
    },
    authors: [
        {
            authorId: Schema.Types.ObjectId,
            authorName: String
		}
	]
});

// Configure the 'Book' schema to use getters and virtuals when transforming to JSON
Book.set('toJSON', {
    getters: true,
    virtuals: true
});

// Create the 'Book' model out of the 'Book' schema
mongoose.model('Book', Book);
