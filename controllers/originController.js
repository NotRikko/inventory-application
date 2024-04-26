const Origin = require('../models/origin');
const Unit = require('../models/unit');
const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');

exports.origin_list = asyncHandler(async (req, res, next) => {
    const allOrigins = await Origin.find({}, "name description")
    .sort({ name: 1 })
    .exec();

    res.render("origins", { origin_list: allOrigins });
});

exports.origin_detail = asyncHandler(async (req, res, next) => {
    const origin = await Origin.findOne( { _id: req.params.id })
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
    const [origin, allUnitsInOrigin] = await Promise.all([
        Origin.findById(req.params.id).exec(),
        Unit.find( {origin: req.params.id }, 'name image').exec(),
    ]);

    if (origin === null) {
        res.redirect('/origins')
    }

    res.render('origin_delete', { 
        origin: origin,
        allUnitsInOrigin: allUnitsInOrigin,
    });
});

exports.origin_delete_post = asyncHandler(async (req, res, next) => {
    const [origin, allUnitsInOrigin] = await Promise.all([
        Origin.findById(req.params.id).exec(),
        Unit.find( {origin: req.params.id }, 'name image').exec(),
    ]);

    if (allUnitsInOrigin.length > 0) {
        res.render('origin_delete', {
            origin: origin,
            allUnitsInOrigin: allUnitsInOrigin,
        });
        return;
    } else {
        await Origin.findByIdAndDelete(req.params.id);
        res.redirect('/origins')
    }
});

exports.origin_update_get = asyncHandler(async (req, res, next) => {
    const origin = await Origin.findOne({ _id: req.params.id }).exec();

    if(origin === null) {
        const err = new Error('Origin not found');
        err.status = 404;
        return next(err);
    }

    res.render('origin_form', { origin: origin });
});

exports.origin_update_post = [
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
            _id: req.params.id,
            name: req.body.name,
            description: req.body.description,
        });
        if(!errors.isEmpty()) {
            res.render('origin_form', {
                origin: origin,
                errors: errors.array(),
            })
            return
        }   else  {
            const updatedOrigin = await Origin.findOneAndUpdate({ _id: req.params.id }, origin, {});
            res.redirect(updatedOrigin.url);
            };
        }),
];


