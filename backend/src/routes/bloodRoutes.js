const express = require('express');
const { createRequest, getRequests } = require('../controllers/bloodController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/request', authMiddleware, createRequest);
router.get('/requests', getRequests);

module.exports = router;
