const express = require('express');

const router = express.Router();
const { userAuth } = require('../middlewares');
const userController = require('../controllers/user.controller');

router.post('/signup' , userController.signup );
router.post('/login' , userController.login );
router.get('/user-detail', userAuth,  userController.userDetail)

module.exports = router;