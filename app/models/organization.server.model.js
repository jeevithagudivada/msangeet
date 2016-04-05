// Invoke 'strict' JavaScript mode
'use strict';

// Load the module dependencies
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

//Organization schema
var Organization = new Schema({
    orgName: String,
    //eg. Promotion, Teaching for interest
    orgInterests: [
        {
            type: String
        }
	],
    profilePhoto: {
        data: Buffer,
        contentType: String
    },
    aboutSummary: String,
    parentOrgId: Schema.Types.ObjectId,
    location: {
        locationId: Schema.Types.ObjectId
    },
    degreesOffered: [
        Schema.Types.ObjectId
	],
    awardsOffered: [
        Schema.Types.ObjectId
	],
    eventsConducted: [
        {
            eventName: String,
            eventFromDate: Date,
            eventEndDate: Date,
            days: [
                {
                    date: Date,
                    fromTime: Date,
                    toTime: Date,
                    sessions: [
                        {
                            sessionName: String,
                            //concert, lec-dem, book-release, cd release etc.
                            sessionType: String,
                            artistes: [
                                {
                                    artisteId: Schema.Types.ObjectId,
                                    artisteName: String,
                                    artisteRole: String
							}
						]
						}
					]
					}
				]
			}
	],
    books: [
        {
            bookId: Schema.Types.ObjectId
        }
	],
    albums: [
        {
            albumId: Schema.Types.ObjectId
        }
	],
    awardsReceived: [
        {
            awardId: Schema.Types.ObjectId
        }
	],
    teachers: [
        {
            teachingId: Schema.Types.ObjectId,
            fromYear: {
                type: Number,
                match: [/d{4}/, "Please fill correct year"]
            },
            toYear: {
                type: Number,
                match: [/d{4}/, "Please fill correct year"]
            },
            interests: [
                {
                    type: String
				}
			],
            addressText: String
        }
	],
    students: [
        {
            studentUserId: Schema.Types.ObjectId,
            teacherId: Schema.Types.ObjectId,
            fromYear: {
                type: Number,
                match: [/d{4}/, "Please fill correct year"]
            },
            toYear: {
                type: Number,
                match: [/d{4}/, "Please fill correct year"]
            },
            genre: String,
            medium: String
        }
	]
});


// Configure the 'Organization' schema to use getters and virtuals when transforming to JSON
Organization.set('toJSON', {
    getters: true,
    virtuals: true
});

// Create the 'Organization' model out of the 'Organization' schema
mongoose.model('Organization', Organization);
