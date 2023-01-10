const express = require('express');
const path = require("path");
const app = express();



app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));


app.get("/notes", (req, res) => {
    const notes = database.getNotes();
    res.render("notes.ejs", {
      notes,
    });
  })
  
  app.get("/notes/:id", (req, res) => {
    const id = +req.params.id
    const note = database.getNote(id)
    if (!note) {
      res.status(404).render("note404.ejs")
      return
    }
  
    res.render("singleNote.ejs", {
      note,
    });
  })
  
  app.get("/createNote", (req, res) => {
    res.render("createNote.ejs")
  })
  
  app.post("/notes", (req, res) => {
    const data = req.body
    database.addNote(data)
  
    res.redirect("/notes");
  })
  
  app.post("/notes/:id/delete", (req, res) => {
    const id = +req.params.id
    database.deleteNote(id)
    res.redirect("/notes")
  })

  app.get("/", (req, res) => {
    res.render("index.ejs");
    });
    
  

  
  
  const port = 8080;
  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  });