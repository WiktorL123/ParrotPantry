const express = require('express');
const router = express.Router();
const MedicineNotificationsController = require('../controllers/MedicineNotificationsController');
const verifyToken = require("../middlewares/verifyToken");
router.use(verifyToken)

router.get('/:parrotId', MedicineNotificationsController.getAllMedicines)
router.post('/:parrotId', MedicineNotificationsController.addMedicine)
router.delete('/:parrotId/:id', MedicineNotificationsController.deleteMedicine)

module.exports = router;