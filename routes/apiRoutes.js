const fs = require('fs');
const uniqid = require("uniqid");

module.exports = function (app) {
    app.get('/api/notes', function (req, res) {
        let data = fs.readFileSync('db/db.json', 'utf8');
        res.json(JSON.parse(data));
    });

app.post('/api/notes', (req, res) => {
    console.log('Received POST request', req.body);
    const newNote = {
        ...req.body,
        id: uniqid(),
      };
    
    let data = fs.readFileSync("db/db.json", "utf8");
    const notesJSON = JSON.parse(data);
    notesJSON.push(newNote);
    fs.writeFileSync('db/db.json', JSON.stringify(notesJSON, null, 2));

    res.json(newNote);
});

app.delete('api/notes/:id', (req, res) => {
    let data = fs.readFileSync("db/db.json", "utf-8");
    const notesJSON = JSON.parse(data);
    const notes = notesJSON.filter((note) => note.id != req.params.id);
    fs.writeFileSync("db/db.json", JSON.stringify(notes, null, 2));
    res.json(notes);
});
};