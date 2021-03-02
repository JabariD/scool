import React, { useState } from 'react';

// react router
import { Link } from "react-router-dom";

// firestore
import Firestore from '../../firebase/firestore/Firestore';

// css
import './Question.css';

// Material UI
import { Card, CardContent } from '@material-ui/core'

export default function Question(props) {
    const DB = new Firestore(); 

    const [questionEmail, setQuestionEmail] = useState();

    const question = props.question;

    const findUserWithID = async() => {
      const user = await DB.getUser(question.data.createdByUserID);
      setQuestionEmail(user.email);
    }
    findUserWithID();


    const styles = {
      marginRight: "10px",
      textAlign: "center",
    }

    return (
        <div key={props.key} className="question-card-div">
           <Card>
               <CardContent>
                    <header>
                        <span><i className="fas fa-user"></i></span> 
                        {/* User picture goes above here */}
                        <span id="question-title">{question.data.title}</span>
                        <span id="question-user">{questionEmail}</span>
                        
                    </header>

                    <p>
                        <span>{(question.data.questionBody.length < 110) ? 
                        question.data.questionBody
                        :
                        question.data.questionBody.substr(0, 110) + "...Read more"
                        }
                        </span>
                    </p>
                    
                    <section className="question-tags">
                        {question.data.tags.map((tag, index) => {
                          return <span key={index} id="tag">{tag}</span>
                        })}
                    </section>

                    <section>
                   
                      <span><i className="far fa-thumbs-up"></i></span><span style={styles}>{question.data.upvotes ? question.data.upvotes : 0}</span>
                        {/* NOTE: we display the number like this because 0 was not showing. */}


                      <span><i className="far fa-thumbs-down"></i></span><span style={styles}>{question.data.downvotes ? question.data.downvotes : 0}</span>

                      <span><i className="far fa-comment"></i></span><span style={styles}>{Object.keys(question.data.comments).length}</span>

                    </section>

                    <footer><Link to={`/question/${question.id}`}>See More.</Link></footer>

               </CardContent>
           </Card>
        </div>
    )
}
