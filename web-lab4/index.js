const express = require('express')
const bodyParser = require('body-parser')
const http = require('http')
const app = express();
const server = http.createServer(app);
app.use(bodyParser.json());
const PORT = 3000
let object = null;

app.get('/', (req, res) => {
    res.status(200).json(object);
})

app.post('/', (req, res) => {
    if (!object) {
        object = JSON.parse(JSON.stringify(req.body));
        res.status(200).json({ message: 'ok' });
    } else {
        res.status(400).json({ message: 'already exist' });
    }
})

app.put('/', (req, res) => {
    if (object) {
        object = req.body;
        res.status(200).json({ message: 'ok' });
    } else {
        res.status(400).json({ message: 'not exist' });
    }
})

app.patch('/', (req, res) => {
    if (object) {
        object = { ...object, ...req.body }
        res.status(200).json({ message: 'ok' });
    } else {
        res.status(400).json({ message: 'not exist' });
    }
})

server.listen(PORT, () => {
    console.log(`app is listening to port ${PORT}`);
})
