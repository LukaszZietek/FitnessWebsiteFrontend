import React from 'react';

import {NavLink} from 'react-router-dom';

import '../AsideMenu.css';

import {REPORT_PATH, WEEKLY_REPORTS_PATH, MONTHLY_REPORTS_PATH} from '../../../common/Paths';

const ReportsAside = () => {
    return (
        <div className="aside-div">
            <NavLink activeClassName="aside-active" to={REPORT_PATH} exact className="aside-link">Raport dzienny</NavLink>
            <NavLink activeClassName="aside-active" to={WEEKLY_REPORTS_PATH} className="aside-link">Raport tygodniowy</NavLink>
            <NavLink activeClassName="aside-active" to={MONTHLY_REPORTS_PATH} className="aside-link">Raport miesięczny</NavLink>
        </div>
    );
}

export default ReportsAside;