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
    email: {
        type: String,
        // Validate the email format
        match: [/.+\@.+\..+/, "Please fill a valid email address"]
    },
    username: {
        type: String,
        // Set a unique 'username' index
        unique: true,
        // Validate 'username' value existance
        required: 'Username is required',
        // Trim the 'username' field
        trim: true
    },
    password: {
        type: String,
        // Validate the 'password' value length
        validate: [

			function (password) {
                return password && password.length > 6;
			}, 'Password should be longer'
		]
    },
    salt: {
        type: String
    },
    provider: {
        type: String,
        // Validate 'provider' value existance
        required: 'Provider is required'
    },
    providerId: String,
    providerData: {},
    created: {
        type: Date,
        // Create a default 'created' value
        default: Date.now
    },
    dateOfBirth: Date,
    profilePhoto: {
        data: Buffer,
        location: String,
        contentType: String
    },
    aboutSummary: String,
    phoneNumber: Number,
    isChildUser: Boolean,
    parentId: {
        id: Schema.Types.ObjectId,
        profilePhoto: {
            data: Buffer,
            location: String,
            contentType: String
        },
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
        profilePhoto: {
            data: Buffer,
            location: String,
            contentType: String
        },
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
    training: [{
        teachingTitle: String,
        orgName: String,
        teacherId: {
            id: Schema.Types.ObjectId,
            profilePhoto: {
                data: Buffer,
                location: String,
                contentType: String
            },
            username: String,
            firstName: String,
            lastName: String
        },
        locationId: {
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
        classDuration: Number,
        monthlyFee: Number,
        schedule: {
            frequency: String,
            fromTime: Date,
            toTime: Date,
            days: [String]
        },
        students: [
            {
                id: Schema.Types.ObjectId,
                profilePhoto: {
                    data: Buffer,
                    location: String,
                    contentType: String
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
    musicFormsTaught: [
        {
            mediumName: String,
            genreName: String
        }
	],
    //student learning details
    teaching: [{
        teachingTitle: String,
        orgName: String,
        teacherId: {
            id: Schema.Types.ObjectId,
            profilePhoto: {
                data: Buffer,
                location: String,
                contentType: String
            },
            username: String,
            firstName: String,
            lastName: String
        },
        locationId: {
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
        classDuration: Number,
        monthlyFee: Number,
        schedule: {
            frequency: String,
            fromTime: Date,
            toTime: Date,
            days: [String]
        },
        students: [
            {
                id: Schema.Types.ObjectId,
                profilePhoto: {
                    data: Buffer,
                    location: String,
                    contentType: String
                },
                username: String,
                firstName: String,
                lastName: String
                }
	   ]
    }],
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
