/**
 * Created by amhes_000 on 6/25/2015.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var pokemonMovesSchema = new Schema({
    pokemonId: { type: Number, required: true },
    moveId: { type: Number, required: true },
    isCustom: Boolean
});

pokemonMovesSchema.pre('save', function (next) {
    //TODO: Anything that needs to be done before saving, such as setting the id if it is a new record

    next();
});

var PokemonMoves = mongoose.model('PokemonMoves', pokemonMovesSchema);

module.exports = PokemonMoves;