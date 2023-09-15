const mongoose = require('mongoose');
const Schema = mongoose.Schema;

require('mongoose-currency').loadType(mongoose);
var Currency = mongoose.Types.Currency;


var usageSchemaful = new Schema({
    date: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    educational_usage: {
        type: Number,
        required: true,
        default: 0,
        min: 0,
    },
    shopping_usage: {
        type: Number,
        required: true,
        default: 0,
        min: 0,
    },
    browsing_usage: {
        type: Number,
        required: true,
        default: 0,
        min: 0,
    },
    socialmedia_usage: {
        type: Number,
        required: true,
        default: 0,
        min: 0,
    }
}, 
{
    timestamps: true
});

var usage = mongoose.model('Usage', usageSchemaful); //initialize a model with a scheme you created. schema gives the layout while the model provides the functions for interacting the database

module.exports = usage;