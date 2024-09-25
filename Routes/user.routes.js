const express = require('express');
const router = express.Router();
const userController = require('../Controllers/userController.js');

// Routes
router.get('/', userController.renderHomePage);
router.get('/login', userController.renderLoginPage);
router.get('/signup', userController.renderSignupPage);
router.get('/upload', userController.renderUploadForm);

router.post('/signup', userController.signup);
router.post('/login', userController.login);
router.post('/upload', userController.upload.single('profilePic'), userController.uploadProfilePic);

module.exports = router;
