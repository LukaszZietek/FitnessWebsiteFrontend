import React from 'react';

import { NavLink } from 'react-router-dom';
import { ADD_MEALS_PATH, ADD_NEW_MEAL_TYPE_PATH, DELETE_MEAL_TYPE_PATH, MEALS_PATH } from '../../../common/Paths';

import "../AsideMenu.css";

const MealsAside = () => {
    return (
        <div className="aside-div">
            <NavLink activeClassName="aside-active" exact to={MEALS_PATH} className="aside-link">Lista posiłków</NavLink>
            <NavLink activeClassName="aside-active" to={ADD_MEALS_PATH} className="aside-link">Dodaj posiłek</NavLink>
            <NavLink activeClassName="aside-active" to={ADD_NEW_MEAL_TYPE_PATH} className="aside-link">Dodaj typ posiłku</NavLink>
            <NavLink activeClassName="aside-active" to={DELETE_MEAL_TYPE_PATH} className="aside-link">Usuń typ posiłku</NavLink>
        </div>
    );
};

export default MealsAside;