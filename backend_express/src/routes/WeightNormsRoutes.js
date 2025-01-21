const express = require('express');
const router = express.Router();
const WeightNormsController = require('../controllers/WeightNormsController');
const verifyToken = require('../middlewares/verifyToken');

router.use(verifyToken);

router.post('/:parrotId/add', WeightNormsController.addWeightRecord);

router.get('/:parrotId/current', WeightNormsController.getWeightRecordsForWeek);

module.exports = router;