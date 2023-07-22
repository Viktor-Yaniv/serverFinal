const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const validationMiddleware = require('../middleware/validationMiddleware');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/register', validationMiddleware, authController.register);
router.post('/login', validationMiddleware, authController.login);
router.get('/me', authMiddleware, authController.me);

module.exports = router;
