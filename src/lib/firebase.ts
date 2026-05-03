import { initializeApp } from "firebase/app";
import { getAuth, signInAnonymously, onAuthStateChanged, type User } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDITTDkAnnltIZA1EZAKxY4A7KBUbAqqpM",
  authDomain: "zulad-89115.firebaseapp.com",
  projectId: "zulad-89115",
  storageBucket: "zulad-89115.firebasestorage.app",
  messagingSenderId: "389509460096",
  appId: "1:389509460096:web:cfe55f4ebded136bbf7665",
  measurementId: "G-LMN9LKP9WG",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export function ensureAnonAuth(): Promise<User> {
  return new Promise((resolve, reject) => {
    const current = auth.currentUser;
    if (current) { resolve(current); return; }
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      unsubscribe();
      if (user) {
        resolve(user);
      } else {
        try {
          const credential = await signInAnonymously(auth);
          resolve(credential.user);
        } catch (err) { reject(err); }
      }
    }, reject);
  });
}
