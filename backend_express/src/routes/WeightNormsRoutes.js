const express = require('express');
const router = express.Router();
const WeightNormsController = require('../controllers/WeightNormsController');
const verifyToken = require('../middlewares/verifyToken');

router.use(verifyToken);

router.get('/', WeightNormsController.getAllWeightNorms)
router.get('/:id', WeightNormsController.getWeightNormById)
router.post('/', WeightNormsController.addWeightNorm)
router.put('/:id', WeightNormsController.updateWeightNorm)
router.delete('/:id', WeightNormsController.deleteWeightNorm)

module.exports = router;