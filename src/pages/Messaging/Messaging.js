import React from 'react'

import Header from '../../components/Header/Header.js';
import NavigationBar from '../../components/NavigationBar/NavigationBar.js';

export default function Messaging() {
    return (
        <div>
             <Header pageName="Messaging" />

            <NavigationBar currentRoute="messaging" />
        </div>
    )
}
