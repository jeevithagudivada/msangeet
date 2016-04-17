// Invoke 'strict' JavaScript mode
'use strict';

// Load the test dependencies
var app = require('../../server.js'),
	should = require('should'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Award = mongoose.model('Award');

// Define global test variables
var user, award;

// Create an 'Award' model test suite
describe('Award Model Unit Tests:', function() {
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
			award = new Award({
				awardName: 'Name',
				awardingOrg: 'Org',
				awardYear: 2000,
				user: user
			});

			done();
		});
	});

	// Test the 'Award' model save method
	describe('Testing the save method', function() {
		it('Should be able to save without problems', function() {
			award.save(function(err) {
				should.not.exist(err);
			});
		});

		it('Should not be able to save an award without valid award year', function() {
			award.awardYear = '';

			award.save(function(err) {
				should.exist(err);
			});
		});
	});

	// Define a function for post-tests
	afterEach(function(done) {
		// Clean the database
		Award.remove(function() {
			User.remove(function() {
				done();
			});
		});
	});
});