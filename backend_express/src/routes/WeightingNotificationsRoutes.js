const express = require('express');
const router = express.Router();
const WeightingNotificationsController = require('../controllers/WeightingNotificationsController');
const verifyToken = require('../middlewares/verifyToken');


router.use(verifyToken)

router.get('/:parrotId', WeightingNotificationsController.getAllWeighingNotifications)
router.post('/:parrotId', WeightingNotificationsController.addWeightingNotification)
router.delete('/:parrotId/:id', WeightingNotificationsController.deleteWeightingNotification)


module.exports = router;