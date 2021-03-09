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
                directMessages: [],
                major: "",
                minor: "",
                questionsAsked: "",
                graduating: null,
                questionID: "none",
                email: userEmail,
            });
            console.log("Document successfully updated!");
    
        } catch(e) {
            console.log(e);
        }
    }

    async getUser(userID) {
        const userRef = firestore.collection("users").doc(userID);

        try {
            const userDocument = await userRef.get();
            if (userDocument.exists) {
                return userDocument.data();
            } else {
                console.log("The user document you requested does not exist.")
                return null
            }
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

    async querySpecificQuestion(questionCollectionID, questionDocumentID) {
        const questionRef = firestore.collection(questionCollectionID).doc(questionDocumentID);

        try {
            const questionDocument = await questionRef.get();
            if (questionDocument.exists) {
                return questionDocument.data();
            } else {
                console.log("The specific question you requested does not exist.")
                return null;
            }
        } catch(e) {
            console.log(e);
            
        }

    }

    async postQuestionLocal(questionObject, userID) {
        try {
            await firestore.collection(questionObject.id).add({
                comments: [],
                createdByUserID: userID,
                downVotes: [],
                questionBody: questionObject.body,
                tags: questionObject.tags,
                time_posted: new Date(),
                title: questionObject.title,
                upVotes: [],
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
                downVotes: [],
                questionBody: questionObject.body,
                tags: questionObject.tags,
                time_posted: new Date(),
                title: questionObject.title,
                upVotes: [],
            })
            return "";
        } catch(e) {
            console.log(e);
            return e;
        }
    }

    async updateSpecificQuestion(questionObject, collectionID) {
        console.log(questionObject);
        // question object contains ID
        const questionToUpdate = firestore.collection(collectionID).doc(questionObject.id);
        
        try {
            await questionToUpdate.update(questionObject.data);
            console.log("Document successfully updated!");
        } catch(e) {
            console.log(e);
        }

    }

    
}

export default Firestore;

