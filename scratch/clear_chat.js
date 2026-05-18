import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDITTDkAnnltIZA1EZAKxY4A7KBUbAqqpM",
  authDomain: "zulad-89115.firebaseapp.com",
  projectId: "zulad-89115",
  storageBucket: "zulad-89115.firebasestorage.app",
  messagingSenderId: "389509460096",
  appId: "1:389509460096:web:cfe55f4ebded136bbf7665",
  measurementId: "G-LMN9LKP9WG",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const ROOM = "ovii-room";

async function purgeChat() {
  console.log("Starting full chat purge (including pinned messages)...");

  // 1. Fetch all messages in the room
  const msgsRef = collection(db, "ovii", ROOM, "messages");
  const snapshot = await getDocs(msgsRef);
  
  console.log(`Found ${snapshot.docs.length} messages to delete.`);

  // Delete all messages in parallel
  const deletePromises = snapshot.docs.map((docSnap) => {
    console.log(`Deleting message: ${docSnap.id}`);
    return deleteDoc(doc(db, "ovii", ROOM, "messages", docSnap.id));
  });

  await Promise.all(deletePromises);
  console.log("All messages deleted successfully.");

  // 2. Clear global pins
  const pinsRef = doc(db, "ovii", ROOM, "pins", "global");
  try {
    await updateDoc(pinsRef, { ids: [] });
    console.log("Global pins cleared successfully.");
  } catch (err) {
    console.log("Could not update pins doc, setting new empty document...");
    try {
      await deleteDoc(pinsRef);
      console.log("Global pins document deleted.");
    } catch (e) {
      console.log("No pins document to delete.");
    }
  }

  console.log("Full chat purge completed successfully!");
  process.exit(0);
}

purgeChat().catch((err) => {
  console.error("Purge failed:", err);
  process.exit(1);
});
