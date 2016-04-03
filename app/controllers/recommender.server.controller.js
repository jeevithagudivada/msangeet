/**
 * Created by gauth_000 on 02-Apr-16.
 */
var fetcher=require('./fb.datafetch.server.controller');
exports.getUserFeed = function (userData)
{
    console.log('User feed:');
    fetcher.getFBData(userData.providerData.accessToken, '/v2.5/me/feed', onDataFetchComplete);
};

exports.getUserPhoto= function (userData)
{
    console.log('User photo:');
    fetcher.getFBData(userData.providerData.accessToken, '/v2.5/me/photos', onDataFetchComplete);
};

exports.getFriendsList=function(userData)
{
    console.log('Friends list:');
    fetcher.getFBData(userData.providerData.accessToken, '/v2.5/me/invitable_friends', onDataFetchComplete);
};

exports.getUserLikes=function(userData)
{
    console.log('User likes:');
    fetcher.getFBData(userData.providerData.accessToken, '/v2.5/me/likes', onDataFetchComplete);
};


function onDataFetchComplete(buffer)
{
    console.log(buffer);
}