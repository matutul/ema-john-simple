import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import Product from '../Product/Product';

const ProductDetails = () => {
    const [product, setProduct] = useState({});
    const { productKey } = useParams();
    useEffect(() => {
        fetch('https://ema-john-server0.herokuapp.com/product/'+productKey)
        .then(res => res.json())
        .then(data => setProduct(data[0]));
    }, [productKey])
    return (
        <div>
            <Product showAddtoBtn={false} product={product}></Product>
        </div>
    );
};

export default ProductDetails;