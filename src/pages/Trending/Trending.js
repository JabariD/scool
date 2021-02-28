import React, { useEffect, useState, useContext } from 'react'

import { AuthContext } from '../../providers/AuthProvider/AuthProvider.js';

// firebase
import Authenticate from '../../firebase/auth/Authenticate.js';
import Firestore from '../../firebase/firestore/Firestore.js';

// React Router
import { useHistory } from 'react-router-dom';

// components
import Header from '../../components/Header/Header.js';
import SearchBar from '../../components/SearchBar/SearchBar.js';
import NavigationBar from '../../components/NavigationBar/NavigationBar.js';
import Question from '../../components/Question/Question.js';
import PostQuestionButton from '../../components/PostQuestionButton/PostQuestionButton.js';

// css
import './Trending.css';

export default function Trending() {
    const history = useHistory();
    const Auth = new Authenticate();
    const DB = new Firestore();

    const user = useContext(AuthContext);

    const [globalQuestions, setGlobalQuestions] = useState([]);

    useEffect( async() => {
        // Confirm user is logged in
        const result = await Auth.IsLoggedIn();

        if (!result) {
            history.push("/");
            return;
        }

        // query global questions
        const questionsExist = await DB.queryQuestions("global");
        let questionArray = [];
        questionsExist.forEach((doc) => {
            console.log(doc.data());
            questionArray.push({id: doc.id, data: doc.data()})
        });
        setGlobalQuestions(questionArray);
    }, [])
    return (
        <div className="global">

            <Header pageName="Trending" />

            <SearchBar questions={globalQuestions}/>

            <main className="questions">
                {
                    globalQuestions.map( (question, index) => {
                        return <Question key={index} question={question}/> 
                    })
                }
            </main>

            <PostQuestionButton postTo="global"/>

            <NavigationBar currentRoute="trending" />
        </div>
    )
}
