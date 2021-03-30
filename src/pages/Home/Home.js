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
import Autocomplete from '@material-ui/lab/Autocomplete';
import { Select, MenuItem, Button, TextField } from '@material-ui/core';

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
    const [collegeSelected, setCollegeSelected] = useState(null);

    // if user has not selected college
    const [collegesList, setCollegesList] = useState([]);

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
        if (questionsID === "none") await setUserLocalFeed();
        else await displayQuestion(questionsID);

        

      }, []);

      // user needs to select a local college
      const setUserLocalFeed = async() => {
        const colleges = await DB.queryColleges();
        let tempArray = [];
        colleges.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            const college = doc.data();

            tempArray.push(college);
        });
        
        setCollegesList(tempArray);

        setSubscribeToQuestionsList(true);
      }

      // if user clicks submit, we set the user university for that user
    const setUserUniversity = async() => {
        if (collegeSelected === null) return;
        else await DB.updateUser(Authenticate.user.uid, {questionID: collegeSelected.questionID});

        // set it to false
        setSubscribeToQuestionsList(false);
        setCollegeSelected(null);
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
                        <h3>Choose a university to see questions</h3>
                        <Autocomplete
                            id="set-university-text-field"
                            options={collegesList}
                            getOptionLabel={(college) => college.title}
                            onChange={(e, value) => setCollegeSelected(value)} // prints the selected value
                            style={{ width: 300 }}
                            renderInput={(params) => <TextField {...params} label="Set university to..." variant="outlined" />}
                        />

                        <Button id="set-university-button-submit" onClick={setUserUniversity}>Submit</Button>
                        <p style={{textAlign: 'center', color: 'grey'}}>This can be changed later.</p>
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

const top100Films = [
    { title: 'The Shawshank Redemption', year: 1994 },
    { title: 'The Godfather', year: 1972 },
];