import React from 'react';
import { Link } from 'react-router-dom';

const ReviewItem = (props) => {
    const { name, img, seller, price, key, quantity } = props.product;
    const handleRemoveItem = props.handleRemoveItem;

    return (
        <div className="product">
            <div className="product-image">
                <img src={img} alt="" />
            </div>
            <div className="product-details">
                <h3 className="product-name"><Link className="product-name" to={"/product/" + key}>{name}</Link></h3>
                <div className="sub-details">
                    <div className="left">
                        <p><small>By {seller}</small></p>
                        <p>Price: ${price}</p>
                        <p>Quantity: {quantity}</p>
                    </div>
                    <div className="right">
                        <h4>Features:</h4>
                        <ul>

                        </ul>
                    </div>
                </div>
                <button onClick={() => handleRemoveItem(key)} className="order-btn">
                    Remove Item
                </button>
            </div>
        </div>
    );
};

export default ReviewItem;