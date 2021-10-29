import React from 'react';
import { NavLink } from 'react-router-dom';

import '../AsideMenu.css';

import {ACTIVITIES_PATH, ADD_ACTIVITIES_PATH} from '../../../common/Paths';

const ActivitiesAside = () => {
    
    return (
        <div className="aside-div">
            <NavLink activeClassName="aside-active" exact to={ACTIVITIES_PATH} className="aside-link">Lista aktywności</NavLink>
            <NavLink activeClassName="aside-active" exact to={ADD_ACTIVITIES_PATH} className="aside-link">Dodaj aktywność</NavLink>
        </div>
    );
};

export default ActivitiesAside;