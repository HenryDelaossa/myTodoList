import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCna937O9KWKZMgs2VFXROzDbjjvmV_xVc",
    authDomain: "tolo-list-2a317.firebaseapp.com",
    databaseURL: "https://tolo-list-2a317-default-rtdb.firebaseio.com",
    projectId: "tolo-list-2a317",
    storageBucket: "tolo-list-2a317.appspot.com",
    messagingSenderId: "915326722009",
    appId: "1:915326722009:web:0f72af6863d9b4843303c8"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app)
export const auth = getAuth()