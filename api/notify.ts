import { VercelRequest, VercelResponse } from '@vercel/node';
import * as admin from 'firebase-admin';
import webpush from 'web-push';

// ── Firebase Admin (only for reading presence/pushSub from Firestore) ────────
if (!admin.apps.length) {
  try {
    const sa = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT || '{}');
    if (sa.private_key) sa.private_key = sa.private_key.replace(/\\n/g, '\n');
    if (sa.project_id) admin.initializeApp({ credential: admin.credential.cert(sa) });
  } catch (e) {
    console.error('Firebase Admin init error:', e);
  }
}

const db = admin.firestore();

// ── Your own VAPID keys — no Google/FCM involved ─────────────────────────────
webpush.setVapidDetails(
  'mailto:himanshus6267@gmail.com',
  process.env.VAPID_PUBLIC_KEY  || 'BFVR8fvSQQA90qsnpl-z91RcbxIW2maK0udfbhGqFjR6vdXmJRBCdVOxOYj7utzYsZAA7t9zL79R0_EDElmIYgA',
  process.env.VAPID_PRIVATE_KEY || 'c96Wexn8xd5lK1LVyTsHt4yhmdOa19VYzDbASOgt_1Y'
);

// ── 12 Generic Novario promotional notification bodies ───────────────────────
const BODIES = [
  "🔴 Breaking Now — Live Coverage on Novario",
  "📡 Something Big Just Happened. Read it First.",
  "⚡ Novario Alert — Major Story Developing",
  "🌍 The World Just Changed. Novario Has the Story.",
  "📰 Today's Top Story is Waiting for You",
  "🔔 You're Missing a Big One — Open Novario",
  "⚠️ Developing Story — Stay Ahead with Novario",
  "📲 Fresh Headlines Just Dropped on Novario",
  "🕐 Don't Fall Behind — Latest News is Live",
  "🌐 Global Update Available — Open Novario Now",
  "📢 Novario Live — Something You Need to See",
  "⚡ New Stories Breaking — Tap to Stay Informed",
];

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { senderUid, room } = req.body;
  if (!senderUid || !room) return res.status(400).json({ error: 'Missing senderUid or room' });

  try {
    // Read all presence docs to find recipient's push subscription
    const presSnap = await db.collection(`ovii/${room}/presence`).get();

    const subscriptions: { uid: string; sub: webpush.PushSubscription }[] = [];

    presSnap.forEach(docSnap => {
      if (docSnap.id === senderUid) return; // skip sender
      const data = docSnap.data();
      if (!data.pushSub) return;
      try {
        const parsed = JSON.parse(data.pushSub);
        if (parsed.endpoint) {
          subscriptions.push({ uid: docSnap.id, sub: parsed });
        }
      } catch {
        // malformed subscription — ignore
      }
    });

    if (subscriptions.length === 0) {
      return res.status(200).json({ success: true, message: 'No recipients with push subscriptions' });
    }

    const body = BODIES[Math.floor(Math.random() * BODIES.length)];
    const payload = JSON.stringify({
      title: '📰 Novario',
      body,
      icon: '/favicon.svg',
      badge: '/favicon.svg',
      url: '/news',
      tag: 'novario-news',
      renotify: true,
    });

    let successCount = 0;
    for (const { uid, sub } of subscriptions) {
      try {
        await webpush.sendNotification(sub, payload, {
          urgency: 'high',
          TTL: 86400, // 24 hours
        });
        successCount++;
      } catch (err: any) {
        console.error(`Push failed for ${uid}:`, err.statusCode, err.message);
        // 404 or 410 = subscription expired/invalid — clean it up
        if (err.statusCode === 404 || err.statusCode === 410) {
          await db.collection(`ovii/${room}/presence`).doc(uid).update({
            pushSub: admin.firestore.FieldValue.delete(),
          }).catch(() => {});
        }
      }
    }

    return res.status(200).json({ success: true, attempted: subscriptions.length, succeeded: successCount });
  } catch (err: any) {
    console.error('notify handler error:', err);
    return res.status(500).json({ error: err.message });
  }
}
