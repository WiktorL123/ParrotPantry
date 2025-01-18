const express = require('express');
const router = express.Router();
const ShopsController = require('../controllers/ShopsController');
const verifyToken = require('../middlewares/verifyToken');


router.use(verifyToken);

router.get('/', ShopsController.getAllShops)
router.get('/:id', ShopsController.getShopById)
router.post('/', ShopsController.addShop)
router.put('/:id', ShopsController.updateShop)
router.delete('/:id', ShopsController.deleteShop)

module.exports = router;