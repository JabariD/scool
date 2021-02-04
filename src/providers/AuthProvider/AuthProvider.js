import React, { useState, useEffect } from 'react'

/** Important to understand WHY we're using the Context API. Many pages need this currentUser object. */

// firebase
import { firebase } from '../../firebase/firebase.js';

// Create context. 
export const AuthContext = React.createContext();

export const AuthProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState(null); // Handles the data

    // Make changes on that data.
    useEffect( () => {
        firebase.auth().onAuthStateChanged(setCurrentUser); // subscribes to auth object listening for changes
    }, []); // empty array passed so it runs only ONCE when AuthProvider gets mounted

    // NOTE: value is passed to all of it's children.
    return (
        <AuthContext.Provider value={currentUser}> 
            {children}
        </AuthContext.Provider>
    );
}

   