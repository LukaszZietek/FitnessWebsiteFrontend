import React from 'react';

import { Link } from 'react-router-dom';
import { ADD_MEALS_PATH, MEALS_PATH } from '../../../common/Paths';

import "../AsideMenu.css";

const MealsAside = () => {
    return (
        <div className="aside-div">
            <Link to={MEALS_PATH} className="aside-link">Lista posiłków</Link>
            <Link to={ADD_MEALS_PATH} className="aside-link">Dodaj posiłek</Link>
        </div>
    );
};

export default MealsAside;