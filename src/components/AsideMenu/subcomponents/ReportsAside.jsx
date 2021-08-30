import React from 'react';

import {Link} from 'react-router-dom';

import '../AsideMenu.css';

import {DAILY_REPORTS_PATH, WEEKLY_REPORTS_PATH, MONTHLY_REPORTS_PATH} from '../../../common/Paths';

const ReportsAside = () => {
    return (
        <div className="aside-div">
            <Link to={DAILY_REPORTS_PATH} className="aside-link">Raport dzienny</Link>
            <Link to={WEEKLY_REPORTS_PATH} className="aside-link">Raport tygodniowy</Link>
            <Link to={MONTHLY_REPORTS_PATH} className="aside-link">Raport miesięczny</Link>
        </div>
    );
}

export default ReportsAside;