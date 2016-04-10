/**
 * Created by gauth_000 on 10-Apr-16.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var Profile = new Schema({
    bio: String,
    birthday: String,
    email: String,
    hometown: String,
    profileLink: String
});

Profile.set('toJSON', {getters: true});
mongoose.model('UserProfile', Profile);