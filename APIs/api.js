const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3001;
const itemPath = path.join(__dirname, 'items.json');

app.use(express.json());

const loadItemsFromFile = () => {
    try {
        const fileContents = fs.readFileSync(itemPath, 'utf8');
        return JSON.parse(fileContents) || [];
    } catch (error) {
        return [];
    }
};

const saveItemsToFile = () => {
    const jsonItems = JSON.stringify(items, null, 2);
    fs.writeFileSync(itemPath, jsonItems, 'utf8');
};

const items = loadItemsFromFile();

const responseHandler = (res, status, data, error = null) => {
    return res.status(status).json({ data, error });
};

const getItemById = (id) => items.find((item) => item.id === id);

app.post('/items', (req, res) => {
    const newItem = { ...req.body, id: Math.floor(Math.random() * 700).toString() };
    items.push(newItem);
    saveItemsToFile();
    responseHandler(res, 201, items);
});

app.get('/items', (req, res) => {
    responseHandler(res, 200, items);
});

app.get('/items/:id', (req, res) => {
    const id = req.params.id;
    const item = getItemById(id);
    if (!item) {
        responseHandler(res, 404, null, 'Item not found');
    } else {
        responseHandler(res, 200, item);
    }
});

app.patch('/items/:id', (req, res) => {
    const id = req.params.id;
    const itemIndex = items.findIndex((item) => item.id === id);
    if (itemIndex === -1) {
        responseHandler(res, 404, null, 'Item not found');
    } else {
        items[itemIndex] = { ...items[itemIndex], ...req.body };
        saveItemsToFile();
        responseHandler(res, 200, items[itemIndex]);
    }
});

app.delete('/items/:id', (req, res) => {
    const id = req.params.id;
    const itemIndex = items.findIndex((item) => item.id === id);
    if (itemIndex === -1) {
        responseHandler(res, 404, null, 'Item not found');
    } else {
        items.splice(itemIndex, 1);
        saveItemsToFile();
        responseHandler(res, 200, items);
    }
});

app.listen(port, () => {
    console.log(`Server running at port ${port}`);
});
