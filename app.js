const express = require('express');
const app = express();
const PORT = 3000;

// Middleware to parse JSON requests
app.use(express.json());

// Routes
app.get('/', (req, res) => {
    res.send('Welcome to the Node.js API!');
});

// Example route to get a list of items
app.get('/items', (req, res) => {
    const items = [
        { id: 1, name: 'Item 1' },
        { id: 2, name: 'Item 2' },
    ];
    res.json(items);
});

// Example route to add an item
app.post('/items', (req, res) => {
    const newItem = req.body;
    res.status(201).json({ message: 'Item added successfully!', item: newItem });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
