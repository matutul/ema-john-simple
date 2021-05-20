import React from 'react';
import { useParams } from 'react-router';
import fakeData from '../../fakeData';

const ProductDetails = () => {
    const { productKey } = useParams();
    console.log(productKey);
    const product = fakeData.find(pd => pd.key === productKey);
    console.log(fakeData);
    console.log(product);
    return (
        <div>
            <h2>{productKey} comming soon</h2>
        </div>
    );
};

export default ProductDetails;