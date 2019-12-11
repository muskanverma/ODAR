const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Note = require('../models/Note');
const { check, validationResult } = require('express-validator');

//@route    POST/api/notes 
//desc      add a new note
//@access   Private
router.post('/',[[
    check('heading','Please give a heading').not().isEmpty(),
    check('content','Please give some content to you note').not().isEmpty(),
    check('rating','No rating given').not().isEmpty().isNumeric()
],auth],async (req,res) =>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    const {heading, content, date, rating} = req.body;
    try {
        let newNote = new Note({
            heading,
            content,
            date,
            rating,
            user: req.user.id
        });
        const addedNote = await newNote.save(); // ye naam hi likhte hote na? Note.save() to ni likhna?nii
        res.json(addedNote);
    } catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

//@route    GET /api/notes
//@desc     get notes
//@access   Private
router.get('/',auth, async (req,res) => {
    try {
        const userNotes = await Note.find({user: req.user.id});
        res.json(userNotes);

    } catch(err){
        console.error(err.message);
        res.status(500).send('Server error');
    }

});


//@route    PUT /api/notes
//desc      update a note
//@access   Private
router.put('/:id',[auth, [
    check('heading','Please give a heading').not().isEmpty(),
    check('content','Please give some content to you note').not().isEmpty(),
    check('rating','No rating given').not().isEmpty().isNumeric()
]], async (req,res) =>{
        try{
            const {heading,content,date,rating} = req.body;
        const updatedNote = await Note.findOneAndUpdate({_id: req.params.id},{
            "heading":heading,
            "content":content,
            "date":date,
            "rating":rating
        },
        {returnNewDocument: true} 

        );
        res.json(updatedNote); 
    } catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


//@route    DELETE /api/notes
//desc      delete a note
//@access   Private
router.delete('/:id',auth,async (req,res) =>{
    
    try{
         await Note.deleteOne({_id: req.params.id});
         res.send("Note deleted");
    }
    catch(err){
        res.status(500).json({msg: "Server Error"});
    }

});

module.exports = router;