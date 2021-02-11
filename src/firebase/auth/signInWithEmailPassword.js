/** Signs user up with Email Password */

import { auth } from "../firebase.js";

export const signInWithEmailPassword = async(email, password) => {
    console.log(email, password);
    if (email === "" || password === "") return("Cannot have empty field.");


    try {
      const userCredential = await auth.createUserWithEmailAndPassword(email, password);
      console.log(userCredential.user);
      return true;
    } catch (e) {

      return e.message;
    }
  }