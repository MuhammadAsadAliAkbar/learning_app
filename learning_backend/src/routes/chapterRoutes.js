const express = require('express');
const { getAll, getOne } = require('../controllers/chapterController');
const router = express.Router();
router.get('/', getAll);
router.get('/:id', getOne);
module.exports = router;
