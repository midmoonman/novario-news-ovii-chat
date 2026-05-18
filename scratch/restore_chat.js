import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, deleteDoc, doc, setDoc } from "firebase/firestore";

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

async function restoreChat() {
  console.log("Starting full chat restore from the 35-day backup collection...");

  // 1. Fetch all backups
  const backupsRef = collection(db, "ovii", ROOM, "backups");
  const snapshot = await getDocs(backupsRef);

  console.log(`Found ${snapshot.docs.length} backed-up messages to restore.`);

  if (snapshot.docs.length === 0) {
    console.log("No backup records found to restore!");
    process.exit(0);
  }

  // 2. Restore each message to active collection
  const restorePromises = snapshot.docs.map((docSnap) => {
    const data = docSnap.data();
    if (!data.originalMessage) {
      console.log(`Skipping invalid backup document: ${docSnap.id}`);
      return Promise.resolve();
    }
    const targetRef = doc(db, "ovii", ROOM, "messages", data.id);
    console.log(`Restoring message: ${data.id}`);
    return setDoc(targetRef, data.originalMessage);
  });

  await Promise.all(restorePromises);
  console.log("All active messages restored successfully.");

  // 3. Keep backups intact (so they can be restored again or auto-expire at 35 days)
  console.log("Restoration complete! Backup collection remains intact for the rest of its 35-day lifecycle.");
  process.exit(0);
}

restoreChat().catch((err) => {
  console.error("Restoration failed:", err);
  process.exit(1);
});
