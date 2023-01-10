
import mysqlDatabase from './mysqlDatabase'

const express = require("express");
const database = require("./database");

const app = express();

app.use(express.json())

app.get("/notes", (req, res) => {
  const notes = database.getNotes();
  res.send(notes);
})

app.get("/notes/:id", async (req, res) => {
  const id = req.params.id
  try {
    const note = await mysqlDatabase.getNote(id)
    res.send(note)
  } catch (error) {
    console.error(error)
    res.sendStatus(500)
  }
})


app.post("/notes", (req, res) => {
  const data = req.body
  database.addNote(data)
  res.status(201).send(data)
})

app.post("/notes/:id/delete", (req, res) => {
  const id = +req.params.id
  database.deleteNote(id)
  res.send(id)
})

app.use(express.static("public"))

const port = 8080;
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
