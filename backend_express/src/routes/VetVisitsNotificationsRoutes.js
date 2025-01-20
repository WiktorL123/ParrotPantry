const express = require('express');
const vetVisitNotificationsController = require('../controllers/VetVisitsNotificationsController');
const router = express.Router();

router.get('/:parrotId', vetVisitNotificationsController.getAllVisitsNotification)
router.post('/:parrotId/:vetId', vetVisitNotificationsController.addVetVisitNotification)
router.delete('/:parrotId/:id', vetVisitNotificationsController.deleteVetVisitNotification)



module.exports = router;