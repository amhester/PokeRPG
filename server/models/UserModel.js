/**
 * Created by amhes_000 on 6/24/2015.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passHash = require('password-hash');
var q = require('q');

var userSchema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    createdDate: Date,
    updatedDate: Date,
    LastOnline: Date
});

userSchema.pre('save', function (next) {
    var currentDate = new Date();

    this.updatedDate = currentDate;

    //TODO: function to hash password and set password to new hashed password
    if(this.isNew) {
        this.createdDate = currentDate;
        this.password = passHash.generate(this.password);
    }

    next();
});

userSchema.statics.authenticate = function (email, password, cb) {
    this.findOne({ email: email }, function (err, user) {
        if(user) {
            if(passHash.verify(password, user.password)) {
                cb({ ok: true, message: "Valid user credentials.", user: user });
            } else {
                cb({ ok: false, message: "Invalid password!" });
            }
        } else {
            cb({ ok: false, message: "No User with that email found." });
        }
    });
};

var User = mongoose.model('User', userSchema);

module.exports = User;