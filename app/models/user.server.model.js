// Invoke 'strict' JavaScript mode
'use strict';

// Load the module dependencies
var mongoose = require('mongoose'),
    crypto = require('crypto'),
    Schema = mongoose.Schema;

// Define a new 'UserSchema'
var UserSchema = new Schema({
    salutation: String,
    firstName: String,
    lastName: String,
    email: String,
    username: String,
    password: String,
    salt: String,
    provider: {
        type: String,
        // Validate 'provider' value existance
        required: 'Provider is required'
    },
    providerId: String,
    providerData: {},
    hasRegistered: Boolean,
    socialNetworkHandlers: {
        twitter: String,
        facebook: String,
        googleplus: String
    },
    created: {
        type: Date,
        // Create a default 'created' value
        default: Date.now
    },
    dateOfBirth: Date,
    profilePhoto: Buffer,
    aboutSummary: String,
    phoneNumber: Number,
    isChildUser: Boolean,
    parent: {
        id: Schema.Types.ObjectId,
        profilePhoto: Buffer,
        username: String,
        firstName: String,
        lastName: String
    },
    residenceLocation: {
        locationName: String,
        pinCode: {
            type: Number,
            match: [/d{6}/, "Please fill correct year"]
        },
        area: String,
        addressText: String,
        city: String,
        country: String,
        latitute: Number,
        longitude: Number
    },
    children: [{
        id: Schema.Types.ObjectId,
        profilePhoto: Buffer,
        username: String,
        firstName: String,
        lastName: String
    }],
    personas: [String],
    qualification: [{
        qualificationName: String,
        musicForm: {
            genre: String,
            medium: String
        },
        awardingOrg: String,
        qualificationYear: {
            type: Number,
            match: [/d{4}/, "Please fill correct year"]
        }
    }],
    //student learning details
    training: [{
        teachingTitle: String,
        musicForm: {
            genre: String,
            medium: String
        },
        orgName: String,
        teacher: {
            id: Schema.Types.ObjectId,
            profilePhoto: Buffer,
            username: String,
            firstName: String,
            lastName: String
        },
        location: {
            locationName: String,
            pinCode: {
                type: Number,
                match: [/d{6}/, "Please fill correct year"]
            },
            area: String,
            addressText: String,
            city: String,
            country: String,
            latitute: Number,
            longitude: Number
        },
        fromYear: Number,
        toYear: Number,
        students: [
            {
                id: Schema.Types.ObjectId,
                profilePhoto: {
                    data: Buffer
                },
                username: String,
                firstName: String,
                lastName: String
            }
	   ]
    }],
    awards: [{
        awardName: String,
        awardingOrg: String,
        awardYear: Number
    }],
    performances: [{
        eventName: String,
        hostorg: String,
        eventYear: Number
    }],
    books: [{
        bookName: String,
        publisherName: String,
        publicationYear: Number
    }],
    albums: [{
        albumTitle: String,
        publisherName: String,
        releaseYear: Date
    }],
    teaching: [{
        teachingTitle: String,
        musicForm: {
            genre: String,
            medium: String
        },
        orgName: String,
        location: {
            locationName: String,
            pinCode: {
                type: Number,
                match: [/d{6}/, "Please fill correct year"]
            },
            area: String,
            addressText: String,
            city: String,
            country: String,
            latitute: Number,
            longitude: Number
        },
        fromYear: Number,
        toYear: Number,
        conductsIndividualClass: Boolean,
        conductsGroupClass: Boolean,
        classDuration: Number,
        monthlyFee: Number,
        schedule: {
            frequency: String,
            fromTime: String,
            toTime: String,
            days: [String]
        },
        students: [
            {
                id: Schema.Types.ObjectId,
                profilePhoto: Buffer,
                username: String,
                firstName: String,
                lastName: String
            }
	   ]
    }]
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
