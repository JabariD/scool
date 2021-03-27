import React, { useState, useEffect } from 'react'

// React Router
import { useHistory } from 'react-router-dom';

// import firebase
import Authenticate from '../../firebase/auth/Authenticate.js';
import Firestore from '../../firebase/firestore/Firestore.js';

// components
import Header from '../../components/Header/Header.js';
import NavigationBar from '../../components/NavigationBar/NavigationBar.js';
import MessagingSearchBar from './MessagingSearchBar.js';

// css
import './Messaging.css';

// Material Ui
import { Card, CardContent, Button, Modal, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));

export default function Messaging(props) {
    const history = useHistory();
    const { userToMessage } = props.location;

    const classes = useStyles();

    const Auth = new Authenticate();
    const DB = new Firestore();

    const [userToDM, setUserToDM] = useState('');
    const [userToDMEmail, setUserToDMEmail] = useState('');

    const [messages, setMessages] = useState([]);
 

    const [open, setOpen] = useState(false);

    useEffect( async() => {
        await Auth.IsLoggedIn();

        // get user DM's from firestore
        const user = await DB.getUser(Authenticate.user.uid);

        let directMessages = user.directMessages;

        if (userToMessage !== undefined) {
            // if this user has data to DM someone
            const DM = {};
            setMessages(...messages, DM);

        }

        // set email of user
        for (var i = 0; i < directMessages.length; i++) {
            const receiverUser = await DB.getUser(directMessages[i].user);
            const receiverUserEmail = receiverUser.email;
            directMessages[i].userEmail = receiverUserEmail;

        }

        setMessages(user.directMessages);

    }, []);

    const getSelectedUser = (userSelected) => {
        if (userSelected) {
            setUserToDM(userSelected);
            setUserToDMEmail(userSelected.data.email);
            setOpen(true);
        }
    }

    const handleStartConversation = async() => {
        // make conversation component in firestore
        await DB.createConversation(Authenticate.user.uid, userToDM.id);
        setOpen(false);
        history.reload();
    }

    const handleCancelConversation = () => {
        setOpen(false);
    }


    const modalBody = () => {
        return (
            <div className={classes.paper} id="messaging-modal-div">
                <h1>Would you like to start a chat with: "{userToDMEmail}"</h1>
                <form>
                    <Button onClick={() => handleStartConversation()} variant="contained">Yes</Button>
                    <Button onClick={() => handleCancelConversation()} variant="contained">No</Button>
                </form>
            </div>
        )
    }

    return (
        <div>
            <Header pageName="Messaging" />

            
            <div>
                {/* search people and groups */}
                <MessagingSearchBar getSelectedUser={getSelectedUser}/>
            </div>

            <main>
                {/* Display list of conversations */}
                {
                    messages.map((message, index) => (
                        <div key={index} onClick={() => history.push(`/messaging/${Authenticate.user.uid}/${message.user}`)}>
                            <Card>
                                <CardContent>
                                    <div>
                                        {message.userEmail}
                                    </div>

                                    <div>
                                        {message.lastUpdated}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                        ) 
                    )

                }
            </main>

            <div>
                <Modal
                open={open}
                onClose={() => setOpen(false)}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                >
                {modalBody()}
                </Modal>
            </div>

            <footer className="footer-nav-bar">
                <NavigationBar currentRoute="messaging" />
            </footer>
        </div>
    )
}
