import React from 'react';
import { Link } from 'react-router-dom';

import './MainPage.css';

import { ABOUT_US_PATH, CONTACT_PATH } from '../../../../common/Paths';

const MainPage = () => {
    return (
        <div className="main-page">
            <div className="left-div">
                <h1>
                Zdrowy tryb życia TO <br/>
                ... dobry tryb życia!
                </h1>
                <div className="justify-container">
                    <p>Przejmij kontrolę nad swoim jedzeniem oraz aktywnościami już dziś.</p>
                    <p>Zarejestruj się i zacznij korzystać z portalu a korzyści zauważysz już następnego dnia.</p>
                    <p>Wśród nich znajdzie się lepsze samopoczucie i podwyższona jakość życia.</p>
                    <p>Będziesz w stanie czerpać z każdego dnia jeszcze więcej pozytywnych emocji.</p>
                </div>
            </div>
            <div className="right-div">
                <h1>Dołącz do nas już dziś</h1>
                <div className="center-div">
                    <Link to={ABOUT_US_PATH} className="link-as-button button info-button">O nas</Link>
                </div>
                <div className="center-div">
                    <Link to={CONTACT_PATH} className="link-as-button button info-button">Kontakt</Link>
                </div>
            </div>
        </div>
    );
};

export default MainPage;