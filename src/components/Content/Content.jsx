import React from 'react';
import {Switch, Route} from 'react-router-dom';

import './Content.css';

import DeleteAccount from './subcomponents/DeleteAccount/DeleteAccount';
import PasswordChanger from './subcomponents/PasswordChanger/PasswordChanger';
import Contact from './subcomponents/Contact/Contact';
import AboutUs from './subcomponents/AboutUs/AboutUs';

const Content = () => {
    return (
        <main className="content">
            <Switch>
                <Route path="/myaccount/change-password" component={PasswordChanger} />
                <Route path="/myaccount/delete-account" component={DeleteAccount} />
                <Route path="/contact" component={Contact} />
                <Route path="/about-us" component={AboutUs} />
                <Route>Content</Route>
            </Switch>
        </main>
    )
};

export default Content;
