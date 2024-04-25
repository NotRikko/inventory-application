var express = require('express');
var router = express.Router();

const origin_controller = require('../controllers/originController');
const rarity_controller = require('../controllers/rarityController');
const unit_controller = require('../controllers/unitController');

router.get('/', function(req, res, next) {
  res.render('index');
});

//Origin Routes

router.get("/origin/create", origin_controller.origin_create_get);

router.post("/origin/create", origin_controller.origin_create_post);

router.get("/origin/:id/delete", origin_controller.origin_delete_get);

router.post("/origin/:id/delete", origin_controller.origin_delete_post);

router.get("/origin/:id/update", origin_controller.origin_update_get);

router.post("/origin/:id/update", origin_controller.origin_update_post);

router.get('/origins', origin_controller.origin_list);

router.get('/origin/:id', origin_controller.origin_detail);


//Rarity routes
router.get("/rarity/create", rarity_controller.rarity_create_get);

router.post("/rarity/create", rarity_controller.rarity_create_post);

router.get("/rarity/:id/delete", rarity_controller.rarity_delete_get);

router.post("/rarity/:id/delete", rarity_controller.rarity_delete_post);

router.get("/rarity/:id/update", rarity_controller.rarity_update_get);

router.post("/rarity/:id/update", rarity_controller.rarity_update_post);

router.get('/rarities', rarity_controller.rarity_list);

router.get('/rarity/:id', rarity_controller.rarity_detail);


//Unit routes
router.get("/unit/create", unit_controller.unit_create_get);

router.post("/unit/create", unit_controller.unit_create_post);

router.get("/unit/:id/delete", unit_controller.unit_delete_get);

router.post("/unit/:id/delete", unit_controller.unit_delete_post);

router.get("/unit:id/update", unit_controller.unit_update_get);

router.post("/unit:id/update", unit_controller.unit_update_post);

router.get('/units', unit_controller.unit_list);

router.get('/unit/:id', unit_controller.unit_detail);

module.exports = router;
