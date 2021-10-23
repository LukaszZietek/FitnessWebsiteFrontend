import React, {createContext, useState} from 'react';

export const ApplicationContext = createContext(null);

const ApplicationProvider = ({children}) => {
    const [token, setToken] = useState('');
    const [role, setRole] = useState('');
    const [username, setUsername] = useState('');

    return (
        <ApplicationContext.Provider value={{token, setToken, role, setRole, username, setUsername}}>
            {children}
        </ApplicationContext.Provider>
    );
};

export default ApplicationProvider;