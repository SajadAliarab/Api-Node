const express = require('express');
const router = express.Router();
const usersControllers = require('../controllers/users-controllers');
const {check} = require('express-validator');


router.get('/', usersControllers.getUsers);
router.post('/signup',
    [
    check('email').isEmail(),
    check('password').isLength({ min: 5 }),
    check('name').not().isEmpty()
], usersControllers.signup);
router.post('/login',[check('email').not().isEmpty(), check('password').not().isEmpty()], usersControllers.login);

module.exports = router;