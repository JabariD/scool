/** Signs user IN with Email Password */

import { auth } from "../firebase.js";

export const signInWithEmailPassword = async(email, password) => {
    if (email === "" || password === "") return("Cannot have empty field.");


    try {
      await auth.signInWithEmailAndPassword(email, password);
      return "";
    } catch (e) {
      return e.message;
    }
  }