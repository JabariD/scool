import React, { useState } from 'react'

// firebase
import Authenticate from '../../firebase/auth/Authenticate.js';

// React Router
import { useHistory } from 'react-router-dom';

// styles
import "./Header.css";

import ScoolLogo from '../../pages/img/logo.png';

// Material UI
import { Drawer, List, ListItem, ListItemText, Divider } from '@material-ui/core';

export default function Header( props ) {
    const Auth = new Authenticate();

    const [drawerState, setDrawerState] = useState(false);

    const toggleDrawer = (state) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
      
        setDrawerState(state);
    }

    const history = useHistory();
    const signUserOut = async() => {
        await Auth.signOut();
        history.push('/');
    }

    const drawerLinks = () => (
        <div className="drawerLinks" onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
            <section>
                <span className="profile-image"><i className="fas fa-user-alt"></i></span>
            </section>
            

            <List>
                <ListItem>
                    <ListItemText primary={"Profile"} />
                </ListItem>
                <ListItem>
                    <ListItemText primary={"Saved"} />
                </ListItem>
                <ListItem>
                    <ListItemText primary={"Bonuses"} />
                </ListItem>
                <ListItem>
                    <ListItemText primary={"Settings"} />
                </ListItem>
                <Divider/>
                <ListItem onClick={signUserOut}>
                    <ListItemText primary={"Sign Out"} />
                </ListItem>
            </List>

        </div>
    );


    return (
        <header>
            <div className="header-logo">
                <span className="hamburger-menu" onClick={toggleDrawer(true)}>
                        <i className="fas fa-bars"></i>
                </span>

                <img src={ScoolLogo} alt="Scool logo"  />
            </div>
            

            <h2 className="header-pageName">{props.pageName}</h2>

            <Drawer open={drawerState} onClose={toggleDrawer(false)} >
                {drawerLinks()}
            </Drawer>
            
        </header>
    )
}
