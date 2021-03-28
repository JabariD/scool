import React, { useEffect, useState, useRef  } from 'react'

// React Router
import { useHistory } from 'react-router-dom';

// import firebase
import { firestore } from '../../firebase/firebase.js';
import Authenticate from '../../firebase/auth/Authenticate.js';
import Firestore from '../../firebase/firestore/Firestore.js';

// css
// 
import './MessagingConversation.css'
import { TextField, Button, Card, CardContent } from '@material-ui/core';

export default function MessagingConversation(props) {
    const history = useHistory();
    const Auth = new Authenticate();
    const DB = new Firestore();

    // for header
    const [receiverEmail, setReceiverEmail] = useState("");

    const [conversation, setConversation] = useState(null);

    // submitting a message
    const [message, setMessage] = useState('');

    // scroll into view
    const messagesEndRef = useRef(null)
    

    //console.log( props.match.params.userID);
    //console.log(props.match.params.receiverID)

    useEffect( async() => {
        const result = await Auth.IsLoggedIn();
        if (!result) {
            history.push("/");
            return;
        }

       const user = await DB.getUser(props.match.params.userID);

       const userDMs = user.directMessages;
        for (var i = 0; i < userDMs.length; i++) {
            if (props.match.params.receiverID === userDMs[i].user) {
                setConversation(userDMs[i]);
                const receiverUser =  await DB.getUser(userDMs[i].user);
                setReceiverEmail(receiverUser.email)
            }
        }

        // Establish real-time communication for this DB
        const userRef = firestore.collection("users").doc(Authenticate.user.uid);
        userRef.onSnapshot( (document) => {
            // check that messages length has increased or decreased
            const user = document.data();
            const myDirectMessages = user.directMessages;

            // loop and place message in conversation ID
            for (var i = 0; myDirectMessages.length; i++) {
                if (myDirectMessages[i].user === props.match.params.receiverID) {
                    // place in messages
                    setConversation(myDirectMessages[i]);
                    break;
                }
            }

            scrollToBottom();
        });

        scrollToBottom();
    }, [])

    const handleSubmitMessage = async() => {
        if (message === "") {
            console.log("Cannot send empty message.");
            return;
        }
        const userMessage = {
            text: message,
            createdAt: new Date(),
            owner: Authenticate.user.uid,
        }

        // send to both users in Firebase.
        await DB.putMessageInConversation(Authenticate.user.uid, userMessage, conversation.user);
        setMessage("");

    }

    const UserMessage = (props) => 
        <div className="userMessage">
            <p>{props.message.text}</p>
            <p>{props.message.createdAt.toDate().toString()}</p>
        </div>
    
    const ReceiverMessage = (props) => 
        <div className="receiverMessage">
            <p>{props.message.text}</p>
            <p>{props.message.createdAt.toDate().toString()}</p>
        </div>
    
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    const enterPress = async(e) => {
        if (e.keyCode === 13) await handleSubmitMessage();
    }

    return (
        <div>
            <header>
                <span onClick={() => history.goBack()} id="messaging-back-button"><i className="fas fa-arrow-left"></i></span>
                <h1>{receiverEmail}</h1>
            </header>

            {
                (conversation) ? 
                <div>
                    <main id="messaging-chat-main">
                        {
                            conversation.messages.map( (message, index) => {
                                    if (message.owner === Authenticate.user.uid)
                                        return <UserMessage key={index} message={message}/>
                                    else {
                                        return <ReceiverMessage key={index} message={message}/>
                                    }
                                }
                            

                            )
                        }
                        <div ref={messagesEndRef} />
                    </main>

                    <footer id="messaging-conversation-footer">
                        <TextField style={{display: "inline"}} onKeyDown={(e) => enterPress(e)} variant="outlined" placeholder="Type message..." value={message} onChange={(e) => setMessage(e.target.value)} />
                        <Button variant="contained" color="primary" onClick={handleSubmitMessage}>Enter</Button>
                    </footer>
                    
                </div>
                :
                <></>
            }
        </div>
    )
}
