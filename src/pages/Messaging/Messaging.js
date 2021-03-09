import React, { useState, useEffect } from 'react'

// import firebase
import Authenticate from '../../firebase/auth/Authenticate.js';
import Firestore from '../../firebase/firestore/Firestore.js';

import Header from '../../components/Header/Header.js';
import NavigationBar from '../../components/NavigationBar/NavigationBar.js';

export default function Messaging(props) {
    const { userToMessage } = props.location;

    const Auth = new Authenticate();
    const DB = new Firestore();

    const [messages, setMessages] = useState([]);

    useEffect( async() => {
        await Auth.IsLoggedIn();

        // get user DM's from firestore
        const user = await DB.getUser(Authenticate.user.uid);
        setMessages(user.directMessages);
        console.log(user)

        if (userToMessage !== undefined) {
            // if this user has data to DM someone
            const DM = {};
            setMessages(...messages, DM);

        }

        setMessages(user.directMessages);
    }, []);


    console.log(userToMessage);

    return (
        <div>
            <Header pageName="Messaging" />

            
            <div>
                <span>Search bar.</span>
                {/* search people and groups */}
            </div>

            <main>
                {/* Display list of messages */}
                {

                }
            </main>

            <footer className="footer-nav-bar">
                <NavigationBar currentRoute="messaging" />
            </footer>
        </div>
    )
}
