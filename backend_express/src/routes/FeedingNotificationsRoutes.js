const express = require('express');
const router = express.Router();
const verifyToken = require("../middlewares/verifyToken");
const FeedingNotificationsController = require("../controllers/FeedingNotificationsController");
router.use(verifyToken)
router.get('/:parrotId', FeedingNotificationsController.getAllFeedingNotifications)
router.post('/:parrotId', FeedingNotificationsController.addFeedingNotification)
router.delete('/:parrotId/:id', FeedingNotificationsController.deleteFeedingNotification)


module.exports = router;