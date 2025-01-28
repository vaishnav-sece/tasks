const express = require('express');
const app = express();
const port = 5001;

const items = [
    { id: 1, name: 'Windows' },
    { id: 2, name: 'Mac' }
];

// Middleware to parse JSON body
app.use(express.json());

// GET - Home route
app.get('/', (req, res) => {
    console.log("Server is running...");
    res.send("Welcome to the home page!");
});

// GET - User route
app.get('/user', (req, res) => {
    res.send("This is the user route.");
});

// GET - Product route to fetch all items
app.get('/product', (req, res) => {
    res.json(items);
});

// POST - Add a new product
app.post('/product', (req, res) => {
    const newItem = { id: items.length + 1, name: req.body.name };
    items.push(newItem);
    res.status(201).json(newItem);
});

// PUT - Update an existing product
app.put('/product/:id', (req, res) => {
    const itemId = parseInt(req.params.id);
    const itemIndex = items.findIndex(item => item.id === itemId);

    if (itemIndex !== -1) {
        items[itemIndex].name = req.body.name;
        res.json(items[itemIndex]);
    } else {
        res.status(404).json({ message: "Item not found!" });
    }
});

// DELETE - Delete an existing product
app.delete('/product/:id', (req, res) => {
    const itemId = parseInt(req.params.id);
    const itemIndex = items.findIndex(item => item.id === itemId);

    if (itemIndex !== -1) {
        const deletedItem = items.splice(itemIndex, 1);
        res.json(deletedItem);
    } else {
        res.status(404).json({ message: "Item not found!" });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});