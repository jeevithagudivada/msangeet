/**
 * Created by gauth_000 on 03-Apr-16.
 */
//This module will lookup a query in the Facebook graph
    /*
    For the paramater type=
     user
     Search for a person (if they allow their name to be searched for).
     
     page
     Search for a Page.
     
     event
     Search for an event.
     
     group
     Search for a Group.
     
     place
     Search for a place. You can narrow your search to a specific location and distance by adding the center parameter (with latitude and longitude) and an optional distance parameter (in meters):
     
     placetopic
     Returns a list of possible place Page topics and their IDs. Use with topic_filter=all parameter to get the full list.
     None.
     */

var fetcher=require('./fb.datafetch.server.controller');

exports.searchFB=function(userData, query, type)
{
    console.log('Search');
    fetcher.getFBData(userData.providerData.accessToken, '/v2.5/search?q='+query+'&type='+type, onDataFetchComplete);
};

function onDataFetchComplete(buffer)
{
    console.log(buffer);
};