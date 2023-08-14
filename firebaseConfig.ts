import { initializeApp } from "firebase/app";

// Optionally import the services that you want to use
import { getAuth } from "firebase/auth";
// import {...} from "firebase/database";
import { getFirestore } from "firebase/firestore";
// import {...} from "firebase/functions";
import { getStorage } from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBST_EnrBupKK3J4-3X4elyYSzOF6vULAU",
  authDomain: "react-native-starter-b25f0.firebaseapp.com",
  projectId: "react-native-starter-b25f0",
  storageBucket: "react-native-starter-b25f0.appspot.com",
  messagingSenderId: "161664923574",
  appId: "1:161664923574:web:210815474218a1a29b3317",
  measurementId: "G-E117Z6LGZQ",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase

// ios client id : 507961954303-ea0c1iqpvsf0k7cduqga984jnkc9p8dn.apps.googleusercontent.com
// android client id : 507961954303-tn6p2ql3k8dmv6810bh26hf8n97e0hok.apps.googleusercontent.com
