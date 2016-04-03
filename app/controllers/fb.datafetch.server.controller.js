/**
 * Created by gauth_000 on 03-Apr-16.
 */
// This module fetches the data from Facebook
var https = require('https');

// Get the data from Facebook for a given graph query path.
exports.getFBData = function (accessToken, apiPath, callback)
{
    if (apiPath.indexOf('search')!=-1)
        accessToken = '&access_token=' + accessToken;
    else
        accessToken = '?access_token=' + accessToken;

    var options =
    {
        host: 'graph.facebook.com',
        path: apiPath + accessToken, //apiPath example: '/me/friends'
        method: 'GET'
    };

    var buffer = ''; //this buffer will be populated with the chunks of the data received from facebook
    var request = https.get(options, function (result)
    {
        result.setEncoding('utf8');
        result.on('data', function (chunk)
        {
            buffer += chunk;
        });

        result.on('end', function ()
        {
            callback(buffer);
        });
    });

    request.on('error', function (e)
    {
        console.log('error from facebook.getFbData: ' + e.message)
    });

    request.end();
};