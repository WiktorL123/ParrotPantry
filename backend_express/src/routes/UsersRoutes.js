const express = require('express');
const router = express.Router();
const UsersController = require('../controllers/UsersController');
const verifyToken = require('../middlewares/verifyToken');


router.post('/register', UsersController.registerUser)
router.get('/profile/:id', verifyToken, UsersController.getUserById)
router.put('/profile/:id', verifyToken, UsersController.updateUser)
router.delete('/profile/:id', verifyToken, UsersController.deleteUser)

module.exports = router;