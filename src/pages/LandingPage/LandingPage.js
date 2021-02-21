import React, { useContext, useState, useCallback, useEffect } from 'react'

// import Auth context
import { AuthContext } from '../../providers/AuthProvider/AuthProvider.js';
import Authenticate from '../../firebase/auth/Authenticate.js';
import Firestore from '../../firebase/firestore/Firestore.js';

// React Router
import { useHistory } from 'react-router-dom';

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
    // const user = useContext(AuthContext);
    const DB = new Firestore();
    const Auth = new Authenticate();

    console.log(Authenticate.user);

    // MaterialUI
    const classes = useStyles();

    // State
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    // History
    const history = useHistory();
    const handleOnClick = useCallback(() => history.push('/signup'), [history]);

    useEffect(() => {
        // Confirm user is logged in
        if (Authenticate.user) {
            // User is signed in.
            history.push('/home');
        }
      });

    // Behavior
    const emailPasswordSignIn = async(email, password) => {
        try {
            const errorMessage = await Auth.signInWithEmailPassword(email, password);
            if (errorMessage !== "") {
                throw errorMessage;
            } else {
                await DB.updateUser(Authenticate.user.uid, {lastLoggedIn: new Date()});
                setEmail("");
                setPassword("");
                setErrorMessage("");
                history.push("/home");
            }
        } catch (e) {
            console.log(e);
            setErrorMessage(e);
        }
    }  

    const googleSignIn = async() => {
        try {
            const errorMessage = await Auth.signInWithGoogle();
            if (errorMessage !== "") {
                throw errorMessage;
            } else {
                const uid = Authenticate.user.uid;
                const email = Authenticate.user.email;

                const userA = await DB.getUser(uid);

                if (userA.exists) await DB.updateUser(uid, {lastLoggedIn: new Date()});
                else await DB.createUser(uid, email);

                setEmail("");
                setPassword("");
                setErrorMessage("");
                history.push("/home");
            }
        } catch (e) {
            console.log(e);
            setErrorMessage(e);
        }
    }


    return (
        <div>
            <header className="header-landingPage">
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
            <section className="createAccount">
                <p className="create-account" onClick={handleOnClick}>Sign up</p>
            </section>

            <section className="google-login">
                <Button variant="contained" className={classes.googleSignIn} onClick={googleSignIn}>
                    Sign up or Log in using Google
                </Button>
            </section>
        </div>
    )
}
