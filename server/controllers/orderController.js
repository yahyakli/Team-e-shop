import Order from "../models/Order.js";

export const createOrder = (req, res) => {
    const { user_id, products, total_price } = req.body;

    Order.create({ user_id, products, total_price })
        .then(order => res.status(201).json({ status: 'ok', order }))
        .catch(err => res.status(500).json({ status: 'error', error: 'Failed to create order' }));
};

export const getUserOrders = (req, res) => {
    Order.find({ user_id: req.params.userId })
        .populate('products.product_id')
        .then(orders => res.json({ status: 'ok', orders }))
        .catch(err => res.status(500).json({ status: 'error', error: 'Failed to retrieve orders' }));
};

export const getAllOrders = (req, res) => {
    Order.find().populate('user_id').populate('products.product_id')
        .then(orders => res.json({ status: 'ok', orders }))
        .catch(err => res.status(500).json({ status: 'error', error: 'Failed to retrieve all orders' }));
};
