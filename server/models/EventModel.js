/**
 * Created by amhes_000 on 6/25/2015.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var eventSchema = new Schema({
    name: { type: String, required: true },
    city: { type: String, required: true },
    tier: { type: [String], required: true },
    type: { type: String, required: true },
    participants: { type: Number, required: true },
    startDate: { type: Date, required: true },
    endDate: Date, //Not sure if we actually need this
    results: [Number],
    basePointReward: Number, //Don't know if we'll actually use this, might use some kind of calculation instead; calcField?
    baseMoneyReward: Number //Don't know if we'll actually use this, might use some kind of calculation instead; calcField?
});

eventSchema.pre('save', function (next) {
    //TODO: Anything that needs to be done before saving, such as setting the id if it is a new record

    next();
});

var Event = mongoose.model('Event', eventSchema);

module.exports = Event;