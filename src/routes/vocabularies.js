const express = require('express');
const router = express.Router();

const vocabulariesController = require('../controllers/vocabularies');

const accessTokenUtil = require('../utils/accessToken');

router.get('/', accessTokenUtil.authenticateToken, vocabulariesController.get);
router.post('/', accessTokenUtil.authenticateToken, vocabulariesController.create);
router.patch('/:id', accessTokenUtil.authenticateToken, vocabulariesController.update);
router.delete('/:id', accessTokenUtil.authenticateToken, vocabulariesController.delete);

module.exports = router;