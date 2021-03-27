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

export default function Home( props ) {
    const history = useHistory();
    const Auth = new Authenticate();
    const DB = new Firestore();

    // State
    const [subscribeToQuestionList, setSubscribeToQuestionsList] = useState(false);
    const [questions, setQuestions] = useState([]);
    const [questionCollectionID, setQuestionCollectionID] = useState("");
    const [collegeSelected, setCollegeSelected] = useState("");

    // confirm user is logged in
    // get questions for user OR show questions list user can subscribe to

    useEffect( async() => {
        // Confirm user is logged in
        const result = await Auth.IsLoggedIn();
        if (!result) {
            history.push("/");
            return;
        }

        // get collection ID
        const user = await DB.getUser(Authenticate.user.uid);
        const questionsID = user.questionID; // collectionID of questions user is subscribed to.

        // if questionID is none allow user to choose subscribe list
        if (questionsID === "none") setSubscribeToQuestionsList(true);
        else await displayQuestion(questionsID);

        

      }, []);

      // if user clicks submit, we set the user university for that user
    const setUserUniversity = async() => {
        if (collegeSelected === "") return;
        else await DB.updateUser(Authenticate.user.uid, {questionID: collegeSelected});

        // set it to false
        setSubscribeToQuestionsList(false);
        setCollegeSelected("");
        window.location.reload();
    }

    const displayQuestion = async(questionCollectionID) => {
        setQuestionCollectionID(questionCollectionID)
     
        // query questions
        const questionsExist = await DB.queryQuestions(questionCollectionID);
        let questionArray = [];
        questionsExist.forEach((doc) => {
            questionArray.push({id: doc.id, data: doc.data()})
        });
        setQuestions(questionArray);
    }
    


    return (
        <div className="home">
            
            <Header pageName="Home" />

            <SearchBar questions={questions} questionCollectionID={questionCollectionID}/> 
            {/* {
                (!subscribeToQuestionList) ?
                    <div id="home-icon-page" title="Get latest" onClick={syncQuestion}><i className="fas fa-sync"></i></div>
                :
                    <></>
            } */}

            <main className="questions">
                { (!subscribeToQuestionList) ? 
                    questions.map( (question, index) => {
                        return <Question key={index} question={question} id={questionCollectionID} /> 
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
                            <MenuItem value={"huBison1867"}>Howard University</MenuItem>
                            <MenuItem value={"wellesley"}>Wellesley University</MenuItem>
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
