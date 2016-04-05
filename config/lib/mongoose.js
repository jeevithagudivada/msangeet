'use strict';

var config = require('../config'),
    mongoose = require('mongoose');

module.exports = function () {
    var db = mongoose.connect(config.db);

    require('../../app/models/user.server.model');require('../../app/models/album.server.model');
require('../../app/models/book.server.model');
require('../../app/models/genre.server.model');
require('../../app/models/location.server.model');
require('../../app/models/musicmedium.server.model');
require('../../app/models/musictraining.server.model');
require('../../app/models/organization.server.model');
require('../../app/models/user.server.model');

    return db;
};
