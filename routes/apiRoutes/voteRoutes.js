const express = require('express');
const router = express.Router();
const db = require('../../db/connection.js');
const inputCheck = require('../../utils/inputCheck');

router.post('/vote', (req, res) => {

    const errors = inputCheck(req.body, 'voter_id', 'candidate_id');
    console.log(req.body);
    if (errors) {
        res.status(400).json({ error: errors });
        return;
    }
    const sql = `INSERT INTO votes (voter_id, candidate_id)
                VALUES (?,?)`;
    const params = Object.values(req.body);

    db.query(sql, params, (err, result) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: req.body
        });
    });

});

router.get('/votes', (req, res) => {
    const sql = `SELECT candidates.*, parties.name AS party_name, COUNT(candidate_id)
    FROM votes
    LEFT JOIN candidates ON votes.candidate_id = candidates.id
    LEFT JOIN parties ON candidates.party_id = parties.id
    GROUP BY candidate_id
    ORDER BY COUNT(candidate_id) DESC;`

    db.query(sql, (err, result) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: result
        });
    });
});

module.exports = router;