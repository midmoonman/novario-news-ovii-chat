import { VercelRequest, VercelResponse } from '@vercel/node';
import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getFirestore, FieldValue } from 'firebase-admin/firestore';
import webpush from 'web-push';

// ── Firebase Admin — only used to READ presence/pushSub from Firestore ───────
if (!getApps().length) {
  try {
    const raw = process.env.FIREBASE_SERVICE_ACCOUNT || '{}';
    const sa = JSON.parse(raw);
    if (sa.private_key) sa.private_key = sa.private_key.replace(/\\n/g, '\n');
    if (sa.project_id) {
      initializeApp({ credential: cert(sa) });
    }
  } catch (e) {
    console.error('Firebase Admin init error:', e);
  }
}

const db = getFirestore();

// ── Your own VAPID keys — hardcoded as fallback if env vars missing ───────────
const VAPID_PUBLIC  = process.env.VAPID_PUBLIC_KEY  || 'BFVR8fvSQQA90qsnpl-z91RcbxIW2maK0udfbhGqFjR6vdXmJRBCdVOxOYj7utzYsZAA7t9zL79R0_EDElmIYgA';
const VAPID_PRIVATE = process.env.VAPID_PRIVATE_KEY || 'c96Wexn8xd5lK1LVyTsHt4yhmdOa19VYzDbASOgt_1Y';
const VAPID_EMAIL   = 'mailto:himanshus6267@gmail.com';

webpush.setVapidDetails(VAPID_EMAIL, VAPID_PUBLIC, VAPID_PRIVATE);

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

  const { senderUid, room, isTest } = req.body;
  if (!senderUid || !room) return res.status(400).json({ error: 'Missing senderUid or room' });

  try {
    console.log(`Notify request from ${senderUid} in room ${room}${isTest ? ' (TEST MODE)' : ''}`);
    // Read from permanent 'subscriptions' collection (presence is wiped when closed)
    const subSnap = await db.collection(`ovii/${room}/subscriptions`).get();

    const subscriptions: { uid: string; sub: webpush.PushSubscription }[] = [];
    subSnap.forEach(docSnap => {
      if (docSnap.id === senderUid && !isTest) return; // skip sender unless it's a test
      const data = docSnap.data();
      if (!data.pushSub) return;
      try {
        const parsed = typeof data.pushSub === 'string' ? JSON.parse(data.pushSub) : data.pushSub;
        if (parsed.endpoint) subscriptions.push({ uid: docSnap.id, sub: parsed });
      } catch { /* malformed — skip */ }
    });

    if (subscriptions.length === 0) {
      console.log('No subscriptions found in room:', room);
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

    console.log(`Attempting to send push to ${subscriptions.length} subscribers`);

    let successCount = 0;
    const errors: string[] = [];

    for (const { uid, sub } of subscriptions) {
      try {
        await webpush.sendNotification(sub, payload, {
          urgency: 'high',
          TTL: 86400,
        });
        successCount++;
        console.log(`Push sent to ${uid}`);
      } catch (err: any) {
        console.error(`Push failed for ${uid}:`, err.statusCode, err.message);
        errors.push(`${uid}: ${err.statusCode} - ${err.message}`);
        if (err.statusCode === 404 || err.statusCode === 410) {
          // Subscription expired — clean up from permanent storage
          await db.collection(`ovii/${room}/subscriptions`).doc(uid)
            .delete()
            .catch(() => {});
        }
      }
    }

    return res.status(200).json({ 
      success: true, 
      attempted: subscriptions.length, 
      succeeded: successCount,
      errors: errors.length > 0 ? errors : undefined
    });
  } catch (err: any) {
    console.error('notify error:', err);
    return res.status(500).json({ error: err.message });
  }
}
