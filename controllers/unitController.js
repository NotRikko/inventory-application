const Unit = require('../models/unit');
const Origin = require('../models/origin');
const Rarity = require('../models/rarity');
const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');


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
    const [allOrigins, allRarities] = await Promise.all([
        Origin.find().sort({ name: 1 }).exec(),
        Rarity.find().sort({ name: 1 }).exec(),
    ]);
    
    res.render('unit_form', {
        origins: allOrigins,
        rarities: allRarities,
    });
});
  
exports.unit_create_post = [
    body('name', 'Name must be longer than 3 characters')
    .trim()
    .isLength({ min: 3 })
    .escape(),
    body('origin', "Origin must not be empty")
    .trim()
    .isLength({ min: 1 })
    .escape(),
    body('rarity').escape(),
    body('amount')
    .trim()
    .notEmpty().withMessage('Amount cannot be empty')
    .isInt({ min: 9 }).withMessage('Amount must be at least 9')
    .escape(),
    body('description', 'Description must be longer than 3 characters')
    .trim()
    .isLength({ min: 3 })
    .escape(),
    body('image', 'Please put an image URL')
    .trim()
    .isLength({ min: 1 })
    .isURL(),

    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);
        console.log(req.body);
        const unit = new Unit({
            name: req.body.name,
            origin: req.body.origin,
            cost: req.body.rarity,
            amount: req.body.amount,
            description: req.body.description,
            image: req.body.image,
        });
        if(!errors.isEmpty()) {
            const [allOrigins, allRarities] = await Promise.all([
                Origin.find().sort({ name: 1 }).exec(),
                Rarity.find().sort({ name: 1 }).exec(),
            ]);
            
            res.render('unit_form', {
                unit: unit,
                origins: allOrigins,
                rarities: allRarities,
                errors: errors.array(),
            })
        } else {
            const unitExists = await Unit.findOne( { name: { '$regex': req.body.name, $options: 'i' } })
            .exec();
            if(unitExists) {
                res.redirect(unitExists.url);
            } else {
                await unit.save();
                res.redirect(unit.url);
            }
        }
    })
];

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