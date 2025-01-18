const express = require('express');
const router = express.Router();
const VeterinariansController = require('../controllers/VeterinariansController');
const verifyToken = require('../middlewares/verifyToken');

router.use(verifyToken);

router.get('/', VeterinariansController.getAllVeterinarian)
router.get('/:id', VeterinariansController.getVeterinarianById)
router.post('/', VeterinariansController.addVeterinarian)
router.put('/:id', VeterinariansController.updateVeterinarian)
router.delete('/:id', VeterinariansController.deleteVeterinarian)

module.exports = router;