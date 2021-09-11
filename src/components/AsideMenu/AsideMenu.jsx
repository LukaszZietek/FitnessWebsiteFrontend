import React from 'react';
import {Switch, Route} from 'react-router-dom';

import './AsideMenu.css';

import MyAccountAside from './subcomponents/MyAccountAside';
import ReportsAside from './subcomponents/ReportsAside';
import {ACTIVITIES_PATH, MY_ACCOUNT_PATH, REPORT_PATH} from '../../common/Paths';
import ActivitiesAside from './subcomponents/ActivitiesAside';

const AsideMenu = () => {
    return (
            <section className="aside-menu">
                <Switch>
                        <Route path={MY_ACCOUNT_PATH} component={MyAccountAside} />
                        <Route path={REPORT_PATH} component={ReportsAside} />
                        <Route path={ACTIVITIES_PATH} component={ActivitiesAside} />
                </Switch>
            </section>
    )
};

export default AsideMenu;
