// Invoke 'strict' JavaScript mode
'use strict';

// Define the routes module' method
module.exports = function (app) {
    // Load the 'search' controller
    var search = require('../controllers/location.search.server.controller');

    // Mount the 'search' controller's 'render' method
    app.post('/search/guru', search.listTeachers, search.searchGuru);
};
