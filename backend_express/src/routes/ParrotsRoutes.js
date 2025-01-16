const express = require('express');
const router = express.Router();
const ParrotController = require('../controllers/ParrotsController');
const verifyToken = require('../middlewares/verifyToken');

router.use(verifyToken);

router.get('/', ParrotController.getAllParrots)
router.get('/:id', ParrotController.getParrotsById)
router.post('/', ParrotController.addParrot)
router.put('/:id', ParrotController.updateParrot)
router.delete('/:id', ParrotController.deleteParrot)


module.exports = router