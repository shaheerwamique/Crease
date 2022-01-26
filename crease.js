const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');  // ES6 Destruction assignment

const app = express();
app.use(bodyParser.json());

const crease = {};

app.get('/crease', (req, res) => {
    res.send(crease);
});

app.post('/crease', (req, res) => {
    const id = randomBytes(4).toString('hex');
    const { creaser } = req.body;

    crease[id] = {
        id,
        creaser
    };

    res.status(201).send(crease[id]);
});

app.listen(4000, () => {
    console.log('Listening on port 4000');
});

