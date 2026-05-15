const express = require('express');
const router = express.Router();
const db = require('../config/db');

//Poiiii, this is where the inquiry submission ting
router.post('/', (req, res) => {
    const { name, email, phone, company_name, country, job_title, job_details } = req.body;
    const sql = 'INSERT INTO inquiries (name, email, phone, company_name, country, job_title, job_details) VALUES (?, ?, ?, ?, ?, ?, ?)';
    db.query(sql, [name, email, phone, company_name, country, job_title, job_details], (err, result) => {
        if (err) return res.status(500).json({error: err.message});
        res.status(201).json({ message: 'Inquiry Submitted Successfully!' });
    });
});

//Poiii, this is where the admin gets all their inquiries
router.get('/', (req, res) => {
    db.query('SELECT * FROM inquiries ORDER BY created_at DESC', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

module.exports = router;

