const Unit = require('../models/unit');
const asyncHandler = require('express-async-handler');

exports.unit_list = asyncHandler(async (req, res, next) => {
    
})

exports.unit_detail = asyncHandler(async (req, res, next) => {
    
})

exports.unit_create_get = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Author create GET");
  });
  
exports.unit_create_post = asyncHandler(async (req, res, next) => {
res.send("NOT IMPLEMENTED: Author create POST");
});

exports.unit_delete_get = asyncHandler(async (req, res, next) => {
res.send("NOT IMPLEMENTED: Author delete GET");
});

exports.unit_delete_post = asyncHandler(async (req, res, next) => {
res.send("NOT IMPLEMENTED: Author delete POST");
});

exports.unit_update_get = asyncHandler(async (req, res, next) => {
res.send("NOT IMPLEMENTED: Author update GET");
});

exports.unit_update_post = asyncHandler(async (req, res, next) => {
res.send("NOT IMPLEMENTED: Author update POST");
});