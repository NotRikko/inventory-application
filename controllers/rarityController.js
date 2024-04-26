const Rarity = require('../models/rarity');
const Unit = require('../models/unit');
const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');


exports.rarity_list = asyncHandler(async (req, res, next) => {
    const allRarities = await Rarity.find({}, 'name cost')
    .sort({ name: 1 })
    .exec();

    res.render('rarities', { rarity_list: allRarities} )
    
})

exports.rarity_detail = asyncHandler(async (req, res, next) => {
    const rarity = await Rarity.findOne({ _id: req.params.id }).exec();

    res.render('rarity_detail', { rarity: rarity });
})

exports.rarity_create_get = asyncHandler(async (req, res, next) => {
    res.render('rarity_form');
});
  
exports.rarity_create_post = [
    body('name', 'Rarity name must be more than 3 characters')
    .trim()
    .isLength({ min: 3 })
    .escape(),
    body('cost')
    .trim()
    .notEmpty().withMessage('Cost cannot be empty')
    .isInt({ min: 0 }).withMessage('Cost must be greater than 0')
    .escape(),

    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);
        const rarity = new Rarity({
            name: req.body.name,
            cost: req.body.cost,
        })
        if(!errors.isEmpty()) {
            res.render('rarity_form', {
                rarity: rarity,
                errors: errors.array(),
            })
            return;
        } else {
            const rarityExists = await Rarity.findOne( { name: { '$regex': req.body.name, $options: 'i' } })
            .exec();
            if(rarityExists) {
                res.redirect(rarityExists.url);
            } else {
                await rarity.save();
                res.redirect(rarity.url);
            }
        }
    })
];

exports.rarity_delete_get = asyncHandler(async (req, res, next) => {
    const [rarity, allUnitsInRarity] = await Promise.all([
        Rarity.findById(req.params.id).exec(),
        Unit.find( {origin: req.params.id }, 'name image').exec(),
    ]);

    if (rarity === null) {
        res.redirect('/origins')
    }

    res.render('rarity_delete', { 
        rarity: rarity,
        allUnitsInRarity: allUnitsInRarity,
    });
});

exports.rarity_delete_post = asyncHandler(async (req, res, next) => {
    const [rarity, allUnitsInRarity] = await Promise.all([
        Rarity.findById(req.params.id).exec(),
        Unit.find( {origin: req.params.id }, 'name image').exec(),
    ]);

    if (allUnitsInRarity.length > 0) {
        res.render('rarity_delete', {
            rarity: rarity,
            allUnitsInRarity: allUnitsInRarity,
        });
        return;
    } else {
        await Rarity.findByIdAndDelete(req.params.id);
        res.redirect('/rarities')
    }
});

exports.rarity_update_get = asyncHandler(async (req, res, next) => {
    const rarity = await Rarity.findOne({ _id: req.params.id }).exec();

    if(rarity === null) {
        const err = new Error('Origin not found');
        err.status = 404;
        return next(err);
    }

    res.render('rarity_form', {rarity: rarity });
});

exports.rarity_update_post = [
    body('name', 'Rarity name must be more than 3 characters')
    .trim()
    .isLength({ min: 3 })
    .escape(),
    body('cost')
    .trim()
    .notEmpty().withMessage('Cost cannot be empty')
    .isInt({ min: 0 }).withMessage('Cost must be greater than 0')
    .escape(),

    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);
        const rarity = new Rarity({
            _id: req.params.id,
            name: req.body.name,
            cost: req.body.cost,
        })
        if(!errors.isEmpty()) {
            res.render('rarity_form', {
                rarity: rarity,
                errors: errors.array(),
            })
            return;
        } else {
            const rarityExists = await Rarity.findOneAndUpdate({ _id: req.params.id }, rarity, {});
            res.redirect(rarityExists.url);
        };
    })
]