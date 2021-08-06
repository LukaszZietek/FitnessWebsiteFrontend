import './App.css';

import NavBar from './components/NavBar/NavBar';
import AsideMenu from './components/AsideMenu/AsideMenu';
import Content from './components/Content/Content';
import Footer from './components/Footer/Footer';

function App() {
  return (
    <>
      <div className="App">
        <NavBar/>
        <div className="content-wrapper">
          <AsideMenu />
          <Content />
        </div>
        <Footer/>
      </div>
    </>
  );
}

export default App;
