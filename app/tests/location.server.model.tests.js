// Invoke 'strict' JavaScript mode
'use strict';

// Load the test dependencies
var app = require('../../server.js'),
	should = require('should'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Location = mongoose.model('Location');

// Define global test variables
var user, location;

// Create an 'Location' model test suite
describe('Location Model Unit Tests:', function() {
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
			location = new Location({
				locationName: 'Name',
				area: 'Area',
				pinCode: 560001,
				user: user
			});

			done();
		});
	});

	// Test the 'Location' model save method
	describe('Testing the save method', function() {
		it('Should be able to save without problems', function() {
			location.save(function(err) {
				should.not.exist(err);
			});
		});

		it('Should not be able to save a location without a pincode', function() {
			location.pinCode = '';

			location.save(function(err) {
				should.exist(err);
			});
		});
	});

	// Define a post-tests function
	afterEach(function(done) {
		// Clean the database
		Location.remove(function() {
			User.remove(function() {
				done();
			});
		});
	});
});