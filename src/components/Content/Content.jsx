import React from 'react';
import {Switch, Route} from 'react-router-dom';

import './Content.css';

import DeleteAccount from './subcomponents/DeleteAccount/DeleteAccount';
import PasswordChanger from './subcomponents/PasswordChanger/PasswordChanger';
import Contact from './subcomponents/Contact/Contact';
import AboutUs from './subcomponents/AboutUs/AboutUs';
import DailyReports from './subcomponents/DailyReports/DailyReports';
import WeeklyReports from './subcomponents/WeeklyReports/WeeklyReports';
import MonthlyReports from './subcomponents/MonthlyReports/MonthlyReports';
import {CHANGE_PASSWORD_PATH, DELETE_ACCOUNT_PATH, WEEKLY_REPORTS_PATH, MONTHLY_REPORTS_PATH, DAILY_REPORTS_PATH, REPORT_PATH, 
CONTACT_PATH, ABOUT_US_PATH, ADD_ACTIVITIES_PATH, ACTIVITIES_PATH} from '../../common/Paths';
import ActivitiesAdder from './subcomponents/ActivitiesAdder/ActivitiesAdder';
import ActivitiesList from './subcomponents/ActivitiesList/ActivitiesList';

const Content = () => {
    return (
        <main className="content">
            <Switch>
                <Route path={CHANGE_PASSWORD_PATH} component={PasswordChanger} />
                <Route path={DELETE_ACCOUNT_PATH} component={DeleteAccount} />
                <Route path={WEEKLY_REPORTS_PATH} component={WeeklyReports} />
                <Route path={MONTHLY_REPORTS_PATH} component={MonthlyReports} />
                <Route path={[REPORT_PATH, DAILY_REPORTS_PATH]} component={DailyReports} />
                <Route path={CONTACT_PATH} component={Contact} />
                <Route path={ABOUT_US_PATH} component={AboutUs} />
                <Route path={ADD_ACTIVITIES_PATH} component={ActivitiesAdder} />
                <Route path={ACTIVITIES_PATH} component={ActivitiesList} />
                <Route>Content</Route>
            </Switch>
        </main>
    )
};

export default Content;
