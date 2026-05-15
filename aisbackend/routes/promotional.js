const express = require('express');
const router = express.Router();
const db = require('../config/db');

//Poiiii, this is where we get all the prom events
router.get('/', (req, res) => {
    db.query('SELECT * FROM promotional_events ORDER BY created_at DESC', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

//Poiii this is where we add the prom events
router.post('/', (req, res) => {
    const { title, information, event_date, image_url } = req.body;
    const sql = 'INSERT INTO promotional_events (title, information, event_date, image_url) VALUES ( ?, ?, ?, ?)';
    db.query(sql, [title, information, event_date, image_url], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: 'Event Recap Added Successfully! ' });
    });
});

module.exports = router;