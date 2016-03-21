// Invoke 'strict' JavaScript mode
'use strict';

// Load the module dependencies
var mongoose = require('mongoose'),
    crypto = require('crypto'),
    Schema = mongoose.Schema;

// Define a new 'UserSchema'
var UserSchema = new Schema({
	_id : Objectid,
	salutation : String,
	firstName: String,
	lastName: String,
	dateOfBirth: Date,
	profilePhoto : { 
					data: Buffer,
					contentType: String 
	},
	aboutSummary : String,
	username: {
		type: String,
		// Set a unique 'username' index
		unique: true,
		// Validate 'username' value existance
		required: 'Username is required',
		// Trim the 'username' field
		trim: true
	},
	email: {
		type: String,
		// Validate the email format
		match: [/.+\@.+\..+/, "Please fill a valid email address"]
	},
	phoneNumber : Number,
	isChildUser : Boolean,
	parentId : Objectid,
	//password: {type: String, required: true},
	
	password: {
		type: String,
		// Validate the 'password' value length
		validate: [

			function(password) {
				return password && password.length > 6;
			}, 'Password should be longer'
		]
	},
	residenceLocation: [
					{
					locationId: Objectid,  
					pinCode: Number, 
					area: String, 
					
					
					
					gmapCoordinates/url:, 
					
					
					
					addressText: String
					}
	],
	children: [
				{
					childUserId: Objectid
				}
	],
	personas: [
				{
					persona: String
				}
	],
	qualification: [
				{
				qualId: Objectid,
				qualName: String,
				awardingOrg: String,
				qualYear: 
				{
					type: Number,
					match: [/d{4}/,"Please fill correct year"]
				}
				}
	],
	training: [
				{
				trainingId:Objectid,
				teacherUsername: String,
				teachingInstituteName: String,
				genre: String,
				medium: String,
				fromYear: {
					type: Number,
					match: [/d{4}/,"Please fill correct year"]
				},
				toYear: {
					type: Number,
					match: [/d{4}/,"Please fill correct year"]
				}
				}
	],
	awards: [
				{
				awardId: Objectid,
				awardName: string,
				awardingOrg: String,
				awardYear: {
					type: Number,
					match: [/d{4}/,"Please fill correct year"]
				}
				}
	],
	performances: [
				{
				eventId: Objectid,
				eventName: String,
				hostorg: String,
				eventYear: {
					type: Number,
					match: [/d{4}/,"Please fill correct year"]
				}
				}
	],
	books: [
				{
				bookId: Objectid,
				bookName: String,
				publisherName: String,
				publicationYear: {
					type: Number,
					match: [/d{4}/,"Please fill correct year"]
				}
				}
	],
	albums: [
				{
				albumId: Objectid
				albumTitle: String,
				producerName: String,
				releaseYear: {
					type: Number,
					match: [/d{4}/,"Please fill correct year"]
				}
				}
	],
	genresTaught: [
				{
				genreId: Objectid,
				genreName: String
				}
	],
	teachingMedium: [
				{
				mediumId: Objectid,
				mediumName: String
				}
	],
	studentProfiles: [
				{
				profileName: String
				}
	],
	teaching: [trainingId: Objectid],
	salt: {
		type: String
	},
    hasRegistered: Boolean,
    created: {
        type: Date,
        // Create a default 'created' value
        default: Date.now
    }
});

// Set the 'fullname' virtual property
UserSchema.virtual('fullName').get(function () {
    return this.firstName + ' ' + this.lastName;
}).set(function (fullName) {
    var splitName = fullName.split(' ');
    this.firstName = splitName[0] || '';
    this.lastName = splitName[1] || '';
});

// Use a pre-save middleware to hash the password
UserSchema.pre('save', function (next) {
    if (this.password) {
        this.salt = new Buffer(crypto.randomBytes(16).toString('base64'), 'base64');
        this.password = this.hashPassword(this.password);
    }

    next();
});

// Create an instance method for hashing a password
UserSchema.methods.hashPassword = function (password) {
    return crypto.pbkdf2Sync(password, this.salt, 10000, 64).toString('base64');
};

// Create an instance method for authenticating user
UserSchema.methods.authenticate = function (password) {
    return this.password === this.hashPassword(password);
};

// Find possible not used username
UserSchema.statics.findUniqueUsername = function (username, suffix, callback) {
    var _this = this;

    // Add a 'username' suffix
    var possibleUsername = username + (suffix || '');

    // Use the 'User' model 'findOne' method to find an available unique username
    _this.findOne({
        username: possibleUsername
    }, function (err, user) {
        // If an error occurs call the callback with a null value, otherwise find find an available unique username
        if (!err) {
            // If an available unique username was found call the callback method, otherwise call the 'findUniqueUsername' method again with a new suffix
            if (!user) {
                callback(possibleUsername);
            } else {
                return _this.findUniqueUsername(username, (suffix || 0) + 1, callback);
            }
        } else {
            callback(null);
        }
    });
};

// Configure the 'UserSchema' to use getters and virtuals when transforming to JSON
UserSchema.set('toJSON', {
    getters: true,
    virtuals: true
});

// Create the 'User' model out of the 'UserSchema'
mongoose.model('User', UserSchema);
