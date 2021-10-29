import React from 'react';

const RequestErrorViewer = (errorMessage) => {
    console.log(errorMessage);
    return (
        <div className="center-div">
            <h1>Wystąpił błąd: {errorMessage}</h1>
            <p>Jeśli błąd występuje częściej skontaktuj się z administracją serwisu.</p>
        </div>
    );
};

export default RequestErrorViewer;