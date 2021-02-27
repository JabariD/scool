// Import 
import { firestore } from "../firebase.js";

class Firestore {
    async createUser(userID, userEmail) {
        console.log("Creating user... with ID of..." + userID);
        try {
            const userToUpdate = firestore.collection("users").doc(userID);
            await userToUpdate.set({
                created: new Date(),
                bio: "",
                directMessages: "",
                major: "",
                minor: "",
                questionsAsked: "",
                graduating: null,
                questionID: -1,
                email: userEmail,
            });
            console.log("Document successfully updated!");
    
        } catch(e) {
            console.log(e);
        }
    }

    async getUser(userID) {
        try {
            const userToGet = firestore.collection("users").doc(userID);
            return await userToGet.get();
        } catch(e) {
            console.log(e);
        }
    }

    async updateUser(userID, info) {
        try {
            const userToUpdate = firestore.collection("users").doc(userID);
            await userToUpdate.update(info);
            console.log("Document successfully updated!");
    
        } catch(e) {
            console.log(e);
        }
    }

    async queryQuestions(questionID) {
        try {
            const questionsRef = firestore.collection(questionID);
            return await questionsRef.get();
        } catch(e) {
            console.log(e);
        }
    }

    async postQuestionLocal(questionObject, userID) {
        try {
            await firestore.collection(questionObject.id).add({
                comments: [],
                createdByUserID: userID,
                downVotes: 0,
                questionBody: questionObject.body,
                tags: questionObject.tags,
                time_posted: new Date(),
                title: questionObject.title,
                upVotes: 0,
            })
            return "";
        } catch(e) {
            console.log(e);
            return e;
        }
    }

    async postQuestionGlobal(questionObject, userID) {
        try {
            await firestore.collection("global").add({
                comments: [],
                createdByUserID: userID,
                downVotes: 0,
                questionBody: questionObject.body,
                tags: questionObject.tags,
                time_posted: new Date(),
                title: questionObject.title,
                upVotes: 0,
            })
            return "";
        } catch(e) {
            console.log(e);
            return e;
        }
    }

    
}

export default Firestore;

