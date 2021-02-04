/** Sign up user with Google */

// Import 
import { firebase, auth } from "../firebase.js";

const googleProvider = new firebase.auth.GoogleAuthProvider();

export const signInWithGoogle = async() => {
  try {
    const result = await auth.signInWithPopup(googleProvider);
    console.log(result.user);
  } catch (e) {
    console.log(e.message);
  }
}