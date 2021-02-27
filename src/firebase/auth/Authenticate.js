// Import 
import { firebase, auth } from "../firebase.js";

class Authenticate {
    static user = null;

    async IsLoggedIn() {
        try {
          await new Promise((resolve, reject) =>
            firebase.auth().onAuthStateChanged(
              user => {
                if (user) {
                  // User is signed in.
                  Authenticate.user = user;
                  resolve(user)
                } else {
                  // No user is signed in.
                  reject('no user logged in')
                }
              },
              // Prevent console error
              error => reject(error)
            )
          )
          return true
        } catch (error) {
          return false
        }
      }

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