const express = require('express');
const { savePractice, getHistory } = require('../controllers/practiceController');
const { protect } = require('../middleware/auth');
const router = express.Router();
router.use(protect);
router.post('/save', savePractice);
router.get('/history', getHistory);
module.exports = router;
