import React from 'react';
import Sidenav from './Sidenav';
import NavLinks from './NavLinks';
import MinorNav from './MinorNav';

export default function Navbar() {
  return (
    <div>
      <div className='main-nav'>
        <nav className="transparent z-depth-0">
          <a href="#!" data-target="slide-out" className="sidenav-trigger show-on-small a"><i className="material-icons">menu</i></a>
          <div className="nav-wrapper">
            <ul id="nav-mobile" className="hide-on-small-only">
              <NavLinks />
            </ul>
          </div>
        </nav>
        <MinorNav />
      </div>
      <Sidenav />
    </div>
  )
}
