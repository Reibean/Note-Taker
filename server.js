const express = require('express');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.get('/api/notes', (req, res) => {
    const data = fs.readFileSync('db.json', 'utf8');
    const notes = JSON.parse(data);
    res.json(notes);
});

app.post('/api/notes', (req, res) => {
    const newNote = req.body;
    const data = fs.readFileSync('db.json', 'utf8');
    const notes = JSON.parse(data);

    newNote.id = generateId();

    notes.push(newNote);
    fs.writeFileSync('db.json', JSON.stringify(notes, null, 2));

    res.json(newNote);
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'notes.html'));
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log('Server is running on port ${PORT}');
});

function generateId() {
    return uuidv4();
}

const uniqueId = generateId();
console.log(uniqueId);