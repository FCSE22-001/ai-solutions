const express = require('express');
const router = express.Router();
const db = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Poiiii this is the token verification middleware
const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.status(401).json({ error: 'No token provided' });
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return res.status(401).json({ error: 'Invalid token' });
        req.adminId = decoded.id;
        next();
    });
};

// Poiiii this is where we handle the admin login logic
router.post('/login', (req, res) => {
    const { username, password } = req.body;
    db.query('SELECT * FROM administrators WHERE username = ?', [username], async (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0) return res.status(401).json({ error: 'INVALID CREDENTIALS' });

        const admin = results[0];
        const match = await bcrypt.compare(password, admin.password);
        if (!match) return res.status(401).json({ error: 'INVALID CREDENTIALS' });

        const token = jwt.sign({ id: admin.id }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.json({ token });
    });
});

// Poiiii this is where we get the inquiry stats
router.get('/stats', verifyToken, (req, res) => {
    const stats = {};
    db.query('SELECT COUNT(*) as total_inquiries FROM inquiries', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        stats.total_inquiries = results[0].total_inquiries;
        db.query('SELECT COUNT(*) as approved_reviews FROM reviews WHERE is_approved = TRUE', (err, results) => {
            if (err) return res.status(500).json({ error: err.message });
            stats.approved_reviews = results[0].approved_reviews;
            db.query('SELECT COUNT(*) as pending_reviews FROM reviews WHERE is_approved = FALSE', (err, results) => {
                if (err) return res.status(500).json({ error: err.message });
                stats.pending_reviews = results[0].pending_reviews;
                res.json(stats);
            });
        });
    });
});

// Poiiii this is where we get all inquiries
router.get('/inquiries', verifyToken, (req, res) => {
    db.query('SELECT * FROM inquiries ORDER BY created_at DESC', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// Poiiii this is where we get all the feedback
router.get('/reviews', verifyToken, (req, res) => {
    db.query('SELECT * FROM reviews ORDER BY created_at DESC', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// Poiiiii, this is where we give the admin the power to delete nasty comments
router.delete('/reviews/:id', verifyToken, (req, res) => {
    db.query('DELETE FROM reviews WHERE id = ?', [req.params.id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Review Deleted Successfully!' });
    });
});

// Poiiii, this is where we approve a review
router.put('/reviews/:id/approve', verifyToken, (req, res) => {
    db.query('UPDATE reviews SET is_approved = TRUE WHERE id = ?', [req.params.id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Feedback Approved!' });
    });
});

module.exports = router;