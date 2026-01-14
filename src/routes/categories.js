const express = require('express');
const router = express.Router();

const categoriesController = require('../controllers/categories');

const accessTokenUtil = require('../utils/accessToken');

router.get('/', accessTokenUtil.authenticateToken, categoriesController.get);
router.post('/', accessTokenUtil.authenticateToken, categoriesController.create);
router.patch('/:id', accessTokenUtil.authenticateToken, categoriesController.update);
router.delete('/:id', accessTokenUtil.authenticateToken, categoriesController.delete);

module.exports = router;