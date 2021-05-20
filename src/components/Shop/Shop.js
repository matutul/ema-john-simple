import React, { useState } from 'react';
import fakeData from '../../fakeData';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css';

const Shop = () => {
    const pd = fakeData.splice(0, 10);
    const [products, setProducts] = useState(pd);
    const [cart, setCart] = useState([]);
    // console.log(products);
    const addProductHandler = (product) => {
        const newCart = [...cart, product];
        setCart(newCart);
    }
    return (
        <div className='shop-container'>
            <div className="product-container">
                {
                    products.map(pd => <Product
                        addProductHandler = {addProductHandler}
                        key = {pd.key}
                        product={pd}
                        ></Product>)
                }
            </div>
            <div className="cart-container">
                <Cart cart={cart}></Cart>
            </div>
        </div>
    );
};

export default Shop;