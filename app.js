const express = require('express');
const mongoose = require('mongoose'); // Importa o mongoose para interagir com o MongoDB
const cors = require('cors'); // Importa o pacote CORS

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Conectar ao MongoDB
const mongoURI = 'mongodb://mongo:27017/mydatabase'; // URI do MongoDB (conexão com o container Docker)
mongoose
    .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch((error) => console.error('Error connecting to MongoDB:', error));

// Definir modelo de item
const Item = mongoose.model('Item', new mongoose.Schema({
    name: { type: String, required: true }
}));

// Rotas
app.get('/', (req, res) => {
    res.send('Welcome to the Node.js API!');
});

// Obter todos os itens
app.get('/items', async (req, res) => {
    try {
        const items = await Item.find();
        res.json(items);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch items' });
    }
});

// Adicionar um novo item
app.post('/items', async (req, res) => {
    try {
        const newItem = new Item(req.body);
        await newItem.save();
        res.status(201).json({ message: 'Item added successfully!', item: newItem });
    } catch (error) {
        res.status(400).json({ error: 'Failed to add item' });
    }
});

// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = app;