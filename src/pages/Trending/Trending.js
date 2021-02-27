import React, { useEffect, useState } from 'react'

// firebase
import Firestore from '../../firebase/firestore/Firestore.js';

// components
import Header from '../../components/Header/Header.js';
import SearchBar from '../../components/SearchBar/SearchBar.js';
import NavigationBar from '../../components/NavigationBar/NavigationBar.js';
import Question from '../../components/Question/Question.js';
import PostQuestionButton from '../../components/PostQuestionButton/PostQuestionButton.js';

// css
import './Trending.css';

export default function Trending() {
    const DB = new Firestore();

    const [globalQuestions, setGlobalQuestions] = useState([]);

    useEffect( async() => {
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
