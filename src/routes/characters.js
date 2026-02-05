const express = require('express');
const router = express.Router();

const charactersController = require('../controllers/characters');

const accessTokenUtil = require('../utils/accessToken');

router.get('/', accessTokenUtil.authenticateToken, charactersController.get);
router.get('/:id', accessTokenUtil.authenticateToken, charactersController.getDetails);
router.get('/category/:id', accessTokenUtil.authenticateToken, charactersController.getByCategory);

router.post('/', accessTokenUtil.authenticateToken, charactersController.create);
router.patch('/:id', accessTokenUtil.authenticateToken, charactersController.update);
router.delete('/:id', accessTokenUtil.authenticateToken, charactersController.delete);

module.exports = router;