import React, { useState, useEffect } from 'react';

// react router
import { Link } from "react-router-dom";

// firestore
import Firestore from '../../firebase/firestore/Firestore';
import Authenticate from '../../firebase/auth/Authenticate';

// css
import './Question.css';

// Material UI
import { Card, CardContent } from '@material-ui/core'

export default function Question(props) {
    const DB = new Firestore(); 
    const Auth = new Authenticate();

    const [questionEmail, setQuestionEmail] = useState();
    const [questionObject, setQuestionObject] = useState(null);

    useEffect(async() => {
      setQuestionObject(props.question);
      findUserWithID();
    }, []);



    const findUserWithID = async() => {
      const user = await DB.getUser(props.question.data.createdByUserID);
      setQuestionEmail(user.email);
    }


    const fontIconStyle = {
      marginRight: "10px",
      textAlign: "center",
    }


    // NEXT ACTION: simply use questionObject.data and send that STRAIGHT TO FIREBASE!


    const handleUpVotes = () => {
      const userHasTakenNoAction = !questionObject.data.upVotes.includes(Authenticate.user.uid) && !questionObject.data.downVotes.includes(Authenticate.user.uid);
      const userHasUpVoted = questionObject.data.upVotes.includes(Authenticate.user.uid);

      if (userHasTakenNoAction) {
        let tempQuestionObject = { ...questionObject };
        tempQuestionObject.data.upVotes.push(Authenticate.user.uid);
        setQuestionObject(tempQuestionObject);
        console.log("Liked");
        // change styling of liked 
      } else if (userHasUpVoted) {
        // remove user uid from array
        let tempQuestionObject = { ...questionObject };
        const index = tempQuestionObject.data.upVotes.indexOf(Authenticate.user.uid);
        if (index > -1) {
          tempQuestionObject.data.upVotes.splice(index, 1);
        }

        setQuestionObject(tempQuestionObject);
        console.log("Un liked");
        // change styling of liked
      }
      
    }

    const handleDownVotes = () => {
      const userHasTakenNoAction = !questionObject.data.upVotes.includes(Authenticate.user.uid) && !questionObject.data.downVotes.includes(Authenticate.user.uid);
      const userHasDownVoted = questionObject.data.downVotes.includes(Authenticate.user.uid);

      if ( userHasTakenNoAction ) {
        let tempQuestionObject = { ...questionObject };
        tempQuestionObject.data.downVotes.push(Authenticate.user.uid);
        setQuestionObject(tempQuestionObject);
        console.log("Disliked");
        // change styling
      } else if (userHasDownVoted) {
        // remove user uid from array
        let tempQuestionObject = { ...questionObject };
        const index = tempQuestionObject.data.downVotes.indexOf(Authenticate.user.uid);
        if (index > -1) {
          tempQuestionObject.data.downVotes.splice(index, 1);
        }

        setQuestionObject(tempQuestionObject);
        console.log("Un disliked");
        // change styling of liked
      }
    }
    

    console.log(questionObject);

    return (
        <div className="question-card-div">
          {(questionObject) ?
           <Card>
               <CardContent>
                    <header>
                        <span><i className="fas fa-user"></i></span> 
                        {/* User picture goes above here */}
                        <span id="question-title">{questionObject.data.title}</span>
                        <span id="question-user">{questionEmail}</span>
                        
                    </header>

                    <p>
                        <span>{(questionObject.data.questionBody.length < 110) ? 
                        questionObject.data.questionBody
                        :
                        questionObject.data.questionBody.substr(0, 110) + "...Read more"
                        }
                        </span>
                    </p>
                    
                    <section className="question-tags">
                        {questionObject.data.tags.map((tag, index) => {
                          return <span key={index} id="tag">{tag}</span>
                        })}
                    </section>

                    <section>
                   
                      <span onClick={handleUpVotes}><i className="far fa-thumbs-up"></i></span><span style={fontIconStyle}>{questionObject.data.upVotes.length}</span>

                      <span onClick={handleDownVotes}><i className="far fa-thumbs-down"></i></span><span style={fontIconStyle}>{questionObject.data.downVotes.length}</span>

                      <span><i className="far fa-comment"></i></span><span style={fontIconStyle}>{Object.keys(questionObject.data.comments).length}</span>

                    </section>

                    <footer><Link to={`/${props.id}/${questionObject.id}`}>See More.</Link></footer>

               </CardContent>
           </Card>
           :
           <></>
          }
        </div>
    )
}
