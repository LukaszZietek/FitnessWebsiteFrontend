import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './App.css';

import NavBar from './components/NavBar/NavBar';
import AsideMenu from './components/AsideMenu/AsideMenu';
import Content from './components/Content/Content';
import Footer from './components/Footer/Footer';
import ApplicationProvider from './ApplicationContext/ApplicationProvider';
import { MY_ACCOUNT_PATH, REPORT_PATH, ACTIVITIES_PATH, MEALS_PATH } from './common/Paths';
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ApplicationProvider>
          <Router>
              <NavBar/>
              <div className="content-wrapper">
                <Switch>
                  <Route path={[MY_ACCOUNT_PATH, REPORT_PATH, ACTIVITIES_PATH, MEALS_PATH]} component={AsideMenu} />
                </Switch>
                <Content />
              </div>
              <Footer/>
          </Router>
      </ApplicationProvider>
    </QueryClientProvider>
  );
}

export default App;
