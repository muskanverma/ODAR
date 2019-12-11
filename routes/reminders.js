const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Reminder = require('../models/Reminder');
const User = require('../models/User');
const { check, validationResult } = require('express-validator');
//@route    POST /api/reminder 
//desc      add a new reminder
//@access   Private
router.post('/',[[
    check('date','Please Enter date').not().isEmpty()
],auth],async (req,res) =>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    const { text, date } = req.body;
    try{
        let user = await User.findOne({_id:req.user.id});
        let email = user.email;
        let newReminder = new Reminder({
            user: req.user.id,
            email: email,
            text: text,
            date: date
        });
        const addedReminder = await newReminder.save();
        res.json(addedReminder);
    }
    catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

//@route    GET /api/reminder
//@desc     get reminder
//@access   Private
router.get('/',auth,async (req,res) => {
    try {
        userReminders = await Reminder.find({user: req.user.id});
        res.json(userReminders);
    } catch(err){
        console.error(err.message);
        res.status(500).send('Server error');
    }
    //res.send("get a particular reminder")
});



//@route    DELETE /api/reminder
//desc      delete a reminder
//@access   Private
router.delete('/:id',auth,async (req,res) =>{

    try{
        await Reminder.deleteOne({_id: req.params.id});
        res.send("Reminder deleted");
   }
   catch(err){
       res.status(500).json({msg: "Server Error"});
   }

   // res.send("delete a reminder here");
});

module.exports = router;