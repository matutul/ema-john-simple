import React from 'react';
import logo from '../../images/logo.png';
import './Header.css';
const Header = () => {
    return (
        <div className="header">
            <img src={logo} alt="The brand logo of the ema-john-simple site" />
            <nav>
                <a href="/shop">Shop</a>
                <a href="/review">Order Riveiw</a>
                <a href="/contact">Contact</a>
            </nav>
        </div>
    );
};

export default Header;