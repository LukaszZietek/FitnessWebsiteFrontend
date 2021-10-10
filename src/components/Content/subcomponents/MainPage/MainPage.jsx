import React from 'react';

import './MainPage.css';

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
                    <button className="button info-button">O nas</button>
                </div>
                <div className="center-div">
                    <button className="button info-button">Kontakt</button>
                </div>
            </div>
        </div>
    );
};

export default MainPage;