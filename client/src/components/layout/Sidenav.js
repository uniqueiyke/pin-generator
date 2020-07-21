import React from 'react'
import BrandLogo from './BrandLogo'
import NavLinks from './NavLinks'
import useInitMatComponent from '../../hooks/useInitMatComponent';
import MinorNav from './MinorNav';

export default function Sidenav() {
    useInitMatComponent('Sidenav', '.sidenav')
    return (
        <ul id="slide-out" className="sidenav">
            <li className="page-header sidenav-close">
                <BrandLogo />
            </li>
            <NavLinks sideNav className="sidenav-close"/>
            <li><div className="divider"></div></li>
            <MinorNav sideNav className="sidenav-close"/>
        </ul>
    )
}
