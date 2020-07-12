const express = require('express');
const pool = require('./db');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
const multer  = require('multer');
// const fs = require('fs');
const port = 8000;

app.use(express.static('images'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

let upload = multer({ dest: 'images/' });
app.post('/Movies', upload.single('file'), async (req, res, next) => {
    // let conn;
    try {
        console.log(req.file);
        console.log(req.body.ID);

        // conn = await pool.getConnection();
        // var query = `INSERT INTO Movies (ID, Name, URL, Description, Picture) VALUES ('${req.body.ID}', '${req.body.Name}', '${req.body.URL}', '${req.body.Description}', '${req.body.Picture}')`;
        // console.log(query);
        // await conn.query(query);
        res.status(201).send();
    } catch (err) {
        throw err;
    }
});

app.put('/Movies', async (req, res) => {
    let conn;
    try {
        conn = await pool.getConnection();
        var query = `UPDATE Movies SET Name = '${req.body.Name}', URL = '${req.body.URL}', Description = '${req.body.Description}', Picture = '${req.body.Picture}' WHERE Id = ${req.body.ID}`;
        console.log(query);
        await conn.query(query);
        res.status(200).send();
    } catch (err) {
        throw err;
    }
});

app.get('/movies', async (req, res) => {
    let conn;
    try {
        conn = await pool.getConnection();
        var query = "select * from Movies";
        var rows = await conn.query(query);
        res.json(rows);
    } catch (err) {
        throw err;
    }
});

app.get('/movies/images/:filename', async (req, res) => {
    res.sendFile(path.join(__dirname, 'images/' + req.params.filename));
});

app.get('/movies/:id', async (req, res) => {
    let conn;
    try {
        conn = await pool.getConnection();
        var query = "SELECT * FROM Movies WHERE ID = " + req.params.id;
        var rows = await conn.query(query);
        res.json(rows);
    } catch (err) {
        throw err;
    }
});

app.delete('/movies', async (req, res) => {
    let conn;
    try {
        conn = await pool.getConnection();
        var query = "DELETE FROM Movies WHERE ID = " + req.body.id;
        // execute the query
        await conn.query(query);
        res.status(204).send();
    } catch (err) {
        throw err;
    }
});

app.listen(port, () => console.log(`Listening on port ${port}`));