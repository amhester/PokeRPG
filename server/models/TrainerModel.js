/**
 * Created by amhes_000 on 6/25/2015.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var trainerSchema = new Schema({
    accountId: { type: Number, required: true, unique: true },
    pokemonId: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    gender: String,
    sprite: { type: String, required: true },
    eventPoints: Number,
    money: Number,
    isNPC: Boolean,
    gameClock: Date
});

trainerSchema.pre('save', function (next) {
    //TODO: Anything that needs to be done before saving, such as setting the id if it is a new record

    next();
});

var Trainer = mongoose.model('Trainer', trainerSchema);

module.exports = Trainer;