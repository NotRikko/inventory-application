const Unit = require('../models/unit');
const asyncHandler = require('express-async-handler');

exports.unit_list = asyncHandler(async (req, res, next) => {
    const allUnits = await Unit.find({}, 'name origin cost amount image description')
    .sort({ origin: 1 })
    .populate('origin cost')
    .exec();

    res.render('units', { unit_list: allUnits });
})

exports.unit_detail = asyncHandler(async (req, res, next) => {
    const unit = await Unit.findOne({ name: req.params.id })
    .populate('origin cost')
    .exec();

    if(unit === null) {
        const err = new Error('Unit not found');
        err.status = 404;
        return next(err);
    }

    res.render('unit_detail', {
        unit: unit,
    })
})

exports.unit_create_get = asyncHandler(async (req, res, next) => {
    res.render('unit_form');
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