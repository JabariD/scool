/** Signs user UP with Email Password */

import { auth } from "../firebase.js";

export const signUpWithEmailPassword = async(email, password) => {
    if (email === "" || password === "") return("Cannot have empty field.");
    if (password.length < 6) return ("Password must be longer than 6 characters.");


    try {
      const userCredential = await auth.createUserWithEmailAndPassword(email, password);
      console.log(userCredential.user);
      return "";
    } catch (e) {
      return e.message;
    }
  }