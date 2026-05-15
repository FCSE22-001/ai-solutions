const express = require('express');
const router = express.Router();
const db = require('../config/db');

//get all solutions
router.get('/', (req, res) => {
    db.query('SELECT * FROM solutions ORDER BY created_at DESC', (err, results) => {
         if (err) return res.status(500).json({ error: err.message });
         res.json(results);
    });
});
//get one solution
router.get('/:id', (req, res) => {
    db.query('SELECT * FROM solutions WHERE id = ?', [req.params.id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0) return res.status(404).json({ error: 'Solution not found' });
        res.json(results[0]);
    });
});

router.get('/:id/reviews', (req, res) => {
    db.query(
        'SELECT * FROM reviews WHERE solution_id = ? AND is_approved = TRUE ORDER BY created_at DESC',
        [req.params.id],
        (err, results) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json(results);
        }
    );
});

module.exports = router;