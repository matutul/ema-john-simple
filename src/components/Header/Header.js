import React from 'react';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';
import logo from '../../images/logo.png';
import './Header.css';
const Header = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    return (
        <div className="header">
            <img src={logo} alt="The brand logo of the ema-john-simple site" />
            <p></p>
            <nav>
                <Link to="/shop">Shop</Link>
                <Link to="/review">Order Riveiw</Link>
                <Link to="/contact">Contact</Link>
                {
                    loggedInUser.displayName && <div className="user-div">
                        <h2 className="user-name">Hello {loggedInUser.displayName}!</h2>
                    </div>
                }

            </nav>
        </div>
    );
};

export default Header;