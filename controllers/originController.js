const Origin = require('../models/origin');
const asyncHandler = require('express-async-handler');

exports.origin_list = asyncHandler(async (req, res, next) => {
    const allOrigins = await Origin.find({}, "name description")
    .sort({ name: 1 })
    .exec();

    res.render("origins", { origin_list: allOrigins });
});

exports.origin_detail = asyncHandler(async (req, res, next) => {
    
})

exports.origin_create_get = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Author create GET");
});
  
exports.origin_create_post = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Author create POST");
});

exports.origin_delete_get = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Author delete GET");
});

exports.origin_delete_post = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Author delete POST");
});

exports.origin_update_get = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Author update GET");
});

exports.origin_update_post = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Author update POST");
});