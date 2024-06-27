const express = require('express');
const router = express.Router();
const { userAuth, adminAuth } = require('../middlewares/index.middleware');
const userController = require('../controllers/user.controller');
const productController = require("../controllers/product.controller")

router.post('/signup' , userController.signup );
router.post('/login' , userController.login );
router.get('/user-detail', userAuth,  userController.userDetail)
router.get('/all-users', userAuth, adminAuth , userController.fetchAllUser)
router.put('/update-user', userAuth, adminAuth , userController.updateUserRole)

// product routes

router.post('/upload-product' , userAuth , adminAuth , productController.uploadProduct);
router.get('/all-products' , productController.fetchAllProducts);
router.put('/update-product' , userAuth , adminAuth , productController.updateProduct)

module.exports = router;