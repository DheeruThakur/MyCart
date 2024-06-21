const express = require('express');

const router = express.Router();
const { userAuth } = require('../middlewares/index.middleware');
const userController = require('../controllers/user.controller');
const adminController = require("../controllers/admin.controller")

router.post('/signup' , userController.signup );
router.post('/login' , userController.login );
router.get('/user-detail', userAuth,  userController.userDetail)
router.get('/all-users', userAuth,  adminController.fetchAllUser)
router.put('/update-user', userAuth,  adminController.updateUserRole)

module.exports = router;