import React from 'react';
import {Switch, Route} from 'react-router-dom';

import './AsideMenu.css';

import MyAccountAside from './subcomponents/MyAccountAside';
import ReportsAside from './subcomponents/ReportsAside';
import {MY_ACCOUNT_PATH, REPORT_PATH} from '../../common/Paths';

const AsideMenu = () => {
    return (
            <section className="aside-menu">
                <Switch>
                        <Route path={MY_ACCOUNT_PATH} component={MyAccountAside} />
                        <Route path={REPORT_PATH} component={ReportsAside} />
                </Switch>
            </section>
    )
};

export default AsideMenu;
