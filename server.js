const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const data = require('./db/data')

app.use(function (req, res, next) {
    if (req.headers['x-forwarded-proto'] === 'https') {
        res.redirect('http://' + req.hostname + req.url);
    } else {
        next();
    }
});

app.use(express.static('public'))

app.get('/', function (req, res) {
    res.send("Hello World!");
});

app.get('/levels/:index', (req, res) => {
    const levelIndex = req.params['index'];
    const level = `level${levelIndex}`
    const totalLevels = Object
        .keys(data)
        .length
    res
        .status(200)
        .json({totalLevels, levelIndex, data: data[level]})
})

app.listen(PORT, function () {
    console.log(`Listen on port ${PORT}...`);
});