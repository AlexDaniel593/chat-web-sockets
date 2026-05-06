const express = require('express');
const { register } = require('module');
const router = express.Router();
const path = require('path');

const views = path.join(__dirname, '../views'); // src\views

router.get('/', (req, res) => {
    res.sendFile(views + '/index.html');
});

router.get('/register', (req, res) => {
    res.sendFile(views + '/register.html');
});

module.exports = router;