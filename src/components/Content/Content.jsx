import React from 'react';
import {Switch, Route} from 'react-router-dom';

import './Content.css';

import DeleteAccount from './subcomponents/DeleteAccount';
import PasswordChanger from './subcomponents/PasswordChanger';

const Content = () => {
    return (
        <main className="content">
            <Switch>
                <Route path="/myaccount/change-password" component={PasswordChanger} />
                <Route path="/myaccount/delete-account" component={DeleteAccount} />
                <Route>Content</Route>
            </Switch>
        </main>
    )
};

export default Content;
