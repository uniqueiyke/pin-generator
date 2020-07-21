import React from 'react';
import { Link } from 'react-router-dom';

export default function NavLinks({className, sideNav}) {
    return (
        <>
            <li> <Link to='/' className={className && className}>{sideNav && <i className="material-icons green-text text-darken-4">home</i>}Home</Link> </li>
            <li><Link to='/contact' className={className && className}>{sideNav && <i className="material-icons green-text text-darken-4">contacts</i>}Contact</Link></li>
            <li><Link to='/about' className={className && className}>{sideNav && <i className="material-icons green-text text-darken-4">description</i>}About</Link></li>
        </>
    )
}
