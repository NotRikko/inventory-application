const Origin = require('../models/origin');
const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');

exports.origin_list = asyncHandler(async (req, res, next) => {
    const allOrigins = await Origin.find({}, "name description")
    .sort({ name: 1 })
    .exec();

    res.render("origins", { origin_list: allOrigins });
});

exports.origin_detail = asyncHandler(async (req, res, next) => {
    const origin = await Origin.findOne( { name: req.params.id })
    .exec();

    if(origin === null) {
        const err = new Error('Origin not found');
        err.status = 404;
        return next(err);
    }

    res.render('origin_detail', { origin: origin })
});

exports.origin_create_get = asyncHandler(async (req, res, next) => {
    res.render('origin_form')
});
  
exports.origin_create_post = [
    body('name', 'Origin name must contain at least 3 characters')
    .trim()
    .isLength({ min: 3 })
    .escape(),
    body('description', 'Description can not be empty.')
    .trim()
    .isLength({ min: 1 })
    .escape(),

    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);
        const origin = new Origin({
            name: req.body.name,
            description: req.body.description,
        })
        if(!errors.isEmpty()) {
            res.render('origin_form', {
                origin: origin,
                errors: errors.array(),
            })
            return;
        } else {
            const originExists = await Origin.findOne( { name: { '$regex': req.body.name, $options: 'i'} })
            .exec();
            if(originExists) {
                res.redirect(originExists.url);
            } else {
                await origin.save();
                res.redirect(origin.url);
            }
        }
    })
   
]

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