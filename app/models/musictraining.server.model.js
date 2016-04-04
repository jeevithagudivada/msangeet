// Invoke 'strict' JavaScript mode
'use strict';

// Load the module dependencies
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

//MusicTraining Schema
var MusicTraining = new Schema({
    teachingTitle: String,
    orgId: Schema.Types.ObjectId,
    orgName: String,
    teacherId: Schema.Types.ObjectId,
    locationId: Schema.Types.ObjectId,
    pinCode: {
        type: Number,
        match: [/d{6}/, "Please fil the valid pincode"]
    },
    area: String,
    City: String,
    Country: String,
    addressText: String,
    fromYear: {
        type: Number,
        match: [/d{4}/, "Please fill correct year"]
    },
    toYear: {
        type: Number,
        match: [/d{4}/, "Please fill correct year"]
    },
    conductsIndividualClass: Boolean,
    conductsGroupClass: Boolean,
    classDuration: Number,
    monthlyFee: Number,
    schedule: [
        {
            frequency: String,
            fromTime: Date,
            toTime: Date,
            days: [
                {
                    type: String
				}
				]
			}
	],
    students: [
        {
            studentId: Schema.Types.ObjectId,
            studentFirstName: String,
            studentLastName: String,
            genre: String,
            medium: String,
            fromYear: {
                type: Number,
                match: [/d{4}/, "Please fill correct year"]
            },
            toYear: {
                type: Number,
                match: [/d{4}/, "Please fill correct year"]
            }
			}
	],

});

// Configure the 'MusicTraining' schema to use getters and virtuals when transforming to JSON
MusicTraining.set('toJSON', {
    getters: true,
    virtuals: true
});

// Create the 'MusicTraining' model out of the 'MusicTraining' schema
mongoose.model('MusicTraining', MusicTraining);
