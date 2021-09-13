import React from 'react';
import {Switch, Route} from 'react-router-dom';

import './AsideMenu.css';

import {ACTIVITIES_PATH, MEALS_PATH, MY_ACCOUNT_PATH, REPORT_PATH} from '../../common/Paths';

import MyAccountAside from './subcomponents/MyAccountAside';
import ReportsAside from './subcomponents/ReportsAside';
import ActivitiesAside from './subcomponents/ActivitiesAside';
import MealsAside from './subcomponents/MealsAside';

const AsideMenu = () => {
    return (
            <section className="aside-menu">
                <Switch>
                        <Route path={MY_ACCOUNT_PATH} component={MyAccountAside} />
                        <Route path={REPORT_PATH} component={ReportsAside} />
                        <Route path={ACTIVITIES_PATH} component={ActivitiesAside} />
                        <Route path={MEALS_PATH} component={MealsAside} />
                </Switch>
            </section>
    )
};

export default AsideMenu;
