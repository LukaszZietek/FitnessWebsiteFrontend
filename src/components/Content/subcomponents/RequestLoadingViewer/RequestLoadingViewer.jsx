import React from 'react';

import './RequestLoadingViewer.css';

const RequestLoadingViewer = () => {

    return (
        <div className="center-div request-loading-div">
            <h1>Trwa ładowanie ...</h1>
            <p>Proszę czekać </p>
        </div>
    );
};

export default RequestLoadingViewer;