import React, { useState } from 'react'

// Firebase Authentication
import { signUpWithEmailPassword } from '../../firebase/auth/signUpWithEmailPassword.js';

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
    // MaterialUI
    const classes = useStyles();

    // State
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const emailPasswordSignUp = async() => {
      const errorMessage = await signUpWithEmailPassword(email, password);
       if (errorMessage !== "") {
        setErrorMessage("Error: " + errorMessage);
       } else {
           setEmail("");
           setPassword("");
           setErrorMessage("");
           console.log("User has signed up and can now log in!")
       }
    }

    return (
        <div>

            <img src={ScoolLogo} alt="Scool Logo" class="sign-up-form-logo"/>
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
            </section>
        </div>
    )
}
