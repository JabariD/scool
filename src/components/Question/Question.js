import React, { useEffect } from 'react';

import Firestore from '../../firebase/firestore/Firestore'

// Material UI
import { Card, CardContent } from '@material-ui/core'




export default function Question(props) {
    const DB = new Firestore(); 

    const question = props.question;


    const findUserWithID = async() => {
      const result = await DB.getUser(question.data.createdByUserID);
      const user = result.data();
    }
    findUserWithID();

    console.log(question);

    const styles = {
      marginRight: "10px",
    }

    return (
        <div>
           <Card>
               <CardContent>
                    <header>
                        <span>{question.data.title}</span>
                        
                    </header>

                    <p>
                        <span>{(question.data.questionBody.length < 250) ? question.data.questionBody
                        :
                        question.data.questionBody.substr(0, 250) + "..."
                        }
                        </span>
                    </p>
                    
                    <section className="question-tags">
                        {question.data.tags.map((tag, index) => {
                          return <span key={index}>{tag}</span>
                        })}
                    </section>

                    <section>
                      <span><i className="far fa-thumbs-up"></i></span><span style={styles}>{question.data.upvotes}</span>

                      <span><i className="far fa-thumbs-down"></i></span><span style={styles}>{question.data.downvotes}</span>

                      <span><i className="far fa-comment"></i></span><span style={styles}>{Object.keys(question.data.comments).length}</span>

                    </section>

               </CardContent>
           </Card>
        </div>
    )
}
