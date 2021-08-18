import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import './App.css';

import NavBar from './components/NavBar/NavBar';
import AsideMenu from './components/AsideMenu/AsideMenu';
import Content from './components/Content/Content';
import Footer from './components/Footer/Footer';

const App = () => {
  return (
    <Router>
        <NavBar/>
        <div className="content-wrapper">
          <AsideMenu />
          <Content />
        </div>
        <Footer/>
    </Router>
  );
}

export default App;
