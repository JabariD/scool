import React from 'react'

import Header from '../../components/Header/Header.js';
import NavigationBar from '../../components/NavigationBar/NavigationBar.js';

export default function Trending() {
    return (
        <div>
            <Header pageName="Trending" />

            <NavigationBar currentRoute="trending" />
        </div>
    )
}
