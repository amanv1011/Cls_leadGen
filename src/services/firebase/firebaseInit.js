import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/database";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";
import { firebaseConfig } from "../../utils/config";

// initializing firebase
firebase.initializeApp(firebaseConfig);
const firestore = getFirestore();
export { firestore };
export default firebase;

//test function
const db = getDatabase();
console.log(db);
const checkDB = () => {
  if (db) {
    console.log("firebase connected");
  }
};
checkDB();
