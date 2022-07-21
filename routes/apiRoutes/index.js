const path = require('path');
const router = require('express').Router();
const { createNewNote, validateNote } = require('../../lib/notes');
const { notes } = require('../../db/db');
const fs = require('fs');
const { v4: uuid } = require('uuid');

// get route
router.get('/notes', (req, res) => {
    // let results = notes
    res.json(notes);
});

// post route
router.post('/notes', (req, res) => {
    req.body.id = uuid();
    if (!validateNote(req.body)) {
        res.status(400).send('The note is not properly formatted.');
    } else {
        const note = createNewNote(req.body, notes)
        res.json(note);
    }
})

// delete route 
router.delete('/notes/:id', (req, res) => {
    // destructures while keep array; utf-8 avoids buffering (from Mac)
    const { notes } = JSON.parse(fs.readFileSync(path.join(__dirname, '../../db/db.json'), 'utf-8'));

    // filters request object out of array
    updatedNotes = notes.filter((delNote) => delNote.id !== req.params.id);

    // create a new object to hold notes array and then write it to db.json
    const newJson = {};
    newJson.notes = updatedNotes;
    fs.writeFileSync(path.join(__dirname, '../../db/db.json'),
        JSON.stringify(newJson, null, 2)
    );
    res.status(201).json(updatedNotes);
});

module.exports = router;