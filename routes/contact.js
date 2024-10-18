const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Message = require('../models/message');


router.get('/', (req, res) => {
    res.render('contact.ejs');
});

router.post('/send-message', async (req, res) => {
    const { name, email, subject, message } = req.body;

    try {
        // Save the message to the database
        const newMessage = new Message({ name, email, subject, message, date: new Date() });
        await newMessage.save();

        // Redirect to the thank-you page
        res.redirect('/contact/thank-you');
    } catch (error) {
        console.error('Failed to send message:', error);
        res.status(500).send('Something went wrong. Please try again later.');
    }
});

// Route for the thank-you page
router.get('/thank-you', (req, res) => {
    res.render('contactMS.ejs');
});

module.exports = router;