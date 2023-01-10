const mysql = require("mysql2")
const dotenv = require("dotenv")
dotenv.config()

const pool = mysql
  .createPool({
    host: process.env.MYSQLHOST,
    user: process.env.MYSQLUSER,
    password: process.env.MYSQLPASSWORD,
    database: process.env.MYSQLDATABASE,
  })
  .promise()

async function getNotes() {

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

}
exports.addNote = addNote

async function deleteNote(id) {

}
exports.deleteNote = deleteNote
