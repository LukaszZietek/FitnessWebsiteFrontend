import React from 'react';
import {Switch, Route} from 'react-router-dom';

import './Content.css';

import PasswordChanger from './subcomponents/PasswordChanger';

const Content = () => {
    return (
        <main className="content">
            <Switch>
                <Route path="/myaccount/change-password" component={PasswordChanger} />
                <Route>Content</Route>
            </Switch>
        </main>
    )
};

export default Content;
