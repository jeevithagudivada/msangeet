module.exports = {
    db: 'mongodb://127.0.0.1:27017/msangeet',
    //db: 'mongodb://msangeet:11msangeet11@ds015730.mlab.com:15730/msangeeta',
    sessionSecret: 'developmentSessionSecret',
    facebook: {
        clientID: '1528748510753908',
        clientSecret: '870afa6abe8eb0b5b055f6f930aae405',
        callbackURL: 'http://localhost:3000/oauth/facebook/callback'
    },
    google: {
        clientID: '256532438434-pk2gujnb3rdgmdu3gv9v7gjokas0em82.apps.googleusercontent.com',
        clientSecret: 'gojTSsdKMnElqPhc94uXRHJa',
        callbackURL: 'http://localhost:3000/oauth/google/callback'
    },
    twitter: {
        consumerKey: 'x0InzzwEJZ7oIkudQrSqBlsdm',
        consumerSecret: 'EsU0PeL3ctXYOWXD6mGZdnZuIpBn0buDnK0rRL5nXoHJ4KRNXP',
        callbackURL: 'http://localhost:3000/oauth/twitter/callback'
    }
};
