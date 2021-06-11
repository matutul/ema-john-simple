import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import fakeData from '../../fakeData';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css';

const Shop = () => {

    const [cart, setCart] = useState([]);
    const [products, setProducts] = useState([]);
    useEffect(() => {
        const pd = fakeData.splice(0, 10);
        setProducts(pd);
    }, [])


    useEffect(() => {
        const savedProduct = getDatabaseCart();
        console.log(savedProduct);
        const savedProductKey = Object.keys(savedProduct);
        console.log(savedProductKey);
        const addedToBeCart = savedProductKey.map(key => {
            const product = fakeData.find(pd => key === pd.key);
            product.quantity = savedProduct[key];
            return product;
        });
        setCart(addedToBeCart);
    }, [])


    const addProductHandler = (product) => {
        console.log(product);
        console.log(cart);
        const existingProduct = cart.find(pd => pd.key === product.key);
        if (existingProduct) {
            existingProduct.quantity = existingProduct.quantity + 1;
            let newCart = cart.filter(pd => pd.key !== existingProduct.key);
            newCart = [...newCart, existingProduct];
            setCart(newCart);
            addToDatabaseCart(existingProduct.key, existingProduct.quantity);
        }
        else {
            product.quantity = 1;
            const newCart = [...cart, product];
            setCart(newCart);
            addToDatabaseCart(product.key, product.quantity);
        }
    }

    return (
        <div className='shop-container'>
            <div className="product-container">
                {
                    products.map(pd => <Product
                        showAddtoBtn={true}
                        addProductHandler={addProductHandler}
                        key={pd.key}
                        product={pd}
                    ></Product>)
                }
            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                    <Link to="/review">
                        <button className="order-btn">Review Your Order</button>
                    </Link>
                </Cart>
            </div>
        </div>
    );
};

export default Shop;