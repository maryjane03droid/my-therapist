import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
apiKey: "AIzaSyAY1cXfxvEH9hKpA28WaQO2NzaqTZ4mF0g",
  authDomain: "my-therapist-bb8fa.firebaseapp.com",
  projectId: "my-therapist-bb8fa",
  storageBucket: "my-therapist-bb8fa.firebasestorage.app",
  messagingSenderId: "466706329299",
  appId: "1:466706329299:web:4971469d7b6843619dae26",
  measurementId: "G-DHYZ2C65X8"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getDatabase(app);

export default app;