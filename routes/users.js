const express = require('express');
const router = express.Router();
const config = require('config');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
//@route    POST/api/users 
//desc      add a new user/register
//@access   Public
router.post('/',[
    check('name','Name is required').not().isEmpty(),
    check('email','invalid email address').isEmail(),
    check('password','password length should be at least 6').isLength({min: 6 }),
    check('phone','Phone is required').not().isEmpty().isNumeric({min: 10})

], async (req,res) =>{
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    const {name,email,password,phone} = req.body;

    try {
        
            let user = await User.findOne({email});
        if(user){
            return res.status(400).json({ msg : "User already exists" });
        }
        else{
            user = new User({
                name,
                email,
                password,
                phone
            });
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password,salt);
            await user.save();
            
            const payload = {
                user: {
                    id: user.id
                }
            }
            jwt.sign(payload, config.get('jwtSecret'),{
                expiresIn: 360000
            }, (err, token) => {
                res.json({token});
            });
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
        
    }
    

    
   


});

module.exports = router;