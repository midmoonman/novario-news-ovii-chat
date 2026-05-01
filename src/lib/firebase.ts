import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, signInAnonymously } from "firebase/auth";
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

export const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export async function ensureAnonAuth() {
  if (auth.currentUser) return auth.currentUser;
  const cred = await signInAnonymously(auth);
  return cred.user;
}
