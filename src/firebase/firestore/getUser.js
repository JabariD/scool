import { firestore } from '../firebase.js';

export async function getUser(userID) {

    try {
        const userToGet = firestore.collection("users").doc(userID);
        return await userToGet.get();
    } catch(e) {
        console.log(e);
    }
}