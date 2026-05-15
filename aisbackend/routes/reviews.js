const express = require('express');
const router = express.Router();
const db = require('../config/db');

//Poiii, this is where we get the reviews
router.get('/', (req, res) => {
    db.query('SELECT * FROM reviews WHERE is_approved = TRUE ORDER BY created_at DESC', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

//Poiiii this is where we add the review
router.post('/', (req, res) => {
    const { customer_name, company_name, feedback, rating, solution_id } = req.body;
    const sql = 'INSERT INTO reviews (customer_name, company_name, feedback, rating, solution_id) VALUES (?, ?, ?, ?, ?)';
    db.query(sql, [customer_name, company_name, feedback, rating, solution_id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: 'Review Added Successfully!' });
    });
});

module.exports = router;