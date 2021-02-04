/** Sign up user with Google */

// Import 
import { auth } from "../firebase.js";

export const signOut = async() => {
  try {
    await auth.signOut();
    console.log("Signed user out!");
  } catch (e) {
    console.log(e.message);
  }
}