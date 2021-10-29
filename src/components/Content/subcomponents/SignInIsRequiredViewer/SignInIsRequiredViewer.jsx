import React from 'react';

import './SignInIsRequiredViewer.css';

const SignInIsRequiredViewer = () => {

    return (
        <div className="center-div sign-in-viewer">
            <h1>Aby kontynuować wpisz się używając przycisku 'Logowanie'</h1>
            <p>Jeśli jesteś zalogowany, a Twoje uprawnienia pozwalają wyświetlić podaną stronę, 
                skontaktuj się z administratorami w celu naprawy sytuacji</p>
        </div>
    );
};

export default SignInIsRequiredViewer;