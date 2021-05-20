import React from 'react';
import './Product.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';


const Product = (props) => {
    const { key, name, img, seller, price } = props.product;
    return (
        <div className="product">
            <div className="product-image">
                <img src={img} alt="" />
            </div>
            <div className="product-details">
                <h3 className="product-name"><Link className="product-name" to={"/product/"+key}>{name}</Link></h3>
                <div className="sub-details">
                    <div className="left">
                        <p><small>By {seller}</small></p>
                        <p>Price: ${price}</p>
                    </div>
                    <div className="right">
                        <h4>Features:</h4>
                        <ul>

                        </ul>
                    </div>
                </div>
                <button
                    className="order-btn"
                    onClick={() => props.addProductHandler(props.product)}
                >
                    <FontAwesomeIcon icon={faShoppingCart} /> Add to cart
                </button>
            </div>
        </div>
    );
};

export default Product;