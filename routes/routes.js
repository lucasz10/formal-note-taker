const fs = require('fs');
const uuid = require('../helpers/uuid')
const router = require('express').Router();

// Retrieves notes information to display on screen
router.get('/notes', (req,res) => {
    console.log("Getting previous notes...");
    fs.readFile('./db/db.json', 'utf8', (err,data) => {
        if (err) {
            console.error(err)
        } else {
            return res.json(JSON.parse(data));
        }
    })
})

// Adds new note
router.post('/notes', (req,res) => {
    console.log("Notes being updated...");
    fs.readFile('./db/db.json', 'utf8', (err,data) => {
        let notes = JSON.parse(data);

        const {title, text} = req.body;

        if(req.body) {
            const newNote = {
                title,
                text,
                id: uuid(),
            };
            notes.push(newNote);

            fs.writeFile('./db/db.json', JSON.stringify(notes), (err) => {
                if (err) {
                    console.error(err);
                } else {
                    res.json(notes);
                }
            });
        }
    });
});

module.exports = router;