/**
 * Created by amhes_000 on 6/25/2015.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var cityRankSchema = new Schema({
    cityId: { type: Number, required: true },
    trainerId: { type: Number, required: true },
    rank: Number
});

cityRankSchema.pre('save', function (next) {
    //TODO: Anything that needs to be done before saving, such as setting the id if it is a new record

    next();
});

var CityRank = mongoose.model('CityRank', cityRankSchema);

module.exports = CityRank;