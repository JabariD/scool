import React, { useState, useEffect } from 'react'

// firebase
import Firestore from '../../firebase/firestore/Firestore.js';
import Authenticate from '../../firebase/auth/Authenticate.js';

import './PostQuestionButton.css';
import { TextField, Button, Modal, makeStyles } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));

export default function PostQuestionButton(props) {
    const DB = new Firestore();
    const classes = useStyles();

    const [open, setOpen] = useState(false);

    const [questionTitle, setQuestionTitle] = useState("");
    const [questionBody, setQuestionBody] = useState("");
    const [questionTags, setQuestionTags] = useState([]);
    const [questionRawTags, setQuestionRawTags] = useState("");

    
    const handleClose = () => {
        setOpen(false);
    };

    const handleTags = (rawTags) => {
        setQuestionRawTags(rawTags);
        setQuestionTags(rawTags.split(','));
    }

    const handleSubmitQuestion = async() => {
        

        if (questionTitle === "" || questionBody === "" || questionTags.length === 0) {
            console.log("Error! No empty fields.");
            return;
        }
        
        let error = "";
        // handles both local and global case
        if (props.postTo === "local") { // if a local question
            const currentUser = await DB.getUser(Authenticate.user.uid);
            error = await DB.postQuestionLocal({id: currentUser.questionID, title: questionTitle, body: questionBody, tags: questionTags}, Authenticate.user.uid);
        } else {
            error = await DB.postQuestionGlobal({title: questionTitle, body: questionBody, tags: questionTags}, Authenticate.user.uid);
        }

        // if no error then we posted
        if (error === "") {
            setQuestionTitle("");
            setQuestionBody("");
            setQuestionRawTags("");
            setQuestionTags([]);
            handleClose();
            window.location.reload();
        }
        
    }

    const modalBody = () => {
        
        return (
            <div className={classes.paper}>
                <h1>Post question to {props.postTo.charAt(0).toUpperCase() + props.postTo.substring(1)}!</h1>
                <form>
                    <TextField id="standard-basic" label="Title" value={questionTitle} onChange={(e) => setQuestionTitle(e.target.value)}/>
                    <TextField id="standard-multiline-static" label="Body" multiline value={questionBody} onChange={(e) => setQuestionBody(e.target.value)} />
                    <TextField id="standard-basic" label="Tags" value={questionRawTags} onChange={(e) => handleTags(e.target.value)} placeholder="e.g. calc2, integrals, math"/>
                    <Button variant="contained" onClick={handleSubmitQuestion}>Submit Question</Button>
                </form>
            </div>
        )
    }


    return (
        <div id="post-question-button">
            <span id="post-question-icon" className="grow" onClick={() => setOpen(true)}><i className="fas fa-plus-circle"></i></span>
            <Modal
                open={open}
                onClose={() => setOpen(false)}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                {modalBody()}
            </Modal>
        </div>
    )
}
