import { initializeApp, getApps, cert } from "firebase-admin/app";
import { getFirestore, FieldValue } from "firebase-admin/firestore";

// Initialize Firebase Admin only once
if (!getApps().length) {
  initializeApp({
    credential: cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    }),
  });
}

const db = getFirestore();

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { docId, room = "ovii-room", allowSharing = false, scheduleMinutes = 30 } = req.body;
    if (!docId) return res.status(400).json({ error: "docId is required" });

    // Fetch as plain text using Google Docs export URL
    const exportUrl = `https://docs.google.com/document/d/${docId}/export?format=txt`;
    const response = await fetch(exportUrl);
    if (!response.ok) {
      return res.status(400).json({ error: "Failed to fetch Google Doc. Make sure it is shared publicly." });
    }

    const text = await response.text();

    const scheduledFor = Date.now() + scheduleMinutes * 60 * 1000;

    await db.doc(`ovii/${room}/elevone-memory/context`).set({
      text,
      status: scheduleMinutes > 0 ? "scheduled" : "active",
      allowSharing,
      scheduledFor,
      gdocId: docId,
      updatedAt: FieldValue.serverTimestamp(),
    }, { merge: true });

    return res.status(200).json({ success: true, chars: text.length });
  } catch (error: any) {
    console.error("injectGdoc Error:", error);
    return res.status(500).json({ error: error.message });
  }
}
