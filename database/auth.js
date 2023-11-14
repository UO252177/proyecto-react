import { auth } from "./firebase";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
} from "@firebase/auth";
 
export const signup = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    //await emailVerification();
    const user = userCredential.user;
    return user;
  } catch (error) {
    throw error;
  }
};
 
export const emailVerification = async () => {
  const user = auth.currentUser;
  try {
    await sendEmailVerification(auth.currentUser, {
      handleCodeInApp: true,
      url: "",
    }).then(() => {
      alert("Email verificado");
    });
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log("Email verification error: ", errorCode, errorMessage);
    throw error;
  }
};
 
export const login = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    return user;
  } catch (error) {
    throw error;
  }
};