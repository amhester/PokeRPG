/**
 * Created by amhes_000 on 6/25/2015.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var pokemonSchema = new Schema({
    dexId: { type: Number, required: true },
    trainerId: { type: Number, required: true },
    dexName: { type: String, required: true },
    nickname: String,
    level: { type: Number, required: true },
    experience: { type: Number, required: true },
    currentHP: { type: Number, required: true },
    baseHP: { type: Number, required: true },
    givenHP: { type: Number, required: true },
    baseAttack: { type: Number, required: true },
    givenAttack: { type: Number, required: true },
    baseSPAttack: { type: Number, required: true },
    givenSPAttack: { type: Number, required: true },
    baseDefense: { type: Number, required: true },
    givenDefense: { type: Number, required: true },
    baseSpeed: { type: Number, required: true },
    givenSpeed: { type: Number, required: true },
    trainRate: Number
});

pokemonSchema.pre('save', function (next) {
    //TODO: Anything that needs to be done before saving, such as setting the id if it is a new record

    next();
});

var Pokemon = mongoose.model('Pokemon', pokemonSchema);

module.exports = Pokemon;