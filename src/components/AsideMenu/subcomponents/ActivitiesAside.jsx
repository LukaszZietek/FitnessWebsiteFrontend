import React from 'react';
import { Link } from 'react-router-dom';

import '../AsideMenu.css';

import {ACTIVITIES_PATH, ADD_ACTIVITIES_PATH} from '../../../common/Paths';

const ActivitiesAside = () => {
    
    return (
        <div className="aside-div">
            <Link to={ACTIVITIES_PATH} className="aside-link">Lista aktywności</Link>
            <Link to={ADD_ACTIVITIES_PATH} className="aside-link">Dodaj aktywność</Link>
        </div>
    );
};

export default ActivitiesAside;