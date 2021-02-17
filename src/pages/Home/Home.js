import React, { useState, useContext, useEffect } from 'react'

// import Auth context
import { AuthContext } from '../../providers/AuthProvider/AuthProvider.js';

// import firebase
import { getUser } from '../../firebase/firestore/getUser.js';
import { queryQuestions } from '../../firebase/firestore/queryQuestions.js';

// React Router
import { useHistory } from 'react-router-dom';

// components
import SearchBar from '../../components/SearchBar/SearchBar.js';
import Header from '../../components/Header/Header.js';
import NavigationBar from '../../components/NavigationBar/NavigationBar.js';
import Question from '../../components/Question/Question.js';

// styles
import './Home.css';

export default function Home() {
    const history = useHistory();

    // Context
    const currentUser = useContext(AuthContext);

    // how to MAKE SURE user is logged in? -> use PrivateRoutes
    // assume User is logged in

    useEffect( async() => {
        // Confirm user is logged in
        console.log(currentUser);

        // get questions

        // get collection ID, if none present suggest some to user
        const userExists = await getUser(currentUser.uid);
        const user = userExists.data();
        const questionID = user.questionID;

        // then query questions (eventually sort by most popular in every 2 days) and display to user
        const questionsExist = await queryQuestions(questionID);
        questionsExist.forEach((doc) => {
            console.log(doc.id, ' => ', doc.data());
        });
        //  if (currentUser === null) history.push('/');
      }, []);

    return (
        <div className="home">
            
            <Header pageName="Home" />

            <SearchBar />

            <main className="questions">
                <Question/>
            </main>

            {/* Choose college to subscribe too */}

            <NavigationBar currentRoute="home" />
        </div>
    )
}
