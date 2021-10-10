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
CONTACT_PATH, ABOUT_US_PATH, ADD_ACTIVITIES_PATH, ACTIVITIES_PATH, MEALS_PATH, ADD_MEALS_PATH, MY_ACCOUNT_PATH, ADD_PERSONAL_INFO_PATH,
MESSAGES_FROM_CLIENT, MESSAGE} from '../../common/Paths';
import ActivitiesAdder from './subcomponents/ActivitiesAdder/ActivitiesAdder';
import ActivitiesList from './subcomponents/ActivitiesList/ActivitiesList';
import MealsList from './subcomponents/MealsList/MealsList';
import MealsAdder from './subcomponents/MealsAdder/MealsAdder';
import AccountInformation from './subcomponents/AccountInformation/AccountInformation';
import PersonalInfoAdder from './subcomponents/PersonalInfoAdder/PersonalInfoAdder';
import MessageList from './subcomponents/MessageList/MessageList';
import Message from './subcomponents/Message/Message';
import MainPage from './subcomponents/MainPage/MainPage';

const Content = () => {
    return (
        <main className="content">
            <Switch>
                <Route path={MY_ACCOUNT_PATH} exact component={AccountInformation} />
                <Route path={CHANGE_PASSWORD_PATH} component={PasswordChanger} />
                <Route path={DELETE_ACCOUNT_PATH} component={DeleteAccount} />
                <Route path={ADD_PERSONAL_INFO_PATH} component={PersonalInfoAdder} />
                <Route path={MESSAGES_FROM_CLIENT} exact component={MessageList} />
                <Route path={MESSAGE} component={Message} />
                <Route path={WEEKLY_REPORTS_PATH} component={WeeklyReports} />
                <Route path={MONTHLY_REPORTS_PATH} component={MonthlyReports} />
                <Route path={[REPORT_PATH, DAILY_REPORTS_PATH]} component={DailyReports} />
                <Route path={CONTACT_PATH} component={Contact} />
                <Route path={ABOUT_US_PATH} component={AboutUs} />
                <Route path={ADD_ACTIVITIES_PATH} component={ActivitiesAdder} />
                <Route path={ACTIVITIES_PATH} component={ActivitiesList} />
                <Route path={ADD_MEALS_PATH} component={MealsAdder} />
                <Route path={MEALS_PATH} component={MealsList} />
                <Route path="/" exact component={MainPage} />
            </Switch>
        </main>
    )
};

export default Content;
