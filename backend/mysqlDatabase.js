
const mysql = require("mysql2")
const dotenv = require("dotenv")
dotenv.config()

const pool = mysql
  .createPool({
    host: process.env.MYSQLHOST,
    user: process.env.MYSQLUSER,
    password: process.env.MYSQLPASSWORD,
    database: process.env.MYSQLDATABASE,
    waitForConnections: true,
  })
  .promise()

  async function getNotes() {
    let query = `
    SELECT * 
    FROM notes
    `
    const [rows] = await pool.query(query)

    return rows
  
  }
exports.getNotes = getNotes

async function getNote(id) {
    let query = `
    SELECT * 
    FROM notes
    WHERE id = ?
    `
  
    const [rows] = await pool.query(query, [id])
    return rows[0]
  }
exports.getNote = getNote

async function addNote(data) {
  let query = `
  INSERT INTO notes (title, contents)
  VALUES (?, ?)
  `
  const [rows] = await pool.query(query, [data.title, data.contents])
  return rows[0]
}
exports.addNote = addNote

async function deleteNote(id) {
  let query = `
  DELETE FROM notes
  WHERE id = ?
  `
  const [rows] = await pool.query(query, [id])
  return rows
}
exports.deleteNote = deleteNote