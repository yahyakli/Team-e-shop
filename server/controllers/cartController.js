import Cart from "../models/Cart.js";

export const addToCart = async (req, res) => {
    const { user_id, products_ids } = req.body;

    try {
        let cart = await Cart.findOne({ user_id });
        if (cart) {
            cart.products_ids = [...new Set([...cart.products_ids, ...products_ids])];
        } else {
            cart = await Cart.create({ user_id, products_ids });
        }
        await cart.save();
        res.json({ status: 'ok', cart });
    } catch (err) {
        res.status(500).json({ status: 'error', error: 'Failed to add products to cart' });
    }
};

export const getCart = (req, res) => {
    Cart.findOne({ user_id: req.params.userId })
        .populate('user_id')
        .populate('products_ids')
        .then(cart => res.json({ status: 'ok', cart }))
        .catch(err => res.status(500).json({ status: 'error', error: 'Failed to retrieve cart' }));
};

export const removeFromCart = (req, res) => {
    const { user_id, products_ids } = req.body;

    Cart.findOne({ user_id })
        .then(cart => {
            if (!cart) {
                return res.status(404).json({ status: 'error', message: 'Cart not found' });
            }

            cart.products_ids = cart.products_ids.filter(id => !products_ids.includes(id));
            return cart.save();
        })
        .then(cart => res.json({ status: 'ok', cart }))
        .catch(err => res.status(500).json({ status: 'error', error: 'Failed to remove products from cart' }));
};

export const clearCart = (req, res) => {
    Cart.findOne({ user_id: req.params.userId })
        .then(cart => {
            if (!cart) {
                return res.status(404).json({ status: 'error', message: 'Cart not found' });
            }
            cart.products_ids = [];
            return cart.save();
        })
        .then(cart => res.json({ status: 'ok', message: 'Cart cleared', cart }))
        .catch(err => res.status(500).json({ status: 'error', error: 'Failed to clear cart' }));
};
