import React, { useEffect, useState } from 'react'
import Header from '../../components/Header/Header'

// firebase
import Firestore from '../../firebase/firestore/Firestore';
import Authenticate from '../../firebase/auth/Authenticate'

// React Router
import { Link, useHistory } from 'react-router-dom';

// Material UI
import { Card, CardContent, TextField, Button } from '@material-ui/core'

export default function Profile( props ) {
    const history = useHistory();
    const DB = new Firestore();
    const Auth = new Authenticate();

    const [user, setUser] = useState({});
    const [major, setMajor] = useState("");

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

    const handleSubmit = () => {

    }

    return (
        <div>
            <Header pageName="Profile"/>

            {
                (props.match.params.userID === Authenticate.user.uid) 
                ?
                <main>
                    <Card>
                        <CardContent>
                            <header>
                                <span>{user.email}</span>
                            </header>

                            <main>
                                <TextField label="Major" value={major} onChange={(e) => setMajor(e.target.value)}></TextField>
                                <TextField label="Graduation Date" type="date" InputLabelProps={{shrink: true}}></TextField>
                            </main>

                            <footer>
                                <Button onClick={handleSubmit}>Save changes</Button>
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

                            <main>
                                <span>{user.major}</span>
                                <span>{user.graduating}</span>
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
