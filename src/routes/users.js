const express = require('express');
const router = express.Router();

const userController = require('../controllers/users');

const accessTokenUtil = require('../utils/accessToken');

router.get('/', accessTokenUtil.authenticateToken, userController.get);
router.post('/', userController.create);
router.patch('/', accessTokenUtil.authenticateToken, userController.update);
router.post('/login', userController.login);
router.delete('/logout', accessTokenUtil.authenticateToken, userController.logout);
router.delete('/delete', accessTokenUtil.authenticateToken, userController.deleteUser);

module.exports = router;