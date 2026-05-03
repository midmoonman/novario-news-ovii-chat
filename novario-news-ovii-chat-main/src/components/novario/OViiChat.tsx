import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  collection, addDoc, onSnapshot, orderBy, query, serverTimestamp,
  deleteDoc, doc, Timestamp, setDoc, getDocs, where,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { auth, db, storage, ensureAnonAuth } from "@/lib/firebase";

type Msg = {
  id: string;
  uid: string;
  avatar: string;
  type: "text" | "image" | "voice";
  content: string;
  createdAt?: Timestamp;
};

const ROOM = "ovii-room";
const AVATARS = ["🦊", "🐱", "🐼", "🐺", "🦝", "🐯", "🦁", "🐧", "🐰", "🐨"];
function pickAvatar() { return AVATARS[Math.floor(Math.random() * AVATARS.length)]; }

export function OViiChat({ onLock }: { onLock: () => void }) {
  const [uid, setUid] = useState<string | null>(null);
  const [avatar] = useState(pickAvatar);
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [text, setText] = useState("");
  const [recording, setRecording] = useState(false);
  const [error, setError] = useState("");
  const [count, setCount] = useState(0);
  const recRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const fileRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const lastActivity = useRef<number>(Date.now());

  // Auth + presence (max 2 users)
  useEffect(() => {
    let unsubMsgs = () => {};
    let alive = true;
    (async () => {
      try {
        const u = await ensureAnonAuth();
        if (!alive) return;

        // presence cleanup: remove stale (>90s) presence docs
        const presCol = collection(db, "ovii", ROOM, "presence");
        const snap = await getDocs(presCol);
        const now = Date.now();
        for (const d of snap.docs) {
          const ts = (d.data().lastSeen as Timestamp | undefined)?.toMillis() ?? 0;
          if (now - ts > 90_000 && d.id !== u.uid) {
            await deleteDoc(d.ref).catch(() => {});
          }
        }
        const fresh = await getDocs(presCol);
        const others = fresh.docs.filter((d) => d.id !== u.uid).length;
        if (others >= 2 - 0 && fresh.docs.length >= 2 && !fresh.docs.find((d) => d.id === u.uid)) {
          setError("Room is full (2/2). Try again later.");
          return;
        }

        await setDoc(doc(db, "ovii", ROOM, "presence", u.uid), {
          uid: u.uid, avatar, lastSeen: serverTimestamp(),
        });
        setUid(u.uid);
        setCount(Math.min(2, fresh.docs.length + (fresh.docs.find((d) => d.id === u.uid) ? 0 : 1)));

        // heartbeat
        const hb = setInterval(() => {
          setDoc(doc(db, "ovii", ROOM, "presence", u.uid), {
            uid: u.uid, avatar, lastSeen: serverTimestamp(),
          }, { merge: true }).catch(() => {});
        }, 20_000);

        // messages stream
        const q = query(collection(db, "ovii", ROOM, "messages"), orderBy("createdAt", "asc"));
        unsubMsgs = onSnapshot(q, (s) => {
          const list: Msg[] = s.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<Msg, "id">) }));
          setMsgs(list);
          // auto-delete after 60s
          const cutoff = Date.now() - 60_000;
          for (const m of list) {
            const t = m.createdAt?.toMillis?.() ?? 0;
            if (t && t < cutoff) deleteDoc(doc(db, "ovii", ROOM, "messages", m.id)).catch(() => {});
          }
        });

        return () => { clearInterval(hb); deleteDoc(doc(db, "ovii", ROOM, "presence", u.uid)).catch(() => {}); };
      } catch (e: unknown) {
        const msg = e instanceof Error ? e.message : "Connection failed";
        setError(msg);
      }
    })();
    return () => { alive = false; unsubMsgs(); };
  }, [avatar]);

  // Inactivity lock (3 min)
  useEffect(() => {
    const bump = () => { lastActivity.current = Date.now(); };
    window.addEventListener("pointerdown", bump);
    window.addEventListener("keydown", bump);
    const t = setInterval(() => {
      if (Date.now() - lastActivity.current > 180_000) onLock();
    }, 5_000);
    return () => {
      window.removeEventListener("pointerdown", bump);
      window.removeEventListener("keydown", bump);
      clearInterval(t);
    };
  }, [onLock]);

  // tick to refresh countdowns
  useEffect(() => {
    const t = setInterval(() => setMsgs((m) => [...m]), 1000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [msgs.length]);

  const send = async (type: Msg["type"], content: string) => {
    if (!uid || !content) return;
    lastActivity.current = Date.now();
    await addDoc(collection(db, "ovii", ROOM, "messages"), {
      uid, avatar, type, content, createdAt: serverTimestamp(),
    });
  };

  const onText = async (e: React.FormEvent) => {
    e.preventDefault();
    const v = text.trim();
    if (!v) return;
    setText("");
    await send("text", v.slice(0, 1000));
  };

  const onImage = async (file: File) => {
    if (!uid) return;
    if (file.size > 4 * 1024 * 1024) { setError("Image too large (max 4MB)"); return; }
    const path = `ovii/${ROOM}/${Date.now()}-${file.name}`;
    const r = ref(storage, path);
    await uploadBytes(r, file);
    const url = await getDownloadURL(r);
    await send("image", url);
  };

  const startRec = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const rec = new MediaRecorder(stream);
      chunksRef.current = [];
      rec.ondataavailable = (e) => chunksRef.current.push(e.data);
      rec.onstop = async () => {
        const blob = new Blob(chunksRef.current, { type: "audio/webm" });
        stream.getTracks().forEach((t) => t.stop());
        const path = `ovii/${ROOM}/voice-${Date.now()}.webm`;
        const r = ref(storage, path);
        await uploadBytes(r, blob);
        const url = await getDownloadURL(r);
        await send("voice", url);
      };
      recRef.current = rec;
      rec.start();
      setRecording(true);
    } catch {
      setError("Microphone permission denied");
    }
  };

  const stopRec = () => {
    recRef.current?.stop();
    setRecording(false);
  };

  const remaining = (m: Msg) => {
    const t = m.createdAt?.toMillis?.() ?? Date.now();
    return Math.max(0, Math.ceil((t + 60_000 - Date.now()) / 1000));
  };

  return (
    <div className="fixed inset-0 z-40 flex flex-col bg-background">
      <header className="border-b border-border px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-full gradient-gold flex items-center justify-center text-lg">{avatar}</div>
          <div>
            <div className="serif font-bold">OVii</div>
            <div className="text-[10px] text-muted-foreground uppercase tracking-widest flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse-dot" />
              {count}/2 online · ephemeral · 60s
            </div>
          </div>
        </div>
        <button onClick={onLock} className="text-xs text-muted-foreground hover:text-primary">Lock</button>
      </header>

      <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
        {error && <div className="text-xs text-destructive bg-destructive/10 border border-destructive/30 rounded-md p-3">{error}</div>}
        {!error && msgs.length === 0 && (
          <div className="h-full flex items-center justify-center text-center text-muted-foreground text-sm">
            <div>
              <div className="text-4xl mb-2">👋</div>
              No messages yet. Say something — it'll vanish in 60s.
            </div>
          </div>
        )}
        <AnimatePresence>
          {msgs.map((m) => {
            const mine = m.uid === uid;
            return (
              <motion.div
                key={m.id}
                initial={{ opacity: 0, y: 8, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.25 }}
                className={`flex gap-2 ${mine ? "justify-end" : "justify-start"}`}
              >
                {!mine && <div className="h-7 w-7 rounded-full bg-muted flex items-center justify-center text-sm shrink-0">{m.avatar}</div>}
                <div className={`max-w-[75%] ${mine ? "items-end" : "items-start"} flex flex-col gap-1`}>
                  <div className={`rounded-2xl px-3 py-2 text-sm break-words ${mine ? "bg-primary text-primary-foreground rounded-br-sm" : "bg-card border border-border rounded-bl-sm"}`}>
                    {m.type === "text" && <span>{m.content}</span>}
                    {m.type === "image" && <img src={m.content} alt="" className="rounded-lg max-w-[240px]" />}
                    {m.type === "voice" && <audio controls src={m.content} className="max-w-[220px]" />}
                  </div>
                  <div className="text-[9px] text-muted-foreground/70">vanishes in {remaining(m)}s</div>
                </div>
                {mine && <div className="h-7 w-7 rounded-full bg-muted flex items-center justify-center text-sm shrink-0">{m.avatar}</div>}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      <form onSubmit={onText} className="border-t border-border p-3 flex items-center gap-2">
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => { const f = e.target.files?.[0]; if (f) onImage(f); e.target.value = ""; }}
        />
        <button type="button" onClick={() => fileRef.current?.click()} className="h-10 w-10 rounded-full bg-muted hover:bg-accent flex items-center justify-center" aria-label="Attach image">
          📷
        </button>
        <button
          type="button"
          onPointerDown={startRec}
          onPointerUp={stopRec}
          onPointerLeave={() => recording && stopRec()}
          className={`h-10 w-10 rounded-full flex items-center justify-center ${recording ? "bg-destructive text-destructive-foreground animate-pulse-dot" : "bg-muted hover:bg-accent"}`}
          aria-label="Hold to record"
        >
          🎙️
        </button>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={uid ? "Message…" : "Connecting…"}
          disabled={!uid || !!error}
          className="flex-1 rounded-full bg-muted px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
        />
        <button type="submit" disabled={!text.trim()} className="h-10 px-4 rounded-full bg-primary text-primary-foreground text-sm font-bold disabled:opacity-40">
          Send
        </button>
      </form>
    </div>
  );
}
