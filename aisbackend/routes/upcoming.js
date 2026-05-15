const express = require('express');
const router = express.Router();
const db = require('../config/db');

//Poiiii this is where we et all upcoming events
router.get('/', (req, res) => {
    db.query('SELECT * FROM upcoming_events ORDER BY event_date ASC', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

//Pooiiii this is where we add an upcoming event
router.post('/', (req, res) => {
    const { title, information, event_date, location, image_url } = req.body;
    const sql = 'INSERT INTO upcoming_events (title, information, event_date, location, image_url) VALUES ( ?, ?, ?, ?, ?)';
    db.query(sql , [title, information, event_date, location, image_url], (err, result) => {
        if (err) return res.status(500). json({ error: err.message });
        res.status(201).json({ message: 'Event Alert Added Successfully! '});
    });
});

module.exports = router;