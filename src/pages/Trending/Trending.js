import React from 'react'

import NavigationBar from '../../components/NavigationBar/NavigationBar.js';

export default function Trending() {
    return (
        <div>
            <h1>Trending Page</h1>

            <NavigationBar currentRoute="trending" />
        </div>
    )
}
