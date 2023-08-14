import { GoogleAuthProvider, signInWithRedirect } from "firebase/auth";
import { auth } from "../../firebaseConfig";

export const signInWithGoogle = async () => {
  try {
    const provider = new GoogleAuthProvider();
    const userCredential = await signInWithRedirect(auth, provider);
    console.log(userCredential);

    // await saveUser(userCredential);
  } catch (error: any) {
    //   toastError(error.message);
    console.log(error.message);
  }
};
