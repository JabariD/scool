import React, { useState, useContext } from 'react'

// Firebase Authentication
import Authenticate from '../../firebase/auth/Authenticate.js';
import Firestore from '../../firebase/firestore/Firestore.js';

// import Auth context
import { AuthContext } from '../../providers/AuthProvider/AuthProvider.js';

// React Router
import { useHistory } from 'react-router-dom';

// styling
import "./SignUp.css";
import ScoolLogo from '../img/logo.png';

// materialUI
import { makeStyles } from "@material-ui/core/styles";
import { Button } from '@material-ui/core';
import { buttonStyle } from '../styles/MaterialUIStyles.js'

const useStyles = makeStyles({
    button: buttonStyle,
  });

export default function SignUp() {
    const Auth = new Authenticate();
    const DB = new Firestore();

    const history = useHistory();

    // MaterialUI
    const classes = useStyles();

    // State
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const emailPasswordSignUp = async() => {
      const errorMessage = await Auth.signUpWithEmailPassword(email, password);
       if (errorMessage !== "") {
        setErrorMessage("Error: " + errorMessage);
       } else {
           const currentUserID = Authenticate.user.uid;
           const currentUserEmail = Authenticate.user.email;
           await DB.createUser(currentUserID, currentUserEmail);
           setEmail("");
           setPassword("");
           setErrorMessage("");
           history.push('/home');
       }
    }

    return (
        <div>

            <img src={ScoolLogo} alt="Scool Logo" className="sign-up-form-logo"/>
            <h1>Sign up now, free!</h1>

            <section className="email-password">
                <div className="email">
                    <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                </div>
                <div className="password">
                    <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
                </div>
                <Button variant="contained" className={classes.button} onClick={emailPasswordSignUp}>
                    Sign Up
                </Button>
                <section className="error">{errorMessage}</section>
            </section>
        </div>
    )
}
