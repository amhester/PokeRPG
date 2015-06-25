/**
 * Created by amhes_000 on 6/25/2015.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var itemSchema = new Schema({
    itemName: { type: String, required: true },
    category: { type: String, required: true },
    description: String
});

itemSchema.pre('save', function (next) {
    //TODO: Anything that needs to be done before saving, such as setting the id if it is a new record

    next();
});

var Item = mongoose.model('Item', itemSchema);

module.exports = Item;