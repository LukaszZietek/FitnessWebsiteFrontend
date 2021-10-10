import React from 'react';

import './NotFound.css';

const NotFound = () => {
    return (
        <div className="center-div not-found-div">
            <h1>404 - Not Found</h1>
            <p>Podstrona o podanym adresie URL nie istnieje. <br/>
            Udaj się na strone główną i kontynuuj korzystanie z serwisu</p>
        </div>
    );
};

export default NotFound;