const express = require('express');
const { register, login, getMe, updateProgress } = require('../controllers/authController');
const { protect } = require('../middleware/auth');
const router = express.Router();
router.post('/register', register);
router.post('/login', login);
router.get('/me', protect, getMe);
router.put('/progress', protect, updateProgress);
module.exports = router;
