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

    const handleUpVotes = async() => {
        const userHasTakenNoAction = !question.upVotes.includes(Authenticate.user.uid) && !question.downVotes.includes(Authenticate.user.uid);
        const userHasUpVoted = question.upVotes.includes(Authenticate.user.uid);
  
        if (userHasTakenNoAction) {


          let tempQuestionObject = { ...question };
          tempQuestionObject.upVotes.push(Authenticate.user.uid);
          setQuestion(tempQuestionObject);
          console.log("Liked");
          await DB.updateSpecificQuestion({data: tempQuestionObject, id: props.match.params.questionID}, props.match.params.collectionID);
          // change styling of liked 
        } else if (userHasUpVoted) {

          // remove user uid from array
          let tempQuestionObject = { ...question };
          const index = tempQuestionObject.upVotes.indexOf(Authenticate.user.uid);
          if (index > -1) {
            tempQuestionObject.upVotes.splice(index, 1);
          }
  
          setQuestion(tempQuestionObject);
          console.log("Un liked");
          await DB.updateSpecificQuestion({data: tempQuestionObject, id: props.match.params.questionID}, props.match.params.collectionID);
          // change styling of liked
        }
        
      }
  
      const handleDownVotes = async() => {
        const userHasTakenNoAction = !question.upVotes.includes(Authenticate.user.uid) && !question.downVotes.includes(Authenticate.user.uid);
        const userHasDownVoted = question.downVotes.includes(Authenticate.user.uid);
  
        if ( userHasTakenNoAction ) {


          let tempQuestionObject = { ...question };
          tempQuestionObject.downVotes.push(Authenticate.user.uid);
          setQuestion(tempQuestionObject);
          console.log("Disliked");
          await DB.updateSpecificQuestion({data: tempQuestionObject, id: props.match.params.questionID}, props.match.params.collectionID);
          // change styling
        } else if (userHasDownVoted) {


          // remove user uid from array
          let tempQuestionObject = { ...question };
          const index = tempQuestionObject.downVotes.indexOf(Authenticate.user.uid);
          if (index > -1) {
            tempQuestionObject.downVotes.splice(index, 1);
          }
  
          setQuestion(tempQuestionObject);
          console.log("Un disliked");
          await DB.updateSpecificQuestion({data: tempQuestionObject, id: props.match.params.questionID}, props.match.params.collectionID);
          // change styling of liked
        }
      }
    

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
                                <span id="question-full-fa-upvote" onClick={handleUpVotes}><i className="far fa-thumbs-up"></i></span>

                                <span id="question-full-fa-downvote" onClick={handleDownVotes}><i className="far fa-thumbs-down"></i></span>

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
