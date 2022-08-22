import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { getDatabaseCart, removeFromDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import ReviewItem from '../ReviewItem/ReviewItem';

const Review = () => {
    const [savedCart, setSavedCart] = useState([]);
    useEffect(() => {
        const savedProduct = getDatabaseCart();
        const savedProductKey = Object.keys(savedProduct);
        fetch('http://localhost:4000/productsByKeys', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(savedProductKey)
        })
            .then(res => res.json())
            .then(data => {
                const product = savedProductKey.map(key => {
                    const cartProduct = data.find(pd => pd.key === key);
                    cartProduct.quantity = savedProduct[key];
                    return cartProduct;
                })
                setSavedCart(product);
            })

    }, []);


    const handleRemoveItem = (productKey) => {
        const newCart = savedCart.filter(pd => pd.key !== productKey);
        setSavedCart(newCart);
        removeFromDatabaseCart(productKey);
    }

    const history = useHistory();
    const handleProceedCheckout = () => {
        history.push("/shipment");
    }

    return (
        <div className='shop-container'>
            <div className="product-container">
                {
                    savedCart.map(pd => <ReviewItem key={pd.key} handleRemoveItem={handleRemoveItem} product={pd}></ReviewItem>)
                }
            </div>
            <div className="cart-container">
                <Cart cart={savedCart}>
                    <button onClick={handleProceedCheckout} className="order-btn">Proceed Checkout</button>
                </Cart>
            </div>
        </div>
    );
};

export default Review;