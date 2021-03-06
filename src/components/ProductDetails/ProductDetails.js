import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import fakeData from '../../fakeData';
import Product from '../Product/Product';

const ProductDetails = () => {
    const [product, setProduct] = useState([]);
    const { productKey } = useParams();
    useEffect(() => {
        const selectedProduct = fakeData.find(pd => pd.key === productKey);
        console.log(selectedProduct);
        setProduct(selectedProduct);
    }, [productKey])
    return (
        <div>
            <Product showAddtoBtn={false} product={product}></Product>
        </div>
    );
};

export default ProductDetails;