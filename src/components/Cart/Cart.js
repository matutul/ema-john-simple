import React from 'react';
import { Link } from 'react-router-dom';
import './Cart.css';

const Cart = (props) => {
    let total = 0, shippingCharge = 0, beforeTax = 0, tax = 0, orderTotal = 0, itemNumber = 0;
    for (let i = 0; i < props.cart.length; i++) {
        const element = props.cart[i];
        itemNumber = itemNumber + element.quantity;
        total = total + (element.price * element.quantity);
    }
    if (total > 100) {
        shippingCharge = 0;
    }
    else if (total > 50) {
        shippingCharge = 10;
    }
    else if (total > 0) {
        shippingCharge = 20;
    }
    beforeTax = total + shippingCharge;
    tax = total / 10;
    orderTotal = beforeTax + tax;
    // console.log(total);
    return (
        <div className="cart-section">
            <h3>Order Summary</h3>
            <p>Total Items: {itemNumber}</p>
            <p>Items: <span>${total.toFixed(2)}</span></p>
            <p>Shipping and Handling: <span>${shippingCharge.toFixed(2)}</span></p>
            <p>Total before tax: <span>${beforeTax.toFixed(2)}</span></p>
            <p>Estimated Tax: <span>${tax.toFixed(2)}</span></p>
            <p>Order Total: <span>${orderTotal.toFixed(2)}</span></p>
            {
                props.children
            }
        </div>
    );
};

export default Cart;