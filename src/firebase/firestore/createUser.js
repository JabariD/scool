import { firestore } from '../firebase.js';

export async function createUser(userID) {

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
            collegeID: -1,
        });
        console.log("Document successfully updated!");

    } catch(e) {
        console.log(e);
    }
}