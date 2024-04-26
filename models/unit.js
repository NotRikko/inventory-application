const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UnitSchema = new Schema({
    name : {
        type: String,
        required: true,
    },
    origin: {
        type: Schema.Types.ObjectId,
        ref: "Category",
        required: true,
    },
    cost: {
        type: Schema.Types.ObjectId,
        ref: "Rarity",
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    }
});

UnitSchema.virtual('url').get(function () {
    return `/unit/${this._id}`
});

module.exports = mongoose.model('Unit', UnitSchema)