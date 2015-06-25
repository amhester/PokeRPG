/**
 * Created by amhes_000 on 6/25/2015.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var bagSchema = new Schema({
    trainerId: { type: Number, required: true },
    itemName: { type: String, required: true }
});

bagSchema.pre('save', function (next) {
    //TODO: Anything that needs to be done before saving, such as setting the id if it is a new record

    next();
});

var Bag = mongoose.model('Bag', bagSchema);

module.exports = Bag;