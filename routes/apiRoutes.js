const fs = require("fs");
const uniqid = require("uniqid");

module.exports = function (app) {
  // Get notes
  app.get("/notes", function (req, res) {
    let data = fs.readFileSync("db/db.json", "utf8");
    res.json(JSON.parse(data));
  });

  // Create a new note
app.post("/notes", function (req, res) {
  const newNote = {
    ...req.body,
    id: uniqid(),
  };

  let data = fs.readFileSync("db/db.json", "utf8");

  const notesJSON = JSON.parse(data);

  notesJSON.push(newNote);

  fs.writeFileSync("db/db.json", JSON.stringify(notesJSON));

  res.json(notesJSON);
});

// Delete a note by ID
app.delete("/notes/:id", function (req, res) {
  let data = fs.readFileSync("db/db.json", "utf8");

  const notesJSON = JSON.parse(data);

  const notes = notesJSON.filter((note) => note.id != req.params.id);

  fs.writeFileSync("db/db.json", JSON.stringify(notes));

  res.json(notes);
});
};