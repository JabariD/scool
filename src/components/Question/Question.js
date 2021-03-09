import React, { useState, useEffect } from 'react';

// react router
import { Link, useHistory } from "react-router-dom";


// firestore
import Firestore from '../../firebase/firestore/Firestore';
import Authenticate from '../../firebase/auth/Authenticate'

// css
import './Question.css';

// Material UI
import { Card, CardContent } from '@material-ui/core'

export default function Question(props) {
    const DB = new Firestore(); 
    const history = useHistory();

    const [questionEmail, setQuestionEmail] = useState();
    const [questionObject, setQuestionObject] = useState(null);
    const [questionCollectionID, setQuestionCollectionID] = useState("");

    useEffect(async() => {
      setQuestionObject(props.question);
      await getUserWhoCreatedQuestion();
      CheckUpVoteDownVoteState();
    }, []);


    const CheckUpVoteDownVoteState = () => {
      if (props.question.data.upVotes.includes(Authenticate.user.uid)) {
        return (
          <>
            <span id="question-fa-upvote" onClick={handleUpVotes} style={{color: "orange"}}><i className="far fa-thumbs-up"></i></span><span style={fontIconStyle}>{props.question.data.upVotes.length}</span>
            <span id="question-fa-downvote" onClick={handleDownVotes}><i className="far fa-thumbs-down"></i></span><span style={fontIconStyle}>{props.question.data.downVotes.length}</span>
          </>
        )

      } else if (props.question.data.downVotes.includes(Authenticate.user.uid)) {
        return (
        <>
          <span id="question-fa-upvote" onClick={handleUpVotes}><i className="far fa-thumbs-up"></i></span><span style={fontIconStyle}>{props.question.data.upVotes.length}</span>
          <span id="question-fa-downvote" onClick={handleDownVotes} style={{color: "orange"}}><i className="far fa-thumbs-down"></i></span><span style={fontIconStyle}>{props.question.data.downVotes.length}</span>
        </>
        )
      } else {
        return (
        <>
          <span id="question-fa-upvote" onClick={handleUpVotes}><i className="far fa-thumbs-up"></i></span><span style={fontIconStyle}>{props.question.data.upVotes.length}</span>
          <span id="question-fa-downvote" onClick={handleDownVotes}><i className="far fa-thumbs-down"></i></span><span style={fontIconStyle}>{props.question.data.downVotes.length}</span>
        </>
        )
      }
    }


    const getUserWhoCreatedQuestion = async() => {
      const user = await DB.getUser(props.question.data.createdByUserID);
      if (props.id === "global") setQuestionCollectionID("global")
      else setQuestionCollectionID(user.questionID);
      setQuestionEmail(user.email);
    }

    const fontIconStyle = {
      marginRight: "10px",
      textAlign: "center",
    }


    const handleUpVotes = async() => {
      const userHasTakenNoAction = !questionObject.data.upVotes.includes(Authenticate.user.uid) && !questionObject.data.downVotes.includes(Authenticate.user.uid);
      const userHasUpVoted = questionObject.data.upVotes.includes(Authenticate.user.uid);

      if (userHasTakenNoAction) {
        // quickly change styling for no delay on UI
        document.getElementById("question-fa-upvote").style.color = "orange";
        await userUpVote();
        
        
       
      } else if (userHasUpVoted) {
        // quickly change styling for no delay on UI
        document.getElementById("question-fa-upvote").style.color = "black";
        await userRemoveUpVote();


      } else {
        // this must mean user has downvoted
        // quickly change styling for no delay on UI
        document.getElementById("question-fa-upvote").style.color = "orange";
        document.getElementById("question-fa-downvote").style.color = "black";

        await userRemoveDownVote();
        await userUpVote();
      }
      
    }

    const handleDownVotes = async() => {
      const userHasTakenNoAction = !questionObject.data.upVotes.includes(Authenticate.user.uid) && !questionObject.data.downVotes.includes(Authenticate.user.uid);
      const userHasDownVoted = questionObject.data.downVotes.includes(Authenticate.user.uid);

      if ( userHasTakenNoAction ) {
        // quickly change styling for no delay on UI
        document.getElementById("question-fa-downvote").style.color = "orange";
        await userDownVote();

        

      } else if (userHasDownVoted) {
        // quickly change styling for no delay on UI
        document.getElementById("question-fa-downvote").style.color = "black";
        await userRemoveDownVote();

      } else {
        document.getElementById("question-fa-upvote").style.color = "black";
        document.getElementById("question-fa-downvote").style.color = "orange";

        await userRemoveUpVote();
        await userDownVote();
      }
    }

    const userUpVote = async() => {
      // copy question object
      let tempQuestionObject = { ...questionObject };
      tempQuestionObject.data.upVotes.push(Authenticate.user.uid); // push ID onto state
      setQuestionObject(tempQuestionObject);
      console.log("Liked");
      await DB.updateSpecificQuestion(tempQuestionObject, questionCollectionID);
    }

    const userRemoveUpVote = async() => {
      // remove user uid from array
      let tempQuestionObject = { ...questionObject };
      const index = tempQuestionObject.data.upVotes.indexOf(Authenticate.user.uid);
      if (index > -1) {
        tempQuestionObject.data.upVotes.splice(index, 1);
      }

      setQuestionObject(tempQuestionObject);
      console.log("Un liked");
      await DB.updateSpecificQuestion(tempQuestionObject, questionCollectionID);
    }

    const userDownVote = async() => {
      let tempQuestionObject = { ...questionObject };
        tempQuestionObject.data.downVotes.push(Authenticate.user.uid);
        setQuestionObject(tempQuestionObject);
        console.log("Disliked");
        await DB.updateSpecificQuestion(tempQuestionObject, questionCollectionID);
    }

    const userRemoveDownVote = async() => {
      // remove user uid from array
      let tempQuestionObject = { ...questionObject };
      const index = tempQuestionObject.data.downVotes.indexOf(Authenticate.user.uid);
      if (index > -1) {
        tempQuestionObject.data.downVotes.splice(index, 1);
      }

      setQuestionObject(tempQuestionObject);
      console.log("Un disliked");
      await DB.updateSpecificQuestion(tempQuestionObject, questionCollectionID);
    }

    return (
        <div className="question-card-div">
          {(questionObject) ?
           <Card>
               <CardContent>
                    <header>
                        <span><i className="fas fa-user"></i></span> 
                        {/* User picture goes above here */}
                        <span id="question-title">{questionObject.data.title}</span>
                        <Link to={`/profile/${questionObject.data.createdByUserID}`}><span id="question-user">{questionEmail}</span></Link>
                        
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
                   
                      <CheckUpVoteDownVoteState />

                      <span id="question-fa-comment" onClick={() => history.push(`/${props.id}/${questionObject.id}`)}><i className="far fa-comment"></i></span><span style={fontIconStyle}>{Object.keys(questionObject.data.comments).length}</span>

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
