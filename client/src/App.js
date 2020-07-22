import React from 'react';

import './App.css';
import Header from './components/layout/Header';
import Navbar from './components/layout/Navbar';
import BrandLogo from './components/layout/BrandLogo';
import Footer from './components/layout/Footer';
import Router from './components/Router';


function App() {
  return (
    <div>
      <Header>
        <BrandLogo />
        <Navbar />
      </Header>
      <Router />
      <Footer>&copy;2020</Footer>
      </div>
  );
}

export default App;
