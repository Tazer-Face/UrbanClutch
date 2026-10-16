import { initializeApp } from "firebase/app";
import { getAuth,setPersistence,
  browserSessionPersistence } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDAXA2hPcuEma8HxxgimYPA1P_GQ91P5Q8",
  authDomain: "urbanclutch-42b38.firebaseapp.com",
  projectId: "urbanclutch-42b38",
  storageBucket: "urbanclutch-42b38.firebasestorage.app",
  messagingSenderId: "687889076370",
  appId: "1:687889076370:web:386afbf59660956f09164b",
  measurementId: "G-0HRJYYVDKZ"
};


const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)

export const authSession = setPersistence(auth,browserSessionPersistence)