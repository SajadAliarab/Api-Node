
const { validationResult } = require('express-validator');

const User = require('../models/users-model');

const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');


// Get all of users
const getUsers = async (req ,res,next) =>{
    const users = await User.find();
    if(!users){
        return res.json({message: 'No users found!'});
    }else{
        res.json({users: users});
    }
 
 
}
exports.getUsers = getUsers;

//Signup
const signup = async (req ,res,next) =>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    const {email,password,name} = req.body;
    const existing = await User .findOne({ email: email });
    if (existing) {
        return res.json({message: 'User already exists!', success: false});
    }
    const hashPassword = await bcrypt.hash(password, 12);
    const newUser = new User({
        email,
        password: hashPassword,
        name
    });
   await newUser.save()
    .then(() => {
        const token = jwt.sign({userId: newUser._id}, 'secret_token')
        res.json({message: 'User created!', user: newUser,token: token, success: true});
    })
    .catch(err => {
        console.log(err);
    });
}
exports.signup = signup;

//Login
const login = async (req ,res,next) =>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    const {email,password} = req.body;
   const validUser = await User.findOne({email: email});
  
    if(!validUser){
         return res.json({message: 'User not found!', success: false});
    }
     const validPassword = await bcrypt.compare(password, validUser.password);
    if (!validPassword){
        return res.json({message: 'Password incorrect!', success: false});
    }
    const token = jwt.sign({userId:validUser._id},'secret_token');
        res.json({message: 'Logged in!',token:token, success: true});
    
    

}
exports.login = login;