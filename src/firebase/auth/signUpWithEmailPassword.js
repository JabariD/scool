/** Signs user UP with Email Password */

import { auth } from "../firebase.js";

export const signUpWithEmailPassword = async(email, password) => {
    if (email === "" || password === "") return("Cannot have empty field.");
    if (password.length < 8) return ("Password must be longer than 6 characters.");


    try {
      await auth.createUserWithEmailAndPassword(email, password);
      return "";
    } catch (e) {
      return e.message;
    }
  }