import React from 'react';
import { Link } from 'react-router-dom';
import { CONTACT_PATH } from '../../../../common/Paths';

import './AboutUs.css';

const AboutUs = () => {
    return (
        <div className="about-us-container center-div">
            <h1>INFORMACJE O NAS</h1>
            <h3>Fitness website powstało w 2021 roku. Naszym celem jest zachęcenie obywateli Polski do prowadzenia zdrowego trybu życia</h3>
            <p>
                Podstawowym założeniem, które doprowadziło do powstania strony była chęć umożliwienia użytkownikom śledzenia
                swojej codziennej aktywności  oraz monitorowania spożywanych posilków. Witryna pozwala na generowanie
                raportów z różnych przedziałów czasu, dzięki czemu możliwe jest
                jednoznacze stwierdzenie czy nasze nawyki żywieniowe i ruchowe poprawiły się.
                Głównym celem, który sobie postawiliśmy jest pomoc Polakom w polepszeniu jakości ich życia i to dzięki niemu udało nam się stworzyć
                aplikację internetową z intuicyjnym interfejsem, która jest dla ciebie dostępna z każdego miejsca na świecie, w którym będziesz posiadać
                dostęp do internetu.
            </p>
            <h3>Nie czekaj, dołącz już dziś i zadbaj o lepsze jutro !</h3>

            <div>
                <Link to="" className="link-as-button button about-us-button">Strona główna</Link>
            </div>
            <div>
                <Link to={CONTACT_PATH} className="link-as-button button about-us-button">Kontakt</Link>
            </div>
        </div>
    );
};

export default AboutUs;
