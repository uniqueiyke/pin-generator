import React from 'react';
import { Link } from 'react-router-dom';

export default function NavLinks({className}) {
    return (
        <>
            <li> <Link to='/' className={className && className}>Home</Link> </li>
            <li><Link to='/contact' className={className && className}>Contact</Link></li>
            <li><Link to='/about' className={className && className}>About</Link></li>
        </>
    )
}
