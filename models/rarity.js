const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const RaritySchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    cost: {
        type: Number,
        required: true,
    }
})

RaritySchema.virtual('url').get(function () {
    return `/rarity/${this.name}`
});

module.exports = mongoose.model('Rarity', RaritySchema);