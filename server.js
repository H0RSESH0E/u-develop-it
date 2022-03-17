const express = require('express');
const mysql = require('mysql2');

const app = express();
const PORT = process.env.PORT || 3001;

//Express middleware
app.use(express.urlencoded({ exteneded: false }));
app.use(express.json());

// Database connection
const db = mysql.createConnection(
    {
        host: 'localhost',
        user:'root',
        password: '',
        database: 'election'
    },
    console.log('Connected to the election database')
)


app.get('/', (req, res) => {
    res.json({
        message: 'Hello World'
    });
});

// get a singel candidate
db.query(`SELECT * FROM candidates WHERE id = 1`, (err, row) => {
    if (err) {
        console.log(err);
    }
    console.log(row);
});

// Delete candidate
// db.query(`DELETE FROM candidates WHERE id = ?`, 1, (err, result) => {
//     if (err) {
//         console.log(err);
//     }
//     console.log(result);
// })


//Create Candidate
const sql = `INSERT INTO candidates (id, first_name, last_name, industry_connected)
                VALUES (?,?,?,?)`;
const params = [1, 'Ronald', 'Firbank', 1];

db.query(sql, params, (err, result) => {
    if (err) {
        console.log(err);
    }
    console.log(result);
});

db.query(`SELECT * FROM candidates`, (err, rows) => {
    console.log(rows);
})


//catchall default response for any other request to the server
app.use((req, res) => {
    res.status(404).end();
  });
  
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});