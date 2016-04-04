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
        locationId: Schema.Types.ObjectId,
        pinCode: {
            type: Number,
            match: [/d{6}/, "Please fill correct year"]
        },
        area: String,
        addressText: String,
        city: String,
        country: String
    },
    degreesOffered: [
        {
            _id: Schema.Types.ObjectId,
            degreeName: String,
            genre: [
                {
                    type: String
					}
			],
            medium: [
                {
                    type: String
					}
			],
            syllabus: [
                {
                    _id: Schema.Types.ObjectId,
                    syllabusName: String
                }
			]
			}
	],
    awardsOffered: [
        {
            _id: Schema.Types.ObjectId,
            awardName: String
			}
	],
    eventsConducted: [
        {
            _id: Schema.Types.ObjectId,
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
            bookId: Schema.Types.ObjectId,
            bookName: String,
            publisherName: String,
            publicationYear: {
                type: Number,
                match: [/d{4}/, "Please fill correct year"]
            },
			}
	],
    albums: [
        {
            albumId: Schema.Types.ObjectId,
            albumTitle: String,
            producerName: String,
            releaseYear: {
                type: Number,
                match: [/d{4}/, "Please fill correct year"]
            },
            artists: [
                {
                    artisteName: String
						}
			]
			}
	],
    awardsReceived: [
        {
            awardId: Schema.Types.ObjectId,
            awardName: String,
            awardingOrg: String,
            awardYear: {
                type: Number,
                match: [/d{4}/, "Please fill correct year"]
            }
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
