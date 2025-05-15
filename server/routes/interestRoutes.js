const express = require('express');
const router = express.Router();
const interestController = require('../controllers/interestController');

router.post('/', interestController.createInterest);
router.get('/', interestController.getAllInterests);
router.get('/:id', interestController.getInterestById);
router.delete('/:id', interestController.deleteInterest);

module.exports = router;
