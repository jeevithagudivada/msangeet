// Invoke 'strict' JavaScript mode
'use strict';

// Load the module dependencies
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

//Organization schema
var Organization = new Schema({
	_id: Objectid,
	orgName: String,
	//eg. Promotion, Teaching for interest
	orgInterests: [
					{
					type:String
					}
	],
	profilePhoto : { 
					data: Buffer,
					contentType: String 
	},
	aboutSummary: String,
	parentOrgId: Objectid,
	location: 	{
				locationId:Objectid,
				pinCode: {
							type: Number,
							match: [/d{6}/,"Please fill correct year"]
						},
				area: String,
				
				
				gmapURL: 
				
				
				addressText: String,
				city: String,
				country: String
				},
	degreesOffered: [
			{
			_id: Objectid,
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
				{_id: Objectid,syllabusName: String}
			]
			}
	],
	awardsOffered: [
			{
			_id: Objectid,
			awardName: String
			}
	],
	eventsConducted: [
			{
				_id: Objectid,
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
							artisteId: Objectid,
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
			bookId: Objectid,
			bookName: String,
			publisherName: String,
			publicationYear:{
							type: Number,
							match: [/d{4}/,"Please fill correct year"]
							},
			}
	],
	albums: [
			{
			albumId: Objectid,
			albumTitle: String,
			producerName: String,
			releaseYear:{
						type: Number,
						match: [/d{4}/,"Please fill correct year"]
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
			awardId: Objectid,
			awardName: String,
			awardingOrg: String,
			awardYear: {
						type: Number,
						match: [/d{4}/,"Please fill correct year"]
						}
			}
	],
	teachers: [
			{
			teachingId: Objectid,
			fromYear: {
						type: Number,
						match: [/d{4}/,"Please fill correct year"]
			},
			toYear: {
						type: Number,
						match: [/d{4}/,"Please fill correct year"]
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
			studentUserId: Objectid,
			teacherId: Objectid,
			fromYear: {
						type: Number,
						match: [/d{4}/,"Please fill correct year"]
			},
			toYear: {
						type: Number,
						match: [/d{4}/,"Please fill correct year"]
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