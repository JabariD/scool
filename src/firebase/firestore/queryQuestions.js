import { firestore } from '../firebase.js';

export async function queryQuestions(questionID) {

    try {
        const questionsRef = firestore.collection(questionID);
        return await questionsRef.get();
    } catch(e) {
        console.log(e);
    }
}