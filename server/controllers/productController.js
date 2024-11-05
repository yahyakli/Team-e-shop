import Product from "../models/Product.js";
import multer from "multer";

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

export const createProduct = (req, res) => {
    const { name, description, price } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

    Product.create({ name, description, image_url: imageUrl, price })
        .then(product => res.json({ status: 'ok', product }))
        .catch(err => res.status(500).json({ status: 'error', error: 'Failed to create product' }));
};

export const getAllProducts = (req, res) => {
    Product.find()
        .then(products => res.json(products))
        .catch(err => res.status(500).json({ status: 'error', error: 'Failed to retrieve products' }));
};

export const getProductById = (req, res) => {
    Product.findById(req.params.id)
        .then(product => {
            if (!product) {
                return res.status(404).json({ status: 'error', message: 'Product not found' });
            }
            res.json(product);
        })
        .catch(err => res.status(500).json({ status: 'error', error: 'Failed to retrieve product' }));
};

export const updateProduct = (req, res) => {
    const { name, description, price } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

    Product.findById(req.params.id)
        .then(product => {
            if (!product) {
                return res.status(404).json({ status: 'error', message: 'Product not found' });
            }

            product.name = name || product.name;
            product.description = description || product.description;
            product.price = price || product.price;
            product.image_url = imageUrl || product.image_url;

            product.save()
                .then(updatedProduct => res.json({ status: 'ok', product: updatedProduct }))
                .catch(err => res.status(500).json({ status: 'error', error: 'Failed to update product' }));
        });
};

export const deleteProduct = (req, res) => {
    Product.findByIdAndDelete(req.params.id)
        .then(product => {
            if (!product) {
                return res.status(404).json({ status: 'error', message: 'Product not found' });
            }
            res.json({ status: 'ok', message: 'Product deleted' });
        })
        .catch(err => res.status(500).json({ status: 'error', error: 'Failed to delete product' }));
};

export { upload };
