const User = require('../Models/users.js');
const bcrypt = require('bcryptjs');
const multer = require('multer');
const path = require('path');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });
exports.renderHomePage = (req, res) => {
    res.render('home');
};
exports.renderLoginPage = (req, res) => {
    res.render('login');
};
exports.renderSignupPage = (req, res) => {
    res.render('signup');
};
exports.renderUploadForm = (req, res) => {
    res.render('uploadForm');
};
exports.signup = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const user = new User({ username, email, password });
        await user.save();
        res.redirect('/login');
    } catch (error) {
        res.status(400).send('Error creating user');
    }
};
exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (user && await bcrypt.compare(password, user.password)) {
            req.session.user = user;
            res.redirect('/');
        } else {
            res.status(400).send('Invalid credentials');
        }
    } catch (error) {
        res.status(400).send('Error logging in');
    }
};
exports.uploadProfilePic = async (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded');
    }
    try {
        await User.findByIdAndUpdate(req.session.user._id, { profilePic: req.file.filename });
        res.redirect('/');
    } catch (err) {
        return res.status(200).send('Done');
    }
};
exports.logout = (req, res) => {
    req.session.destroy();
    res.redirect('/');
};
module.exports.upload = upload;
