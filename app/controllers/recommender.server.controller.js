/**
 * Created by gauth_000 on 02-Apr-16.
 */
var fetcher = require('./fb.datafetch.server.controller');
var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var config = require('../../config/env/development.js');
var url = config.db;

exports.getUserFeed = function (userData)
{
    fetcher.getFBData(userData.providerData.accessToken, '/v2.5/me/feed', function (buffer)
    {
        console.log('User feed:');
        console.log(buffer);
    });
};

exports.getUserProfile = function (userData)
{
    fetcher.getFBData(userData.providerData.accessToken, '/v2.5/me?fields=bio,birthday,email,hometown,link,locale', function (buffer)
    {
        MongoClient.connect(url, function (err, db)
        {
            if (err)
                console.log('Unable to connect to the mongoDB server. Error:', err);
            else
            {
                console.log('Connection established to', url);

                // do some work here with the database.
                var collection = db.collection('FacebookData');
                var data = {
                    bio: buffer.bio,
                    birthday: buffer.birthday,
                    email: buffer.email,
                    hometown: buffer.hometown,
                    link: buffer.link,
                    locale: buffer.locale
                };

                collection.insert(data, function (err, result)
                {
                    if (err)
                        console.log(err);
                    else
                        console.log('Inserted %d documents into the "users" collection. The documents inserted with "_id" are:', result.length, result);
                });

                db.close();
            }
        });

        console.log('User profile:');
        console.log(buffer);
    });
};


exports.getUserPhoto = function (userData)
{
    fetcher.getFBData(userData.providerData.accessToken, '/v2.5/me/photos', function (buffer)
    {
        console.log('User photo:');
        console.log(buffer);
    });
};

exports.getFriendsList = function (userData)
{
    fetcher.getFBData(userData.providerData.accessToken, '/v2.5/me/invitable_friends', function (buffer)
    {
        console.log('Friends list:');
        console.log(buffer);
    });
};

exports.getUserLikes = function (userData)
{
    fetcher.getFBData(userData.providerData.accessToken, '/v2.5/me/likes', function (buffer)
    {
        console.log('User likes:');
        console.log(buffer);
    });
};