import firebase from "firebase/compat/app";
import "firebase/compat/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCOof95awYRY2PrDP8H8B027jJXkR32tXY",
  authDomain: "x-manibus.firebaseapp.com",
  projectId: "x-manibus",
  storageBucket: "x-manibus.appspot.com",
  messagingSenderId: "693248919281",
  appId: "1:693248919281:web:3617e69253c59497604b50",
  measurementId: "G-DXXHGH5364",
  databaseURL: "https://x-manibus-default-rtdb.firebaseio.com",
};


const app = firebase.initializeApp(firebaseConfig);

export const auth = app.auth();
export default app;
