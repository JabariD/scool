import React, { useEffect, useState } from 'react'
import Header from '../../components/Header/Header'

// firebase
import Firestore from '../../firebase/firestore/Firestore';
import Authenticate from '../../firebase/auth/Authenticate'

// React Router
import { Link, useHistory } from 'react-router-dom';

// css
import './Profile.css';
// Material UI
import { Card, CardContent, TextField, Button } from '@material-ui/core'

export default function Profile( props ) {
    const history = useHistory();
    const DB = new Firestore();
    const Auth = new Authenticate();

    // state values
    const [user, setUser] = useState({});
    const [showTextField, setShowTextField] = useState(false);
    const [contentHot, setContentHot] = useState(false); // content must be saved... let the user know!
    const [major, setMajor] = useState("");

    // const input state
    const [contentEditing, setContentEditing] = useState("");
    const [content, setContent] = useState('');

    useEffect( async() => {
        // Confirm user is logged in
        const result = await Auth.IsLoggedIn();
        if (!result) {
            history.push("/");
            return;
        }

        const user = await DB.getUser(props.match.params.userID);
        setUser(user);
        setMajor(user.major);
        console.log(user)
    }, []);

    const handleEdit = (content) => {
        setContentEditing(content);
        setShowTextField(true);
    }

    const handleSubmit = async() => {

        let userCopy = Object.assign({}, user); 
        if (contentEditing === "major")
            userCopy.major = content;  
        
        setUser(userCopy);
        await DB.updateUser(Authenticate.user.uid, userCopy);
        setContent("");
        setContentEditing("");
        setShowTextField(false);
    }

    return (
        <div>
            <Header pageName="Profile"/>
            {
                (Authenticate.user && props.match.params.userID === Authenticate.user.uid) 
                ?
                <main id="main-profile">
                    <Card>
                        <CardContent>
                            <header>
                                <h2>{user.email} (Me)</h2>
                            </header>

                            <main id="profile-cards">
                                <section>
                                    <h3>Major</h3>
                                    {
                                        (user.major !== "") ?
                                        <h5 style={{color: "orange"}}>{user.major}</h5>
                                        :
                                        <span>No major to display.</span>
                                    }
                                    <span onClick={() => handleEdit("major")}><i className="fas fa-pen-square"></i></span>
                                </section>
                            </main>

                            <footer>
                                {
                                    (showTextField) ?
                                    <>
                                    <h5>Editing {contentEditing}</h5>
                                    <TextField value={content} onChange={(e) => setContent(e.target.value)}></TextField><br></br>
                                    </>
                                    :
                                    <></>
                                }
                                <Button variant="contained" style={{marginTop: '1em'}} onClick={handleSubmit}>Save changes</Button>
                            </footer>

                            <section>
                                {/* List of ALL user questions */}
                            </section>
                        </CardContent>
                    </Card>
                </main>
                :
                <div>
                    <Card>
                        <CardContent>
                            <header>
                                <span>{user.email}</span>
                            </header>

                            <main id="profile-cards">
                                <section>
                                    <h3>Major</h3>
                                    {
                                        (user.major !== "") ?
                                        <h5 style={{color: "orange"}}>{user.major}</h5>
                                        :
                                        <span>No major to display.</span>
                                    }
                                </section>

                            </main>

                            <section>
                                {/* Most famous posts of this user */}
                            </section>

                            <span><Link to={{pathname: "/messaging", userToMessage: props.match.params.userID,}} ><i class="fas fa-envelope"></i></Link></span>
                        </CardContent>
                    </Card>
                    
                </div>
            }

            <footer>
                {/* return button */}
                <Link to="/home">Go home</Link>
            </footer>
        </div>
    )
}
