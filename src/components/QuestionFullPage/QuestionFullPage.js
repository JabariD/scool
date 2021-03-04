import React, { useEffect, useState } from 'react'
import Authenticate from '../../firebase/auth/Authenticate.js';
import Firestore from '../../firebase/firestore/Firestore';

// React Router
import { useHistory } from 'react-router-dom';

// css
import "./QuestionFullPage.css";

// Material UI
import { Card, CardContent } from '@material-ui/core'


export default function QuestionFullPage(props) {
    const Auth = new Authenticate();
    const DB = new Firestore();
    const history = useHistory();

    const [question, setQuestion] = useState(null);

    useEffect( async() => {
        // double check logged in
        const result = await Auth.IsLoggedIn();
        if (!result) {
            history.push("/");
            return;
        }
        // get question correct collection is gotten from URL

        // get question from DB in that collection
        const question = await DB.querySpecificQuestion(props.match.params.collectionID, props.match.params.questionID);
        setQuestion(question);

    }, []);
    

    return (
        <div>
            { (question) ?
                <div>
                    {console.log(question)}

                <header className="question-full-page-header">
                    <span className="back" onClick={() => history.goBack()}><i className="fas fa-arrow-left"></i></span>
                    <h3>Post</h3>
                </header>

                <div className="question-full-page-card">
                    <Card>
                        <CardContent>
                            <header>
                                <span id="question-full-title">{question.title}</span>
                                <span id="question-full-user">{"User"}</span>
                                <span>{new Date(question.time_posted.toDate()).toLocaleString()}</span>
                            </header>

                            <main>
                                {question.questionBody}
                            </main>
                            
                            <section className="tags">
                                {question.tags.map((tag, index) => {
                                return <span key={index} id="question-full-tag">{tag}</span>
                                })}
                            </section>

                            <section className="detailed">
                                {`${question.upVotes.length} Upvotes ${question.downVotes.length} Downvotes ${question.comments.length} Comments`}
                            </section>

                            <footer className="buttons">
                                <span><i className="far fa-thumbs-up"></i></span>

                                <span><i className="far fa-thumbs-down"></i></span>

                                <span><i className="far fa-comment"></i></span>
                            </footer>
                        </CardContent>
                    </Card>
                </div>

                {/* Loop through each comments */}
                </div>
                :
                <></>
            }
        </div>
    )
}
