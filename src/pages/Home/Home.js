import React, { useState, useContext, useEffect } from 'react'

// import Auth context
import { AuthContext } from '../../providers/AuthProvider/AuthProvider.js';

// React Router
import { useHistory } from 'react-router-dom';

// components
import SearchBar from '../../components/SearchBar/SearchBar.js';
import Header from '../../components/Header/Header.js';
import NavigationBar from '../../components/NavigationBar/NavigationBar.js';

export default function Home() {
    const history = useHistory();

    // Context
    const currentUser = useContext(AuthContext);

    useEffect(() => {
        // Confirm user is logged in
        console.log(currentUser)
        // if (currentUser === null) history.push('/');
      }, [currentUser]);

    return (
        <div>
            
            <Header pageName="Home" />

            <SearchBar />

            <main className="questions">

            </main>

            <NavigationBar pageName="Home" />
        </div>
    )
}
