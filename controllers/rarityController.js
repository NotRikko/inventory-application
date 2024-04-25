const Rarity = require('../models/rarity');
const asyncHandler = require('express-async-handler');

exports.rarity_list = asyncHandler(async (req, res, next) => {
    const allRarities = await Rarity.find({}, 'name cost')
    .sort({ name: 1 })
    .exec();

    res.render('rarities', { rarity_list: allRarities} )
    
})

exports.rarity_detail = asyncHandler(async (req, res, next) => {
    const rarity = await Rarity.findOne({ name: req.params.id }).exec();

    res.render('rarity_detail', { rarity: rarity });
})

exports.rarity_create_get = asyncHandler(async (req, res, next) => {
    res.render('rarity_form');
});
  
exports.rarity_create_post = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Author create POST");
});

exports.rarity_delete_get = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Author delete GET");
});

exports.rarity_delete_post = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Author delete POST");
});

exports.rarity_update_get = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Author update GET");
});

exports.rarity_update_post = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Author update POST");
});