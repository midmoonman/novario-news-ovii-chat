// src/lib/firebase.ts

- import { getAuth } from "firebase/auth";
+ import { getAuth, signInAnonymously, onAuthStateChanged, type User } from "firebase/auth";

// ...existing exports unchanged...

+ export function ensureAnonAuth(): Promise<User> {
+   return new Promise((resolve, reject) => {
+     const current = auth.currentUser;
+     if (current) { resolve(current); return; }
+     const unsubscribe = onAuthStateChanged(auth, async (user) => {
+       unsubscribe();
+       if (user) {
+         resolve(user);
+       } else {
+         try {
+           const credential = await signInAnonymously(auth);
+           resolve(credential.user);
+         } catch (err) { reject(err); }
+       }
+     }, reject);
+   });
+ }
