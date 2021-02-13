/** Sign up user with Google */

// Import 
import { firebase, auth } from "../firebase.js";

const googleProvider = new firebase.auth.GoogleAuthProvider();

export const signInWithGoogle = async() => {
  try {
    await auth.signInWithPopup(googleProvider);
    return "";
  } catch (e) {
    return e.message;
  }
}