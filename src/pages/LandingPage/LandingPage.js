import React, { useContext, useState, useCallback } from 'react'

// import Auth context
import { AuthContext } from '../../providers/AuthProvider/AuthProvider.js';

// React Router
import { useHistory } from 'react-router-dom';

// Firebase Authentication
import { signInWithEmailPassword } from '../../firebase/auth/signInWithEmailPassword.js';
import { signInWithGoogle } from '../../firebase/auth/signInWithGoogle.js';
import { signOut } from '../../firebase/auth/signOut.js';

// styling
import "./LandingPage.css";
import ScoolLogo from '../img/logo.png';
import GoogleLogo from './img/googleLogo.svg';

// Material UI
import { buttonStyle } from '../styles/MaterialUIStyles.js'
import { makeStyles } from "@material-ui/core/styles";
import { Button } from '@material-ui/core';


const useStyles = makeStyles({
    button: buttonStyle,
    googleSignIn: {
        backgroundColor: "white",
        fontSize: "0.8em",
        width: "18em",
        margin: "0 auto",
        color: "black",
        display: "block",
        textTransform: "none",
        backgroundImage: `url(${GoogleLogo})`,
        backgroundPosition: "2px 9px",
        backgroundRepeat: "no-repeat",
    }
  });

export default function LandingPage() {
    // Context
    const currentUser = useContext(AuthContext);

    // MaterialUI
    const classes = useStyles();

    // State
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    // History
    const history = useHistory();
    const handleOnClick = useCallback(() => history.push('/signup'), [history]);

    // Behavior
    const emailPasswordSignIn = async(email, password) => {
       const errorMessage = await signInWithEmailPassword(email, password);
       if (errorMessage !== "") {
        setErrorMessage("Error: " + errorMessage);
       } else {
           setEmail("");
           setPassword("");
           setErrorMessage("");
       }
    }  

    return (
        <div>
            <header>
                <section className="logo">
                    <img src={ScoolLogo} alt="Scool Logo"/>
                    <h1 id="company logo">SCOOL</h1>
                </section>

                <section className="motto">
                    <h2>Connect.</h2>
                    <h2>Collaborate.</h2>
                    <h2>Succeed.</h2>
                </section>
            </header>

            <section className="email-password">
                <div className="email">
                    <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <div className="password">
                    <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                </div>
            </section>

            <section className="error">{errorMessage}</section>

            <Button variant="contained" className={classes.button} onClick={() => emailPasswordSignIn(email, password)}>
                Log in
            </Button>
            <section class="createAccount">
                <p className="create-account" onClick={handleOnClick}>Sign up</p>
            </section>

            <section className="google-login">
                <Button variant="contained" className={classes.googleSignIn} onClick={signInWithGoogle}>
                    Sign up or Log in using Google
                </Button>
            </section>
          
            {currentUser === null ? "User not signed in" : currentUser.email}
            
            
            <p onClick={signOut}>Sign out!</p>


        </div>
    )
}