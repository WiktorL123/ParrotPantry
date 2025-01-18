const express = require('express');
const router = express.Router();
const UsersController = require('../controllers/UsersController');
const verifyToken = require('../middlewares/verifyToken');

//verifyToken disabled - enable later!!!!!
router.post('/register', UsersController.registerUser)
router.get('/profile/:id', UsersController.getUserById)
router.put('/profile/:id', UsersController.updateUser)
router.delete('/profile/:id', UsersController.deleteUser)

module.exports = router;