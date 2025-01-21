const express = require('express');
const vetVisitNotificationsController = require('../controllers/VetVisitsNotificationsController');
const verifyToken = require("../middlewares/verifyToken");
const router = express.Router();
router.use(verifyToken)

router.get('/:parrotId', vetVisitNotificationsController.getAllVisitsNotification)
router.post('/:parrotId/:vetId', vetVisitNotificationsController.addVetVisitNotification)
router.delete('/:parrotId/:id', vetVisitNotificationsController.deleteVetVisitNotification)



module.exports = router;