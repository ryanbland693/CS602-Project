const mysql = require('mysql')
const credentials = require('./credentials');

const con = mysql.createPool({
    host: credentials.host,
    user: credentials.login,
    password: credentials.password,
    database: credentials.db,
    dateStrings: true
})

con.on('connection', (connection) => {
    console.log('Database connected')
}, con.on('error', (err) => {
    if (err) throw err;
    console.log('Database error')
}, con.on('close', (err) => {
    console.log('Database closed')
    if (err) throw err;
})))

module.exports = con;