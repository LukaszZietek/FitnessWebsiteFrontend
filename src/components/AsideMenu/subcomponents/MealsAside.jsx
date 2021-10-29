import React from 'react';

import { NavLink } from 'react-router-dom';
import { ADD_MEALS_PATH, MEALS_PATH } from '../../../common/Paths';

import "../AsideMenu.css";

const MealsAside = () => {
    return (
        <div className="aside-div">
            <NavLink activeClassName="aside-active" exact to={MEALS_PATH} className="aside-link">Lista posiłków</NavLink>
            <NavLink activeClassName="aside-active" to={ADD_MEALS_PATH} className="aside-link">Dodaj posiłek</NavLink>
        </div>
    );
};

export default MealsAside;