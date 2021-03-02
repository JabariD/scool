import React, { useEffect, useState } from 'react'
import Authenticate from '../../firebase/auth/Authenticate.js';
import Firestore from '../../firebase/firestore/Firestore';

// React Router
import { useHistory } from 'react-router-dom';

// Material UI
import { Card, CardContent } from '@material-ui/core'


export default function QuestionFullPage(props) {
    const Auth = new Authenticate();
    const DB = new Firestore();
    const history = useHistory();
    console.log(props.match.params.questionID);

    const [question, setQuestion] = useState(null);

    useEffect( async() => {
    // double check logged in
    const result = await Auth.IsLoggedIn();
    if (!result) {
        history.push("/");
        return;
    }
    // get question correct collection from DB for this user using Authenticate
    const uid = Authenticate.user.uid;
    const user = await DB.getUser(uid);
    const questionCollectionToQuery = user.questionID;

    // get question from DB in that collection
    const question = await DB.querySpecificQuestion(questionCollectionToQuery, props.match.params.questionID);
    setQuestion(question);


    }, []);
    

    return (
        <div>
            { (question) ?
                <div>
                    {console.log(question)}
                <header>
                    <span><i class="fas fa-arrow-left"></i></span>
                    <h3>Post</h3>
                </header>

                <Card>
                    <CardContent>
                        <header>
                            <span id="question-title">{"Question"}</span>
                            <span id="question-user">{"User"}</span>
                        </header>
                        <main>
                            {question.downvotes}
                        </main>
                        
                        <section className="tags">

                        </section>

                        <section className="detailed">

                        </section>

                        <footer className="buttons">

                        </footer>
                    </CardContent>
                </Card>

                {/* Loop through each comments */}
                </div>
                :
                <></>
            }
        </div>
    )
}
