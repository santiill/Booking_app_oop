import React from 'react'
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header className="header">
            <Link className='link'  to="/">
                Home
            </Link>
            <a href="#" className="link">
                About Us
            </a>
            <Link className='link' to="/reserves">
                Reserves
            </Link>
        </header>
    )
}

export default Header

