// Import 
import { firebase, auth } from "../firebase.js";

class Authenticate {
    static user = firebase.auth().currentUser;

    async signInWithEmailPassword(email, password) {
        if (email === "" || password === "") return("Cannot have empty field.");

        try {
            await auth.signInWithEmailAndPassword(email, password);
            return "";
        } catch (e) {
            return e.message;
        }
    }

    async signInWithGoogle() {
        const googleProvider = new firebase.auth.GoogleAuthProvider();

        try {
            await auth.signInWithPopup(googleProvider);
            return "";
        } catch (e) {
            return e.message;
        }
    }

    async signOut() {
        try {
            await auth.signOut();
            this.user = null;
            console.log("Signed user out!");
        } catch (e) {
            console.log(e.message);
        }
    }

    async signUpWithEmailPassword(email, password) {
        if (email === "" || password === "") return("Cannot have empty field.");
        if (password.length < 8) return ("Password must be longer than 6 characters.");


        try {
            await auth.createUserWithEmailAndPassword(email, password);
            return "";
        } catch (e) {
            return e.message;
        }
    }
}

export default Authenticate;