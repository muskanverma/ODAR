const express = require('express');
const router = express.Router();
const config = require('config');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');

//@route    GET /api/auth
//@desc     get logged in use
//@access   Private   ab ye pricate route hai to middlwareuse krna hia isme
router.get('/',auth,async (req,res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch(err){
        console.error(err.message);
        res.status(500).send('Server error');
    }
    
    // res.send("get the loggged in user from this route")
});


//@route    POST /api/auth
//desc      Authenticate user and get token
//@access   Public
router.post('/',[
    check('email','Enter a valid email address').isEmail(),
    check('password','Minimum length of password should be at least 6 characters').isLength({min: 6})
], async (req,res) =>{

    const errors = validationResult(req);
    // if error occured in the filled fields
    if(!errors.isEmpty()){
        res.status(400).json({errors : errors.array()}); 
    }
    // if no error in fields
    else{
        const {email,password} = req.body;
        try{
            let user = await User.findOne({email});
            // if there is a user with given email
            if(user){
                
                const isMatch = await bcrypt.compare(password,user.password);
                // if password does not match with the password stored in db
                if(!isMatch){
                    res.status(400).json({msg: 'Wrong Password'});
                }
                //if password matched
                const payload = {
                    user: {
                        id: user.id
                    }
                }
                jwt.sign(payload, config.get('jwtSecret'),{
                    expiresIn: 360000
                }, (err, token) => {
                    if(err) throw err;
                    res.json({token});
                });
            }
            //if no user with given email
            else{
                res.status(400).json({msg : "Invalid Credentials"})
            }
        } catch(err){
            console.error(err.message);
            res.status(500).send("Server error");
        }
    }
});

module.exports = router;