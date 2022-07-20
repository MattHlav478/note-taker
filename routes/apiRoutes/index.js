const path = require('path');
const router = require('express').Router();
const { createNewNote, validateNote } = require('../../lib/notes');
const { notes } = require('../../db/db');
const fs = require('fs');

router.get('/notes', (req, res) => {
    // let results = notes
    res.json(notes);
});

router.post('/notes', (req, res) => {
    req.body.id = notes.length.toString();
    if (!validateNote(req.body)) {
        res.status(400).send('The note is not properly formatted.');
    } else {
        const note = createNewNote(req.body, notes)
        res.json(note);
    }
})

// router.delete('/notes/:id', (req, res) => {
//     updatedNotes = notes.filter((delNote) => delNote.id !== req.params.id);
//     fs.writeFileSync(path.join(__dirname, '/db/db.json'),
//         JSON.stringify(notes, null, 2)
//     );
// });

module.exports = router;