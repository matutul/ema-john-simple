import './ManageInventory.css';
import React from 'react';
import fakeData from '../../fakeData';

const ManageInventory = () => {
    const handleAddProduct = () => {
        fetch('http://localhost:4000/addProduct', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(fakeData)
        }).then((response) =>{
            console.log(response);
        })
    }
    
    return (
        <div>
            <h3>this is inventory page</h3>
            <button onClick={handleAddProduct}>Add</button>
        </div>
    );
};

export default ManageInventory;