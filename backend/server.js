const express = require("express");
const app = express();
const path = require("path");
const database = require("./mysqlDatabase");
const bodyParser = require("body-parser");


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: false }));


app.get("/notes", async (req, res) => {
  const notes = await database.getNotes();
  
    res.render("notes.ejs", {
      notes,
  });
});

app.get("/notes/:id", async (req, res) => {
  const id = +req.params.id;
  const note = await database.getNote(id);
  if (!note) {
    res.status(404).render("note404.ejs");
    return;
  }
  note.created = note.created.toLocaleDateString();
    res.render("singleNote", {
        note, });
});

app.get("/createNote", (req, res) => {
  res.render("createNote");
});

app.post("/notes", async (req, res) => {
  const data = {
    title: req.body.title,
    contents: req.body.contents,
  };
  await database.addNote(data);
  res.redirect("/notes");
});

app.post("/notes/:id/delete", async (req, res) => {
  const id =+ req.params.id;
  await database.deleteNote(id);
  res.redirect("/notes");
});



app.get("/", (req, res) => {
  res.render("index.ejs");
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});