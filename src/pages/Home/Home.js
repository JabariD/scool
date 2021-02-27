import React, { useState, useEffect, useContext } from 'react'

import { AuthContext } from '../../providers/AuthProvider/AuthProvider.js';

// import firebase
import Authenticate from '../../firebase/auth/Authenticate.js';
import Firestore from '../../firebase/firestore/Firestore.js';

// React Router
import { useHistory } from 'react-router-dom';

// components
import SearchBar from '../../components/SearchBar/SearchBar.js';
import Header from '../../components/Header/Header.js';
import NavigationBar from '../../components/NavigationBar/NavigationBar.js';
import Question from '../../components/Question/Question.js';
import PostQuestionButton from '../../components/PostQuestionButton/PostQuestionButton.js';

// MaterialUI
import { Select, MenuItem, Button } from '@material-ui/core';

// styles
import './Home.css';

export default function Home() {
    const history = useHistory();
    const Auth = new Authenticate();
    const DB = new Firestore();

    const user = useContext(AuthContext);
    // console.log(Authenticate.user.uid);

    // State
    const [subscribeToQuestionList, setSubscribeToQuestionsList] = useState(false);
    const [questions, setQuestions] = useState([]);
    const [collegeSelected, setCollegeSelected] = useState("");

    // how to MAKE SURE user is logged in? -> use PrivateRoutes
    // assume User is logged in

    useEffect( async() => {
        // Confirm user is logged in
        await Auth.IsLoggedIn();
        console.log(user)
        if (user) {
            Authenticate.user = user;
        }

        if (Authenticate.user === null) {
            history.push("/");
            return;
        }
        console.log(Authenticate.user);

        // get questions

        // get collection ID, if none present suggest some to user

        const userExists = await DB.getUser(Authenticate.user.uid);
        const userA = userExists.data();
        const questionsID = userA.questionID;

        if (questionsID === -1) {
            setSubscribeToQuestionsList(true);

        } else {
            // then query questions (eventually sort by most popular in every 2 days) and display to user
            const questionsExist = await DB.queryQuestions(questionsID);
            let questionArray = [];
            questionsExist.forEach((doc) => {
                questionArray.push({id: doc.id, data: doc.data()})
            });
            setQuestions(questionArray);
            //  if (currentUser === null) history.push('/');
        }

      }, []);

    const setUserUniversity = async() => {
        if (collegeSelected === "") return;
        else await DB.updateUser(Authenticate.user.uid, {questionID: collegeSelected});
        

        // when user confirms their choice, make it their choice in firebase
        // grab ID from colleges and set it in user's profile

        // set it to false
        setSubscribeToQuestionsList(false);
        setCollegeSelected("");
    }

    return (
        <div className="home">
            
            <Header pageName="Home" />

            <SearchBar questions={questions}/>

            <main className="questions">
                { (!subscribeToQuestionList) ? 
                    questions.map( (question, index) => {
                        return <Question key={index} question={question}/> 
                    })
                    : 
                    <div>
                        {/* Will be made into an AutoComplete for better navigation of colleges */}
                        <h3>Choose a university to see questions...</h3>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={collegeSelected}
                            onChange={(e) => setCollegeSelected(e.target.value)}
                            >
                            <MenuItem value={"huBison1867"}>Howard U</MenuItem>
                        </Select>
                        <Button onClick={setUserUniversity}>Submit</Button>
                        <p>This can be changed later.</p>
                    </div>
                
                }
            </main>

            {
                (!subscribeToQuestionList) ?
                <PostQuestionButton postTo="local"/>
                :
                <></>
            }

            <footer className="footer-nav-bar">
                <NavigationBar currentRoute="home" />
            </footer>
        </div>
    )
}
