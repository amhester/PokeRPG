/**
 * Created by amhes_000 on 6/24/2015.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passHash = require('password-hash');

var userSchema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
    createdDate: Date,
    updatedDate: Date,
    LastOnline: Date
});

userSchema.pre('save', function (next) {
    //TODO: function to hash password and set password to new hashed password

    next();
});

userSchema.statics.authenticate = function (email, password, cb) {
    var foundPass = this.findOne({ email: email }, 'password', function (err, pass) {

    });
};

var User = mongoose.model('User', userSchema);

module.exports = User;