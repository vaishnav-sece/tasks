const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log('Connected to MongoDB');
        initializeProducts(); 
    })
    .catch(err => console.error('Failed to connect to MongoDB:', err));

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
});

const Product = mongoose.model('Product', productSchema);

async function initializeProducts() {
    try {
        const existingProducts = await Product.find();
        if (existingProducts.length === 0) {
            const initialProducts = [
                { name: 'Windows' },
                { name: 'Mac' },
            ];
            await Product.insertMany(initialProducts);
            console.log('Initial products added to the database');
        } else {
            console.log('Products already exist in the database');
        }
    } catch (err) {
        console.error('Error initializing products:', err);
    }
}


app.get('/', (req, res) => {
    console.log("Server is running...");
    res.send("Welcome to the home page!");
});

app.get('/user', (req, res) => {
    res.send("This is the user route.");
});

app.get('/product', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.post('/product', async (req, res) => {
    const product = new Product({
        name: req.body.name,
    });

    try {
        const newProduct = await product.save();
        res.status(201).json(newProduct);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

app.put('/product/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ message: "Product not found!" });
        }

        product.name = req.body.name || product.name;
        const updatedProduct = await product.save();
        res.json(updatedProduct);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.delete('/product/:id', async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);

        if (!product) {
            return res.status(404).json({ message: "Product not found!" });
        }

        res.json({ message: "Product deleted successfully!" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});





