import React from 'react';

const RequestErrorViewer = (errorMessage) => {
    return (
        <div>
            Wystąpił błąd: {errorMessage.message}
        </div>
    );
};

export default RequestErrorViewer;