const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

module.exports = function (app) {
    app.get('/api/notes', function (req, res) {
        let data = fs.readFileSync('app/db/db.json', 'utf8');
        res.json(JSON.parse(data));
    });

app.post('/api/notes', (req, res) => {
    const newNote = req.body;
    const data = fs.readFileSync('db.json', 'utf8');
    const notes = JSON.parse(data);

    newNote.id = generateId();

    notes.push(newNote);
    fs.writeFileSync('app/db/db.json', JSON.stringify(notes, null, 2));

    res.json(newNote);
});

app.delete('/api/notes', (req, res) => {
    const noteId = req.params.id;
    const data = fs.readFileSync('db.json', 'utf8');
    const notes = JSON.parse(data);

    newNote.id = generateId();

    notes.push(newNote);
    fs.writeFileSync('app/db/db.json', JSON.stringify(notes, null, 2));

    res.json(newNote);
});
};

function generateId() {
    return uuidv4();
}

const uniqueId = generateId();
console.log(uniqueId);

