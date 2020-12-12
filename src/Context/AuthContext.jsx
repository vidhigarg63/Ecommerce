import React, { useState, useEffect } from 'react';
import app from '../Firebase/Firebase';

// Making the auth context
export const AuthContext = React.createContext();

// Function to get the current user and store it as a state.
export const AuthProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState(null);
    
    useEffect(() => {
        app.auth().onAuthStateChanged(setCurrentUser);
    }, [])

    return (
        <AuthContext.Provider value={{currentUser}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider

