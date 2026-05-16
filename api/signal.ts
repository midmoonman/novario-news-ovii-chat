import { VercelRequest, VercelResponse } from '@vercel/node';
import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

if (!getApps().length) {
  try {
    const raw = process.env.FIREBASE_SERVICE_ACCOUNT || '{}';
    const sa = JSON.parse(raw);
    if (sa.private_key) sa.private_key = sa.private_key.replace(/\\n/g, '\n');
    if (sa.project_id) {
      initializeApp({ credential: cert(sa) });
    }
  } catch (e) {}
}

const db = getFirestore();

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { deviceId } = req.query;
  if (!deviceId) return res.status(400).send('Missing deviceId');

  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Send initial connected event
  res.write('data: {"type": "connected"}\n\n');

  // Keep-alive
  const keepAlive = setInterval(() => {
    res.write(': keep-alive\n\n');
  }, 10000);

  // Listen for signals in Firestore
  // We'll watch a 'signals' collection for this device
  const unsub = db.collection('ovii-signals').doc(deviceId as string)
    .onSnapshot((doc) => {
      const data = doc.data();
      if (data && data.timestamp) {
        res.write(`data: ${JSON.stringify({ type: 'notification', ...data })}\n\n`);
      }
    }, (err) => {
      console.error('Signal watch error:', err);
    });

  // Max duration to avoid Vercel hard timeout (300s limit)
  const timeoutId = setTimeout(() => {
    clearInterval(keepAlive);
    unsub();
    if (!res.writableEnded) {
      res.write('data: {"type": "reconnect"}\n\n');
      res.end();
    }
  }, 250000); // 250s

  req.on('close', () => {
    clearInterval(keepAlive);
    clearTimeout(timeoutId);
    unsub();
    res.end();
  });
}
