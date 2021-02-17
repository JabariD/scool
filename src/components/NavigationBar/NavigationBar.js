import React, { useState } from 'react';

// React Router
import { useHistory } from 'react-router-dom';

// Material UI
import './NavigationBar.css';
import { BottomNavigation, BottomNavigationAction } from '@material-ui/core'
import { makeStyles } from "@material-ui/core/styles";


const useStyles = makeStyles({
    root: {
        backgroundColor: "#D6E7FF",
        position: "absolute",
        left: 0,
        bottom: 0,
        height: "100px",
        width: "100%",
    },
});


export default function NavigationBar(props) {
    const classes = useStyles();

    // History
    const history = useHistory();

    const [value, setValue] = useState(props.currentRoute);

    const handleChange = (event, newValue) => {
        setValue(newValue);
        history.push(newValue); // newValue matches the URL
    };

    // font awesome
    const HomeIcon = <span className="nav-icons"><i className="fas fa-home"></i></span>
    const TrendingIcon = <span className="nav-icons"><i className="fab fa-gripfire"></i></span>
    const BellIcon = <span className="nav-icons"><i className="fas fa-bell"></i></span>
    const MailIcon = <span className="nav-icons"><i className="fas fa-envelope"></i></span>

    return (
        <BottomNavigation value={value} onChange={handleChange} className={classes.root}>
            <BottomNavigationAction value="home" icon={HomeIcon}/>
            <BottomNavigationAction value="trending" icon={TrendingIcon}/>
            <BottomNavigationAction value="notifications" icon={BellIcon}/>
            <BottomNavigationAction value="messaging" icon={MailIcon}/>
        </BottomNavigation>
    )
}
