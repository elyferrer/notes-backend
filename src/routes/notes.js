const express = require('express');
const router = express.Router();

const notesController = require('../controllers/notes');

const accessTokenUtil = require('../utils/accessToken');

router.get('/', accessTokenUtil.authenticateToken, notesController.get);
router.get('/:id', accessTokenUtil.authenticateToken, notesController.getByCategory);
router.get('/details/:id', accessTokenUtil.authenticateToken, notesController.getDetails);
router.post('/', accessTokenUtil.authenticateToken, notesController.create);
router.patch('/:id', accessTokenUtil.authenticateToken, notesController.update);
router.delete('/:id', accessTokenUtil.authenticateToken, notesController.delete);

module.exports = router;