/**
 * Created by gauth_000 on 02-Apr-16.
 */
var fetcher = require('./fb.datafetch.server.controller');


exports.getUserProfile = function (userData)
{
    fetcher.getFBData(userData.providerData.accessToken, '/v2.5/me?fields=bio,birthday,email,hometown,link,locale', function (buffer)
    {
        console.log('User profile:');
        console.log(buffer);
    });
};
