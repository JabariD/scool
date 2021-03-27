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
                notifications: [],
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

    async getUsers() {
        try {
            const usersRef = firestore.collection("users");
            return await usersRef.get();
        } catch(e) {
            console.error(e);
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
            console.error(e);
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
            console.error(e);
            
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

    // NOTE: questionObject must have id field 
    async updateSpecificQuestion(questionObject, collectionID) {
        // question object contains ID
        const questionToUpdate = firestore.collection(collectionID).doc(questionObject.id);
        
        try {
            await questionToUpdate.update(questionObject.data);
            console.log("Document successfully updated!");
        } catch(e) {
            console.log(e);
        }

    }

    // NOTE: questionObject must have id field 
    async deleteSpecificQuestion(questionObject, collectionID) {
        const questionToDelete = firestore.collection(collectionID).doc(questionObject.id);

        try {
            await questionToDelete.delete();
            console.log("Document successfully deleted!");
        } catch(e) {
            console.log(e);
        }
    }

    async createConversation(myID, receiverID) {

        const myDirectMessage = {
            user: receiverID,
            messages: [],
            createdAt: Date(),
            lastUpdated: Date(),
        }

        const theirDirectMessage = {
            user: myID,
            messages: [],
            createdAt: Date(),
            lastUpdated: Date(),
        }

        const me = await this.getUser(myID);
        const them = await this.getUser(receiverID);

        let myDMs = me.directMessages;
        let themDMs = them.directMessages; 

        myDMs.push(myDirectMessage);
        themDMs.push(theirDirectMessage);
        
        try {
            await this.updateUser(myID, {directMessages: myDMs});
            await this.updateUser(receiverID, {directMessages: themDMs});
        } catch (e) {
            console.log(e);
        }
    }

    async putMessageInConversation(myID, message, receiverID) {
        // put message in both users

        // me first
        const me = await this.getUser(myID)
        let myDirectMessages = me.directMessages;
        // loop and place message in conversation ID
        for (var i = 0; myDirectMessages.length; i++) {
            if (myDirectMessages[i].user === receiverID) {
                // place in messages
                myDirectMessages[i].messages.push(message);
                break;
            }
        }
        
        // now them
        const them = await this.getUser(receiverID);
        let theirDirectMessages = them.directMessages;
        // loop and place message in conversation ID
        for (var i = 0; theirDirectMessages.length; i++) {
            if (theirDirectMessages[i].user === myID) {
                // place in messages
                theirDirectMessages[i].messages.push(message);
                break;
            }
        }

        // error checks

        // set
        await this.updateUser(myID, {directMessages: myDirectMessages});
        await this.updateUser(receiverID, {directMessages: theirDirectMessages});
        

    }

    async setOnSnapshotListener(collectionID, documentID) {
        const documentRef = firestore.collection(collectionID).doc(documentID);

        documentRef.onSnapshot( (document) => {
            return document.data();
        });
    }

    async removeSnapshotListener() {

    }

    async deleteConversation(receiverID) {

    }

    async addNotification() {

    }

    
}

export default Firestore;

