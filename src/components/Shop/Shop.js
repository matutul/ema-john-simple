import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css';

const Shop = () => {

    const [cart, setCart] = useState([]);
    const [products, setProducts] = useState([]);
    useEffect(() => {
        fetch('http://localhost:4000/products')
            .then(res => res.json())
            .then(data => setProducts(data))
    }, [])


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
            setCart(product);
        })
    }, [])

    console.log(cart);

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
                    !products.length ? <div class="d-flex justify-content-center">
                        <div class="spinner-border mt-5 text-warning" role="status">
                            <span class="sr-only">Loading...</span>
                        </div>
                    </div> :
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