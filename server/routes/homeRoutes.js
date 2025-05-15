const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController');

router.post('/', homeController.createHome);
router.get('/', homeController.getAllHomes);
router.get('/:id', homeController.getHomeById);
router.put('/:id', homeController.updateHome);
router.delete('/:id', homeController.deleteHome);

module.exports = router;
