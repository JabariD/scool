import React, { useContext } from 'react'

// import Auth context
import { AuthContext } from '../../providers/AuthProvider/AuthProvider.js';

//
import {signInWithGoogle} from '../../firebase/auth/signInWithGoogle.js';
import {signOut} from '../../firebase/auth/signOut.js';

// styling
import "./LandingPage.css";

export default function LandingPage() {
    const currentUser = useContext(AuthContext);

    return (
        <div>
            <h1>Hello World!</h1>
            <p onClick={signInWithGoogle}>Sign in with Google!</p>
            {currentUser === null ? "User not signed in" : currentUser.email}
            <p onClick={signOut}>Sign out!</p>


            <p>Check console for test!</p>
        </div>
    )
}
