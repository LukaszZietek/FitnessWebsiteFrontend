import React, { useContext } from 'react';
import {Switch, Route} from 'react-router-dom';

import './Content.css';

import DeleteAccount from './subcomponents/DeleteAccount/DeleteAccount';
import PasswordChanger from './subcomponents/PasswordChanger/PasswordChanger';
import Contact from './subcomponents/Contact/Contact';
import AboutUs from './subcomponents/AboutUs/AboutUs';
import DailyReports from './subcomponents/DailyReports/DailyReports';
import WeeklyReports from './subcomponents/WeeklyReports/WeeklyReports';
import MonthlyReports from './subcomponents/MonthlyReports/MonthlyReports';
import {CHANGE_PASSWORD_PATH, DELETE_ACCOUNT_PATH, WEEKLY_REPORTS_PATH, MONTHLY_REPORTS_PATH, REPORT_PATH, 
CONTACT_PATH, ABOUT_US_PATH, ADD_ACTIVITIES_PATH, ACTIVITIES_PATH, MEALS_PATH, ADD_MEALS_PATH, MY_ACCOUNT_PATH, ADD_PERSONAL_INFO_PATH,
MESSAGES_FROM_CLIENT, MESSAGE, ADD_NEW_ACTIVITY_TYPE_PATH, DELETE_ACTIVITY_TYPE_PATH} from '../../common/Paths';
import ActivitiesAdder from './subcomponents/ActivitiesAdder/ActivitiesAdder';
import ActivitiesList from './subcomponents/ActivitiesList/ActivitiesList';
import MealsList from './subcomponents/MealsList/MealsList';
import MealsAdder from './subcomponents/MealsAdder/MealsAdder';
import AccountInformation from './subcomponents/AccountInformation/AccountInformation';
import PersonalInfoAdder from './subcomponents/PersonalInfoAdder/PersonalInfoAdder';
import MessageList from './subcomponents/MessageList/MessageList';
import Message from './subcomponents/Message/Message';
import MainPage from './subcomponents/MainPage/MainPage';
import NotFound from './subcomponents/NotFound/NotFound';
import ActivityTypeAdder from './subcomponents/ActivityTypeAdder/ActivityTypeAdder';
import ActivityTypeDeleter from './subcomponents/ActivityTypeDeleter/ActivityTypeDeleter';
import { ApplicationContext } from '../../ApplicationContext/ApplicationProvider';
import SignInIsRequiredViewer from './subcomponents/SignInIsRequiredViewer/SignInIsRequiredViewer';

const Content = () => {
    const {userId} = useContext(ApplicationContext);
    if (userId) {
        return (
            <main className="content">
                <Switch>
                    <Route path={MY_ACCOUNT_PATH} exact component={AccountInformation} />
                    <Route path={CHANGE_PASSWORD_PATH} component={PasswordChanger} />
                    <Route path={DELETE_ACCOUNT_PATH} component={DeleteAccount} />
                    <Route path={ADD_PERSONAL_INFO_PATH} component={PersonalInfoAdder} />
                    <Route path={MESSAGES_FROM_CLIENT} exact component={MessageList} />
                    <Route path={MESSAGE} component={Message} />
                    <Route path={ADD_NEW_ACTIVITY_TYPE_PATH} component={ActivityTypeAdder} />
                    <Route path={DELETE_ACTIVITY_TYPE_PATH} component={ActivityTypeDeleter} />
                    <Route path={WEEKLY_REPORTS_PATH} component={WeeklyReports} />
                    <Route path={MONTHLY_REPORTS_PATH} component={MonthlyReports} />
                    <Route path={REPORT_PATH} component={DailyReports} />
                    <Route path={CONTACT_PATH} component={Contact} />
                    <Route path={ABOUT_US_PATH} component={AboutUs} />
                    <Route path={ADD_ACTIVITIES_PATH} component={ActivitiesAdder} />
                    <Route path={ACTIVITIES_PATH} component={ActivitiesList} />
                    <Route path={ADD_MEALS_PATH} component={MealsAdder} />
                    <Route path={MEALS_PATH} component={MealsList} />
                    <Route path="/" exact component={MainPage} />
                    <Route>{NotFound}</Route>
                </Switch>
            </main>
        )
    } else {
        return (
            <main className="content">
                <Switch>
                    <Route path={MY_ACCOUNT_PATH} exact component={SignInIsRequiredViewer} />
                    <Route path={CHANGE_PASSWORD_PATH} component={SignInIsRequiredViewer} />
                    <Route path={DELETE_ACCOUNT_PATH} component={SignInIsRequiredViewer} />
                    <Route path={ADD_PERSONAL_INFO_PATH} component={SignInIsRequiredViewer} />
                    <Route path={MESSAGES_FROM_CLIENT} exact component={SignInIsRequiredViewer} />
                    <Route path={MESSAGE} component={SignInIsRequiredViewer} />
                    <Route path={ADD_NEW_ACTIVITY_TYPE_PATH} component={SignInIsRequiredViewer} />
                    <Route path={DELETE_ACTIVITY_TYPE_PATH} component={SignInIsRequiredViewer} />
                    <Route path={WEEKLY_REPORTS_PATH} component={SignInIsRequiredViewer} />
                    <Route path={MONTHLY_REPORTS_PATH} component={SignInIsRequiredViewer} />
                    <Route path={REPORT_PATH} component={SignInIsRequiredViewer} />
                    <Route path={CONTACT_PATH} component={Contact} />
                    <Route path={ABOUT_US_PATH} component={AboutUs} />
                    <Route path={ADD_ACTIVITIES_PATH} component={SignInIsRequiredViewer} />
                    <Route path={ACTIVITIES_PATH} component={SignInIsRequiredViewer} />
                    <Route path={ADD_MEALS_PATH} component={SignInIsRequiredViewer} />
                    <Route path={MEALS_PATH} component={SignInIsRequiredViewer} />
                    <Route path="/" exact component={MainPage} />
                    <Route>{NotFound}</Route>
                </Switch>
            </main>
        )
    }
};

export default Content;
