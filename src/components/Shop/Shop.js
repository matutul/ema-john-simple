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

    // const [savedProduct, setSavedProduct] = useState(getDatabaseCart());
    useEffect(() => {
        const savedProduct = getDatabaseCart();
        const savedProductKey = Object.keys(savedProduct);
        const addedToBeCart = savedProductKey.map(key => {
            const product = fakeData.find(pd => pd.key === key) || {};
            product.quantity = savedProduct[key];
            return product;
        });
        setCart(addedToBeCart);
    }, [])
    console.log(cart);
    // console.log(products);
    const addProductHandler = (product) => {
        const existingProduct = cart.find(pd => pd.key === product.key);
        // console.log(existingProduct);
        if (existingProduct) {
            existingProduct.quantity = existingProduct.quantity + 1;
            const newCart = cart.filter(pd => pd.key !== existingProduct.key);
            setCart(newCart);
            addToDatabaseCart(existingProduct.key, existingProduct.quantity);
        }
        else {
            product.quantity = 1;
            const newCart = [...cart, product];
            setCart(newCart);
            addToDatabaseCart(product.key, product.quantity);
        }
        // const newCart = [...cart, product];
        // setCart(newCart);
        // const sameProduct = newCart.filter(pd => pd.key === product.key);
        // const count = sameProduct.length;
        // addToDatabaseCart(product.key);
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