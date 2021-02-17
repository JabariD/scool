import { firestore } from '../firebase.js';

export async function updateUser(userID) {

    try {
        const userToUpdate = firestore.collection("users").doc(userID);
        await userToUpdate.update({
            lastLoggedIn: new Date(),
        });
        console.log("Document successfully updated!");

    } catch(e) {
        console.log(e);
    }
}