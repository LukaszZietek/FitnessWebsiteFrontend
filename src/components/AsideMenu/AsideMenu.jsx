import React from 'react';
import {Switch, Route} from 'react-router-dom';

import './AsideMenu.css';

import MyAccountAside from './subcomponents/MyAccountAside';

const AsideMenu = () => {
    return (
            <section className="aside-menu">
                <Switch>
                        <Route path="/myaccount" component={MyAccountAside} />
                </Switch>
            </section>
    )
};

export default AsideMenu;
