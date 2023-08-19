const express = require('express');
const fs = require('fs');

const app = express();
const port = 3000;

app.get('/', (req, res) => {
    const file = fs.readFileSync('./index.html');
    res.status(200).send(file);
});

app.get('/:filename', (req, res) => {
    try {
        const filename = req.params.filename;
        const fileLocation = `./${filename}`;

        const file = fs.readFileSync(fileLocation);
        res.status(200).send(file);
    } catch (error) {
        const file = fs.readFileSync('./error.html');
        res.status(200).send(file);
    }
});

const server = app.listen(port, () => {
    console.log(`Server running at port ${port}`);
});
