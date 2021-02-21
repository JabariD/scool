import React from 'react'

import Header from '../../components/Header/Header.js';
import NavigationBar from '../../components/NavigationBar/NavigationBar.js';


export default function Notifications() {
    return (
        <div>
             <Header pageName="Notifications" />

            <NavigationBar currentRoute="notifications" />
        </div>
    )
}
