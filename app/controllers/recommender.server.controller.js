/**
 * Created by gauth_000 on 02-Apr-16.
 */
var fetcher = require('./fb.datafetch.server.controller');

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