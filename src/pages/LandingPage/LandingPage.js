import React, { useContext, useState } from 'react'

// import Auth context
import { AuthContext } from '../../providers/AuthProvider/AuthProvider.js';

// Firebase Authentication
import {signInWithEmailPassword} from '../../firebase/auth/signInWithEmailPassword.js';
import {signInWithGoogle} from '../../firebase/auth/signInWithGoogle.js';
import {signOut} from '../../firebase/auth/signOut.js';

// styling
import "./LandingPage.css";
import ScoolLogo from './img/logo.png';
import GoogleLogo from './img/googleLogo.svg';

// Material UI
import { makeStyles } from "@material-ui/core/styles";
import { Button } from '@material-ui/core';


const useStyles = makeStyles({
    root: {
      backgroundColor: "#2680FF",
      border: 0,
      borderRadius: "10px",
      width: "155px",
      height: "45px",
      color: "white",
      padding: "0 30px",
      display: "block",
      margin: "0 auto",
      textTransform: "none",
    },
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
    const currentUser = useContext(AuthContext);
    const classes = useStyles();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const emailPasswordSignIn = async(email, password) => {
       const result = await signInWithEmailPassword(email, password);
       if (result !== true) {
        setErrorMessage(result);
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

            {/* Button here! LOG IN */}
            <Button variant="contained" className={classes.root} onClick={() => emailPasswordSignIn(email, password)}>
                Sign up
            </Button>

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
