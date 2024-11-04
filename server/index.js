import express from "express"
import  mongoose from "mongoose";
const app = express();
import cors from "cors";
import User from "./model/User.js";
import multer from 'multer';
import Product from "./model/Product.js";
import checkToken from './middleware/checkToken.js'
import Cart from "./model/Cart.js";
import Order from "./model/Order.js";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';


app.use(cors());
app.use(express.json());


// Set up storage for Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Folder where images will be stored
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname); // Unique file name
    }
});

const upload = multer({ storage });

// 1. Create a new product
app.post('/products', checkToken, upload.single('image'), async (req, res) => {
    const { name, description, price } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

    try {
        const product = await Product.create({
            name,
            description,
            image_url: imageUrl,
            price
        });
        res.json({ status: 'ok', product });
    } catch (err) {
        res.status(500).json({ status: 'error', error: 'Failed to create product' });
    }
});

// 2. Get all products
app.get('/products', checkToken, async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        res.status(500).json({ status: 'error', error: 'Failed to retrieve products' });
    }
});

// 3. Get a single product by ID
app.get('/products/:id', checkToken, async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ status: 'error', message: 'Product not found' });
        }
        res.json(product);
    } catch (err) {
        res.status(500).json({ status: 'error', error: 'Failed to retrieve product' });
    }
});

// 4. Update a product by ID
app.put('/products/:id', checkToken, upload.single('image'), async (req, res) => {
    const { name, description, price } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ status: 'error', message: 'Product not found' });
        }

        product.name = name || product.name;
        product.description = description || product.description;
        product.price = price || product.price;
        product.image_url = imageUrl || product.image_url;

        await product.save();
        res.json({ status: 'ok', product });
    } catch (err) {
        res.status(500).json({ status: 'error', error: 'Failed to update product' });
    }
});

// 5. Delete a product by ID
app.delete('/products/:id', checkToken, async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) {
            return res.status(404).json({ status: 'error', message: 'Product not found' });
        }
        res.json({ status: 'ok', message: 'Product deleted' });
    } catch (err) {
        res.status(500).json({ status: 'error', error: 'Failed to delete product' });
    }
});

app.post("/signup", async (req, res) => {
    const {name, email, password} = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    try{
        const user = await User.create({
            name:name,
            email:email,
            password:hashedPassword
        })
        res.json({ status: 'ok', user: user});
    }catch(err){
        res.json({ status: 'errror', error: 'Duplicated email'});
    }
})
app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email });
    if (!user) {
        return res.json({ status: 'error', user: false });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.json({ status: 'error', user: false });
    }

    const token = jwt.sign({
        name: user.name,
        email: user.email
    }, 'secret123');

    res.json({
        status: 'ok',
        user: token,
    });
});




// 1. Add products to cart (Create or Update cart)
app.post('/cart', checkToken, async (req, res) => {
    const { user_id, products_ids } = req.body;

    try {
        // Check if the user already has a cart
        let cart = await Cart.findOne({ user_id });

        if (cart) {
            // If the cart exists, add new product IDs to the existing array
            cart.products_ids = [...new Set([...cart.products_ids, ...products_ids])];
        } else {
            // If no cart exists for the user, create a new one
            cart = await Cart.create({ user_id, products_ids });
        }

        await cart.save();
        res.json({ status: 'ok', cart });
    } catch (err) {
        res.status(500).json({ status: 'error', error: 'Failed to add products to cart' });
    }
});

// 2. Get the user's cart
app.get('/cart/:userId', checkToken, async (req, res) => {
    const { userId } = req.params;

    try {
        const cart = await Cart.findOne({ user_id: userId }).populate('user_id').populate('products_ids');

        if (!cart) {
            return res.status(404).json({ status: 'error', message: 'Cart not found' });
        }

        res.json({ status: 'ok', cart });
    } catch (err) {
        res.status(500).json({ status: 'error', error: 'Failed to retrieve cart' });
    }
});

// 3. Remove products from cart
app.put('/cart/remove', checkToken, async (req, res) => {
    const { user_id, products_ids } = req.body;

    try {
        const cart = await Cart.findOne({ user_id });

        if (!cart) {
            return res.status(404).json({ status: 'error', message: 'Cart not found' });
        }

        // Remove specified product IDs from the cart
        cart.products_ids = cart.products_ids.filter(id => !products_ids.includes(id));
        await cart.save();

        res.json({ status: 'ok', cart });
    } catch (err) {
        res.status(500).json({ status: 'error', error: 'Failed to remove products from cart' });
    }
});

// 4. Clear all products in the cart
app.delete('/cart/:userId', checkToken, async (req, res) => {
    const { userId } = req.params;

    try {
        const cart = await Cart.findOne({ user_id: userId });

        if (!cart) {
            return res.status(404).json({ status: 'error', message: 'Cart not found' });
        }

        cart.products_ids = []; // Clear the cart
        await cart.save();

        res.json({ status: 'ok', message: 'Cart cleared', cart });
    } catch (err) {
        res.status(500).json({ status: 'error', error: 'Failed to clear cart' });
    }
});





// 1. Create a new order
app.post('/orders', checkToken, async (req, res) => {
    
    const { user_id, products, total_price } = req.body;
    try {
        const order = await Order.create({
            user_id,
            products,
            total_price,
        });
        res.status(201).json({ status: 'ok', order });
    } catch (err) {
        res.status(500).json({ status: 'error', error: 'Failed to create order' });
    }
});

// 2. Get user's order history
app.get('/orders/:userId', checkToken, async (req, res) => {
    const { userId } = req.params;

    try {
        const orders = await Order.find({ user_id: userId }).populate('products.product_id');
        
        if (!orders.length) {
            return res.status(404).json({ status: 'error', message: 'No orders found for this user' });
        }
        
        res.json({ status: 'ok', orders });
    } catch (err) {
        res.status(500).json({ status: 'error', error: 'Failed to retrieve orders' });
    }
});

// 3. Get all orders (Admin only)
app.get('/orders', checkToken, async (req, res) => {
    try {
        const orders = await Order.find().populate('user_id').populate('products.product_id');
        res.json({ status: 'ok', orders });
    } catch (err) {
        res.status(500).json({ status: 'error', error: 'Failed to retrieve all orders' });
    }
});





const startServer = () => {
    try{
        mongoose.connect("mongodb://localhost:27017/agile")
            .then(() => {
                console.log('mongo db connected')
            })
            .catch((err) => console.log(err))
            app.listen(3000, () => console.log('server started on port 3000'))
    }catch(err){
        console.log(err)
    }
}

startServer();