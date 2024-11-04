import React, { useState } from 'react';
import '../Cart.css';
import images from '../assets/shop.jpg';

const Cart = () => {
    const [nbrProd, setNbrProd] = useState(0);
    const pricePerUnit = 99.99;
    const totalPrice = (nbrProd * pricePerUnit).toFixed(2);

    const increase = () => {
        setNbrProd(nbrProd + 1);
    };

    const decrease = () => {
        setNbrProd(prevNbr => Math.max(0, prevNbr - 1));
    };

    return (
        <div className="product-container text-black">
            <div className='main'>
                <h1 className>Product Details</h1>
            </div>
            <div className='product'>
                <table>
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Quantity</th>
                            <th>Remove</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <div className="product-info">
                                    <img src={images.redux} alt="Product" />
                                    <span>Product Name</span>
                                </div>
                            </td>
                            <td>
                                <div className="quantity-control">
                                    <button onClick={decrease}>-</button>
                                    <span>{nbrProd}</span>
                                    <button onClick={increase}>+</button>
                                </div>
                            </td>
                            <td>
                                <button className="remove-btn">Remove</button>
                            </td>
                            <td>${totalPrice}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="cart-summary">
                <div className="total-section">
                    <span>Total Amount:</span>
                    <span className="total-price">${totalPrice}</span>
                </div>
                <button className="checkout-btn">Proceed to Checkout</button>
            </div>
        </div>
    );
}

export default Cart;