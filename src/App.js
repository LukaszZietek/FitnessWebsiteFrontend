import React from 'react';

import './App.css';

import NavBar from './components/NavBar/NavBar';
import AsideMenu from './components/AsideMenu/AsideMenu';
import Content from './components/Content/Content';
import Footer from './components/Footer/Footer';

const App = () => {
  return (
    <>
        <NavBar/>
        <div className="content-wrapper">
          <AsideMenu />
          <Content />
        </div>
        <Footer/>
    </>
  );
}

export default App;
