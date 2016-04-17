// Invoke 'strict' JavaScript mode
'use strict';

// Load the test dependencies
var app = require('../../server.js'),
	should = require('should'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Book = mongoose.model('Book');

// Define global test variables
var user, book;

// Create an 'Book' model test suite
describe('Book Model Unit Tests:', function() {
	// Define a pre-tests function
	beforeEach(function(done) {
		// Create a new 'User' model instance
		user = new User({
			salutation : 'Welcome',
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: 'username',
			password: 'password',
			dateOfBirth: '31/12/2016'
		});

		// Save the new 'User' model instance
		user.save(function() {
			book = new Book({
				bookName: 'Name',
				publisherName: 'PName',
				publicationYear: 2000,
				user: user
			});

			done();
		});
	});

	// Test the 'Book' model save method
	describe('Testing the save method', function() {
		it('Should be able to save without problems', function() {
			book.save(function(err) {
				should.not.exist(err);
			});
		});

		it('Should not be able to save a book without valid publication year', function() {
			book.publicationYear = '';

			book.save(function(err) {
				should.exist(err);
			});
		});
	});

	// Define a function for post-tests
	afterEach(function(done) {
		// Clean the database
		Book.remove(function() {
			User.remove(function() {
				done();
			});
		});
	});
});