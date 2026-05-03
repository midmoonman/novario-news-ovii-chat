import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
} from "react";
import {
  collection,
  addDoc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  doc,
  setDoc,
  getDoc,
  deleteDoc,
  updateDoc,
  getDocs,
  where,
} from "firebase/firestore";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { signInAnonymously, onAuthStateChanged } from "firebase/auth";
import { auth, db, storage } from "@/lib/firebase";
import { encryptMessage, decryptMessage } from "@/lib/crypto";
import { AVATARS, getRandomAvatar } from "@/lib/avatars";

// ─── Types ────────────────────────────────────────────────────────────────────

type MessageType = "text" | "image" | "voice";

interface Reaction {
  emoji: string;
  userId: string;
}

interface OviiMessage {
  id: string;
  type: MessageType;
  content: string; // encrypted text, or storage URL for media
  senderId: string;
  senderAvatar: string;
  timestamp: number;
  selfDestructAt?: number; // unix ms
  destructTimer: number; // seconds
  reactions: Reaction[];
  readBy: string[];
  isRead: boolean;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const PIN = "111921";
const INACTIVITY_MS = 3 * 60 * 1000;
const DESTRUCT_OPTIONS = [
  { label: "30s", value: 30 },
  { label: "1m", value: 60 },
  { label: "5m", value: 300 },
  { label: "10m", value: 600 },
  { label: "45s (default)", value: 45 },
];
const EMOJI_LIST = ["❤️", "😂", "😮", "😢", "👍", "🔥"];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatTime(ms: number) {
  const d = new Date(ms);
  return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function fmtDuration(secs: number) {
  const m = Math.floor(secs / 60);
  const s = secs % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

// ─── Components ───────────────────────────────────────────────────────────────

// PIN Modal
function PinModal({
  onUnlock,
  showForgot,
}: {
  onUnlock: () => void;
  showForgot: boolean;
}) {
  const [input, setInput] = useState("");
  const [shake, setShake] = useState(false);
  const [forgot, setForgot] = useState(false);

  const handleSubmit = () => {
    if (input === PIN) {
      onUnlock();
    } else {
      setShake(true);
      setInput("");
      setTimeout(() => setShake(false), 500);
    }
  };

  return (
    <div className="ovii-pin-overlay">
      <div className={`ovii-pin-card ${shake ? "shake" : ""}`}>
        <div className="ovii-pin-logo">
          <span className="ovii-logo-text">ovii</span>
          <span className="ovii-logo-dot">●</span>
        </div>
        <p className="ovii-pin-subtitle">Enter PIN to continue</p>
        <div className="ovii-pin-dots">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className={`ovii-pin-dot ${input.length > i ? "filled" : ""}`}
            />
          ))}
        </div>
        <div className="ovii-pin-pad">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, "", 0, "⌫"].map((k, i) => (
            <button
              key={i}
              className={`ovii-pin-key ${k === "" ? "empty" : ""}`}
              onClick={() => {
                if (k === "⌫") setInput((p) => p.slice(0, -1));
                else if (k !== "" && input.length < 6)
                  setInput((p) => p + k);
              }}
            >
              {k}
            </button>
          ))}
        </div>
        <button className="ovii-pin-enter" onClick={handleSubmit}>
          Unlock →
        </button>
        {showForgot && (
          <button
            className="ovii-pin-forgot"
            onClick={() => setForgot(!forgot)}
          >
            Forgot PIN?
          </button>
        )}
        {forgot && (
          <div className="ovii-pin-hint">
            <span className="hindi-tear">आँसू</span>
            <span className="hindi-alpha">अ आ इ ई उ ऊ</span>
          </div>
        )}
      </div>
    </div>
  );
}

// Avatar Picker
function AvatarPicker({
  current,
  onSelect,
  onClose,
}: {
  current: string;
  onSelect: (id: string) => void;
  onClose: () => void;
}) {
  return (
    <div className="ovii-avatar-modal">
      <div className="ovii-avatar-modal-card">
        <h3>Choose Your Avatar</h3>
        <p>Your identity in this chat</p>
        <div className="ovii-avatar-grid">
          {AVATARS.map((av) => (
            <button
              key={av.id}
              className={`ovii-avatar-option ${current === av.id ? "selected" : ""}`}
              onClick={() => {
                onSelect(av.id);
                onClose();
              }}
              style={{ "--av-color": av.color } as React.CSSProperties}
            >
              <img src={av.url} alt={av.name} />
              <span>{av.name}</span>
            </button>
          ))}
        </div>
        <button className="ovii-avatar-close" onClick={onClose}>
          ✕ Close
        </button>
      </div>
    </div>
  );
}

// Typing Indicator
function TypingIndicator({ avatarUrl }: { avatarUrl?: string }) {
  return (
    <div className="ovii-typing-row">
      {avatarUrl && (
        <img className="ovii-typing-avatar" src={avatarUrl} alt="" />
      )}
      <div className="ovii-typing-bubble">
        <span className="typing-dot" />
        <span className="typing-dot" />
        <span className="typing-dot" />
      </div>
    </div>
  );
}

// Voice Note Player
function VoiceNotePlayer({ url, isMine }: { url: string; isMine: boolean }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onLoaded = () => setDuration(audio.duration || 0);
    const onTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
      setProgress((audio.currentTime / (audio.duration || 1)) * 100);
    };
    const onEnded = () => setPlaying(false);
    audio.addEventListener("loadedmetadata", onLoaded);
    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("ended", onEnded);
    return () => {
      audio.removeEventListener("loadedmetadata", onLoaded);
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("ended", onEnded);
    };
  }, []);

  const toggle = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      await audio.play();
      setPlaying(true);
    }
  };

  const handleScrub = (e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current;
    if (!audio) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    audio.currentTime = ratio * audio.duration;
  };

  return (
    <div className={`ovii-voice-player ${isMine ? "mine" : "theirs"}`}>
      <audio ref={audioRef} src={url} preload="metadata" />
      <button className="ovii-voice-btn" onClick={toggle}>
        {playing ? (
          <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
            <rect x="6" y="4" width="4" height="16" rx="1" />
            <rect x="14" y="4" width="4" height="16" rx="1" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
            <polygon points="5,3 19,12 5,21" />
          </svg>
        )}
      </button>
      <div className="ovii-voice-waveform" onClick={handleScrub}>
        <div className="ovii-voice-bars">
          {Array.from({ length: 28 }, (_, i) => (
            <div
              key={i}
              className={`ovii-voice-bar ${(i / 28) * 100 < progress ? "played" : ""}`}
              style={{ height: `${20 + Math.sin(i * 0.8) * 12 + Math.sin(i * 1.5) * 8}px` }}
            />
          ))}
        </div>
      </div>
      <span className="ovii-voice-time">
        {playing ? fmtDuration(Math.floor(currentTime)) : fmtDuration(Math.floor(duration))}
      </span>
    </div>
  );
}

// Message Bubble
function MessageBubble({
  msg,
  isMine,
  roomId,
  onReact,
  onRead,
}: {
  msg: OviiMessage;
  isMine: boolean;
  roomId: string;
  onReact: (msgId: string, emoji: string) => void;
  onRead: (msgId: string) => void;
}) {
  const [decrypted, setDecrypted] = useState<string>("");
  const [showReactions, setShowReactions] = useState(false);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const bubbleRef = useRef<HTMLDivElement>(null);

  // Decrypt text
  useEffect(() => {
    if (msg.type === "text") {
      decryptMessage(msg.content, roomId).then(setDecrypted);
    }
  }, [msg.content, msg.type, roomId]);

  // Read receipt
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isMine) {
          onRead(msg.id);
        }
      },
      { threshold: 0.5 }
    );
    if (bubbleRef.current) observer.observe(bubbleRef.current);
    return () => observer.disconnect();
  }, [isMine, msg.id, onRead]);

  // Self-destruct countdown
  useEffect(() => {
    if (!msg.selfDestructAt) return;
    const tick = () => {
      const left = Math.max(0, Math.floor((msg.selfDestructAt! - Date.now()) / 1000));
      setTimeLeft(left);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [msg.selfDestructAt]);

  const avatar = AVATARS.find((a) => a.id === msg.senderAvatar);

  return (
    <div
      ref={bubbleRef}
      className={`ovii-msg-row ${isMine ? "mine" : "theirs"}`}
    >
      {!isMine && (
        <img
          className="ovii-msg-avatar"
          src={avatar?.url || AVATARS[0].url}
          alt=""
        />
      )}
      <div className="ovii-msg-col">
        <div
          className={`ovii-bubble ${isMine ? "mine" : "theirs"}`}
          onDoubleClick={() => setShowReactions(!showReactions)}
          style={{ "--bub-color": avatar?.color || "#6EC6F5" } as React.CSSProperties}
        >
          {msg.type === "text" && <p>{decrypted}</p>}
          {msg.type === "image" && (
            <img
              className="ovii-bubble-img"
              src={msg.content}
              alt="shared"
              onClick={() => window.open(msg.content, "_blank")}
            />
          )}
          {msg.type === "voice" && (
            <VoiceNotePlayer url={msg.content} isMine={isMine} />
          )}
          <div className="ovii-bubble-meta">
            <span className="ovii-bubble-time">{formatTime(msg.timestamp)}</span>
            {isMine && (
              <span className="ovii-read-ticks">
                {msg.readBy.length > 1 ? (
                  <span className="ticks blue">✓✓</span>
                ) : (
                  <span className="ticks">✓</span>
                )}
              </span>
            )}
            {timeLeft !== null && (
              <span className="ovii-destruct-timer">💣 {timeLeft}s</span>
            )}
          </div>
        </div>

        {/* Reactions */}
        {msg.reactions.length > 0 && (
          <div className={`ovii-reactions ${isMine ? "mine" : "theirs"}`}>
            {Object.entries(
              msg.reactions.reduce<Record<string, number>>((acc, r) => {
                acc[r.emoji] = (acc[r.emoji] || 0) + 1;
                return acc;
              }, {})
            ).map(([emoji, count]) => (
              <span key={emoji} className="ovii-reaction-badge">
                {emoji} {count > 1 ? count : ""}
              </span>
            ))}
          </div>
        )}

        {/* Reaction picker */}
        {showReactions && (
          <div className={`ovii-emoji-picker ${isMine ? "mine" : "theirs"}`}>
            {EMOJI_LIST.map((e) => (
              <button
                key={e}
                onClick={() => {
                  onReact(msg.id, e);
                  setShowReactions(false);
                }}
              >
                {e}
              </button>
            ))}
          </div>
        )}
      </div>

      {isMine && (
        <img
          className="ovii-msg-avatar"
          src={avatar?.url || AVATARS[0].url}
          alt=""
        />
      )}
    </div>
  );
}

// ─── Main Chat Component ───────────────────────────────────────────────────────

interface OviiChatProps {
  roomId?: string;
}

export default function OviiChat({ roomId = "ovii-default" }: OviiChatProps) {
  // Auth
  const [userId, setUserId] = useState<string | null>(null);

  // UI state
  const [locked, setLocked] = useState(true);
  const [messages, setMessages] = useState<OviiMessage[]>([]);
  const [text, setText] = useState("");
  const [sending, setSending] = useState(false);
  const [otherTyping, setOtherTyping] = useState(false);
  const [otherAvatarId, setOtherAvatarId] = useState<string | null>(null);
  const [myAvatarId, setMyAvatarId] = useState<string>(getRandomAvatar().id);
  const [showAvatarPicker, setShowAvatarPicker] = useState(false);
  const [destructTimer, setDestructTimer] = useState(45);
  const [roomFull, setRoomFull] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const [isUploading, setIsUploading] = useState(false);

  // Voice recording state
  const [recording, setRecording] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const recordingTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Refs
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const inactivityTimerRef = useRef<NodeJS.Timeout | null>(null);
  const typingTimerRef = useRef<NodeJS.Timeout | null>(null);

  // ─── Auth ───────────────────────────────────────────────────────────────────

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUserId(user.uid);
        await joinRoom(user.uid);
      } else {
        const cred = await signInAnonymously(auth);
        setUserId(cred.user.uid);
        await joinRoom(cred.user.uid);
      }
    });
    return () => unsub();
  }, []);

  // ─── Room Management (max 2 users) ─────────────────────────────────────────

  const joinRoom = async (uid: string) => {
    const roomRef = doc(db, "ovii-rooms", roomId);
    const snap = await getDoc(roomRef);
    const data = snap.data();
    const activeUsers: string[] = data?.activeUsers || [];

    if (!activeUsers.includes(uid)) {
      if (activeUsers.length >= 2) {
        setRoomFull(true);
        return;
      }
      await setDoc(
        roomRef,
        { activeUsers: [...activeUsers, uid] },
        { merge: true }
      );
    }

    // Load saved avatar
    const savedAvatar = localStorage.getItem(`ovii-avatar-${uid}`);
    if (savedAvatar) setMyAvatarId(savedAvatar);

    // Publish my presence
    await setDoc(
      doc(db, "ovii-presence", `${roomId}-${uid}`),
      { uid, avatarId: savedAvatar || myAvatarId, typing: false, ts: Date.now() },
      { merge: true }
    );

    // Cleanup on unload
    window.addEventListener("beforeunload", () => leaveRoom(uid));
  };

  const leaveRoom = async (uid: string) => {
    const roomRef = doc(db, "ovii-rooms", roomId);
    const snap = await getDoc(roomRef);
    const data = snap.data();
    const activeUsers: string[] = (data?.activeUsers || []).filter(
      (u: string) => u !== uid
    );
    await setDoc(roomRef, { activeUsers }, { merge: true });
    await deleteDoc(doc(db, "ovii-presence", `${roomId}-${uid}`));
  };

  // ─── Listen for presence (other user's avatar + typing) ────────────────────

  useEffect(() => {
    if (!userId) return;
    const presenceQuery = collection(db, "ovii-presence");
    const unsub = onSnapshot(presenceQuery, (snap) => {
      snap.docs.forEach((d) => {
        const data = d.data();
        if (d.id.startsWith(roomId) && data.uid !== userId) {
          setOtherAvatarId(data.avatarId || null);
          setOtherTyping(data.typing || false);
        }
      });
    });
    return () => unsub();
  }, [userId, roomId]);

  // ─── Listen for messages ────────────────────────────────────────────────────

  useEffect(() => {
    const q = query(
      collection(db, "ovii-messages", roomId, "msgs"),
      orderBy("timestamp", "asc")
    );
    const unsub = onSnapshot(q, (snap) => {
      const msgs: OviiMessage[] = snap.docs.map((d) => ({
        id: d.id,
        ...(d.data() as Omit<OviiMessage, "id">),
      }));
      setMessages(msgs);
      scrollToBottom();

      // Auto-delete expired messages
      msgs.forEach((msg) => {
        if (msg.selfDestructAt && Date.now() >= msg.selfDestructAt) {
          deleteMessage(msg);
        }
      });
    });
    return () => unsub();
  }, [roomId]);

  // ─── Inactivity lock ────────────────────────────────────────────────────────

  const resetInactivity = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      setLocked(true);
    }, INACTIVITY_MS);
  }, []);

  useEffect(() => {
    const events = ["mousemove", "keydown", "scroll", "touchstart"];
    events.forEach((e) => window.addEventListener(e, resetInactivity));
    resetInactivity();
    return () => {
      events.forEach((e) => window.removeEventListener(e, resetInactivity));
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, [resetInactivity]);

  // ─── Scroll ─────────────────────────────────────────────────────────────────

  const scrollToBottom = () => {
    setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
  };

  // ─── Typing indicator ───────────────────────────────────────────────────────

  const handleTyping = async (val: string) => {
    setText(val);
    if (!userId) return;
    await updateDoc(doc(db, "ovii-presence", `${roomId}-${userId}`), {
      typing: val.length > 0,
    }).catch(() => {});
    if (typingTimerRef.current) clearTimeout(typingTimerRef.current);
    typingTimerRef.current = setTimeout(async () => {
      await updateDoc(doc(db, "ovii-presence", `${roomId}-${userId}`), {
        typing: false,
      }).catch(() => {});
    }, 2000);
  };

  // ─── Send Text ──────────────────────────────────────────────────────────────

  const sendText = async () => {
    if (!text.trim() || !userId || sending) return;
    setSending(true);
    const encrypted = await encryptMessage(text.trim(), roomId);
    const msg = {
      type: "text" as MessageType,
      content: encrypted,
      senderId: userId,
      senderAvatar: myAvatarId,
      timestamp: Date.now(),
      selfDestructAt: Date.now() + destructTimer * 1000,
      destructTimer,
      reactions: [],
      readBy: [userId],
      isRead: false,
    };
    await addDoc(collection(db, "ovii-messages", roomId, "msgs"), msg);
    setText("");
    await updateDoc(doc(db, "ovii-presence", `${roomId}-${userId}`), {
      typing: false,
    }).catch(() => {});
    setSending(false);
    scrollToBottom();
  };

  // ─── Send Image ─────────────────────────────────────────────────────────────

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !userId) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      alert("Only image files are supported.");
      return;
    }

    // Max 10MB
    if (file.size > 10 * 1024 * 1024) {
      alert("Image must be under 10MB.");
      return;
    }

    setIsUploading(true);
    try {
      const storageRef = ref(storage, `ovii/${roomId}/${Date.now()}-${file.name}`);
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);

      const msg = {
        type: "image" as MessageType,
        content: url,
        senderId: userId,
        senderAvatar: myAvatarId,
        timestamp: Date.now(),
        selfDestructAt: Date.now() + destructTimer * 1000,
        destructTimer,
        reactions: [],
        readBy: [userId],
        isRead: false,
        storageRef: storageRef.fullPath,
      };
      await addDoc(collection(db, "ovii-messages", roomId, "msgs"), msg);
      scrollToBottom();
    } catch (err) {
      console.error("Image upload failed:", err);
      alert("Failed to upload image. Check Firebase Storage rules.");
    } finally {
      setIsUploading(false);
      // Reset file input
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  // ─── Voice Recording ────────────────────────────────────────────────────────

  const startRecording = async () => {
    if (recording) return;
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      // Find best supported MIME type
      const mimeTypes = [
        "audio/webm;codecs=opus",
        "audio/webm",
        "audio/ogg;codecs=opus",
        "audio/mp4",
        "audio/mpeg",
      ];
      const supportedMime = mimeTypes.find((t) => MediaRecorder.isTypeSupported(t)) || "";

      const recorder = new MediaRecorder(stream, {
        mimeType: supportedMime || undefined,
      });
      audioChunksRef.current = [];

      recorder.ondataavailable = (e) => {
        if (e.data && e.data.size > 0) {
          audioChunksRef.current.push(e.data);
        }
      };

      recorder.onstop = async () => {
        stream.getTracks().forEach((t) => t.stop());
        if (audioChunksRef.current.length === 0 || !userId) return;

        const blob = new Blob(audioChunksRef.current, {
          type: supportedMime || "audio/webm",
        });

        if (blob.size < 100) return; // Empty recording

        try {
          const ext = supportedMime.includes("ogg") ? "ogg" : supportedMime.includes("mp4") ? "mp4" : "webm";
          const storageRef = ref(storage, `ovii/${roomId}/voice-${Date.now()}.${ext}`);
          await uploadBytes(storageRef, blob);
          const url = await getDownloadURL(storageRef);

          const msg = {
            type: "voice" as MessageType,
            content: url,
            senderId: userId,
            senderAvatar: myAvatarId,
            timestamp: Date.now(),
            selfDestructAt: Date.now() + destructTimer * 1000,
            destructTimer,
            reactions: [],
            readBy: [userId],
            isRead: false,
            storageRef: storageRef.fullPath,
          };
          await addDoc(collection(db, "ovii-messages", roomId, "msgs"), msg);
          scrollToBottom();
        } catch (err) {
          console.error("Voice upload failed:", err);
          alert("Failed to send voice note. Check Firebase Storage rules.");
        }
      };

      recorder.start(100); // Collect data every 100ms
      mediaRecorderRef.current = recorder;
      setRecording(true);
      setRecordingSeconds(0);

      recordingTimerRef.current = setInterval(() => {
        setRecordingSeconds((s) => s + 1);
      }, 1000);
    } catch (err) {
      console.error("Microphone access denied:", err);
      alert("Microphone permission denied. Please allow microphone access.");
    }
  };

  const stopRecording = () => {
    if (!recording || !mediaRecorderRef.current) return;
    mediaRecorderRef.current.stop();
    mediaRecorderRef.current = null;
    setRecording(false);
    setRecordingSeconds(0);
    if (recordingTimerRef.current) {
      clearInterval(recordingTimerRef.current);
      recordingTimerRef.current = null;
    }
  };

  const cancelRecording = () => {
    if (!recording || !mediaRecorderRef.current) return;
    const recorder = mediaRecorderRef.current;
    recorder.ondataavailable = null;
    recorder.onstop = null;
    recorder.stop();
    mediaRecorderRef.current = null;
    audioChunksRef.current = [];
    setRecording(false);
    setRecordingSeconds(0);
    if (recordingTimerRef.current) {
      clearInterval(recordingTimerRef.current);
      recordingTimerRef.current = null;
    }
  };

  // ─── React to message ────────────────────────────────────────────────────────

  const handleReact = async (msgId: string, emoji: string) => {
    if (!userId) return;
    const msgRef = doc(db, "ovii-messages", roomId, "msgs", msgId);
    const snap = await getDoc(msgRef);
    if (!snap.exists()) return;
    const data = snap.data();
    const reactions: Reaction[] = data.reactions || [];
    const existing = reactions.findIndex(
      (r) => r.userId === userId && r.emoji === emoji
    );
    if (existing >= 0) {
      reactions.splice(existing, 1);
    } else {
      reactions.push({ emoji, userId });
    }
    await updateDoc(msgRef, { reactions });
  };

  // ─── Read receipt ────────────────────────────────────────────────────────────

  const handleRead = async (msgId: string) => {
    if (!userId) return;
    const msgRef = doc(db, "ovii-messages", roomId, "msgs", msgId);
    const snap = await getDoc(msgRef);
    if (!snap.exists()) return;
    const data = snap.data();
    const readBy: string[] = data.readBy || [];
    if (!readBy.includes(userId)) {
      readBy.push(userId);
      await updateDoc(msgRef, { readBy, selfDestructAt: Date.now() + data.destructTimer * 1000 });
    }
  };

  // ─── Delete message ──────────────────────────────────────────────────────────

  const deleteMessage = async (msg: OviiMessage) => {
    try {
      await deleteDoc(doc(db, "ovii-messages", roomId, "msgs", msg.id));
      // Also delete from storage if media
      if (msg.type === "image" || msg.type === "voice") {
        const storageRef = ref(storage, msg.content);
        await deleteObject(storageRef).catch(() => {});
      }
    } catch {}
  };

  // ─── Avatar update ───────────────────────────────────────────────────────────

  const updateAvatar = (id: string) => {
    setMyAvatarId(id);
    if (userId) {
      localStorage.setItem(`ovii-avatar-${userId}`, id);
      updateDoc(doc(db, "ovii-presence", `${roomId}-${userId}`), {
        avatarId: id,
      }).catch(() => {});
    }
  };

  // ─── Key handler ─────────────────────────────────────────────────────────────

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendText();
    }
  };

  // ─── Other user's avatar ─────────────────────────────────────────────────────

  const otherAvatar = otherAvatarId
    ? AVATARS.find((a) => a.id === otherAvatarId)
    : null;

  // ─── Render ──────────────────────────────────────────────────────────────────

  if (roomFull) {
    return (
      <div className={`ovii-root ${isDark ? "dark" : "light"}`}>
        <div className="ovii-room-full">
          <div className="ovii-logo-text">ovii</div>
          <p>This room is full (max 2 users).</p>
          <p>Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`ovii-root ${isDark ? "dark" : "light"}`}>
      {/* PIN Gate */}
      {locked && (
        <PinModal onUnlock={() => setLocked(false)} showForgot={true} />
      )}

      {/* Avatar Picker Modal */}
      {showAvatarPicker && (
        <AvatarPicker
          current={myAvatarId}
          onSelect={updateAvatar}
          onClose={() => setShowAvatarPicker(false)}
        />
      )}

      {/* Chat Window */}
      <div className="ovii-chat-window">
        {/* Header */}
        <header className="ovii-header">
          <div className="ovii-header-left">
            <button
              className="ovii-my-avatar-btn"
              onClick={() => setShowAvatarPicker(true)}
              title="Change avatar"
            >
              <img
                src={AVATARS.find((a) => a.id === myAvatarId)?.url}
                alt="me"
              />
              <span className="ovii-avatar-edit-dot">✏️</span>
            </button>
            <div className="ovii-header-info">
              {otherAvatar ? (
                <>
                  <img
                    className="ovii-other-avatar-sm"
                    src={otherAvatar.url}
                    alt="other"
                  />
                  <span className="ovii-online-dot" />
                </>
              ) : (
                <span className="ovii-waiting">Waiting for someone…</span>
              )}
            </div>
          </div>
          <div className="ovii-header-brand">
            <span className="ovii-logo-text">ovii</span>
            <span className="ovii-logo-dot">●</span>
          </div>
          <div className="ovii-header-right">
            <button
              className="ovii-theme-toggle"
              onClick={() => setIsDark(!isDark)}
              title="Toggle theme"
            >
              {isDark ? "☀️" : "🌙"}
            </button>
            <button
              className="ovii-lock-btn"
              onClick={() => setLocked(true)}
              title="Lock chat"
            >
              🔒
            </button>
          </div>
        </header>

        {/* Timer selector */}
        <div className="ovii-timer-bar">
          <span>💣</span>
          {DESTRUCT_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              className={`ovii-timer-opt ${destructTimer === opt.value ? "active" : ""}`}
              onClick={() => setDestructTimer(opt.value)}
            >
              {opt.label}
            </button>
          ))}
        </div>

        {/* Messages */}
        <div className="ovii-messages-area">
          {messages.length === 0 && (
            <div className="ovii-empty-state">
              <div className="ovii-empty-doodle">
                <svg viewBox="0 0 120 120" width="120" height="120">
                  <circle cx="60" cy="60" r="50" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" opacity="0.3" />
                  <text x="60" y="50" textAnchor="middle" fontSize="28">💬</text>
                  <text x="60" y="78" textAnchor="middle" fontSize="11" fill="currentColor" opacity="0.5">Start chatting…</text>
                </svg>
              </div>
              <p>Messages disappear after being read</p>
              <p className="ovii-e2e-badge">🔐 End-to-end encrypted</p>
            </div>
          )}

          {messages.map((msg) => (
            <MessageBubble
              key={msg.id}
              msg={msg}
              isMine={msg.senderId === userId}
              roomId={roomId}
              onReact={handleReact}
              onRead={handleRead}
            />
          ))}

          {otherTyping && (
            <TypingIndicator avatarUrl={otherAvatar?.url} />
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <div className="ovii-input-bar">
          {recording ? (
            <div className="ovii-recording-bar">
              <button className="ovii-rec-cancel" onClick={cancelRecording}>✕</button>
              <div className="ovii-rec-wave">
                {Array.from({ length: 12 }, (_, i) => (
                  <div key={i} className="ovii-rec-bar" />
                ))}
              </div>
              <span className="ovii-rec-timer">{fmtDuration(recordingSeconds)}</span>
              <button className="ovii-rec-send" onClick={stopRecording}>
                <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                  <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                </svg>
              </button>
            </div>
          ) : (
            <>
              {/* Image upload */}
              <button
                className="ovii-attach-btn"
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading}
                title="Send image"
              >
                {isUploading ? (
                  <span className="ovii-uploading-spinner" />
                ) : (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="22" height="22">
                    <rect x="3" y="3" width="18" height="18" rx="3" />
                    <circle cx="8.5" cy="8.5" r="1.5" fill="currentColor" stroke="none" />
                    <polyline points="21 15 16 10 5 21" />
                  </svg>
                )}
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleImageUpload}
              />

              {/* Text input */}
              <textarea
                className="ovii-text-input"
                value={text}
                onChange={(e) => handleTyping(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Message…"
                rows={1}
              />

              {/* Send / Voice */}
              {text.trim() ? (
                <button
                  className="ovii-send-btn"
                  onClick={sendText}
                  disabled={sending}
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                    <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                  </svg>
                </button>
              ) : (
                <button
                  className="ovii-voice-btn-main"
                  onMouseDown={startRecording}
                  onTouchStart={(e) => { e.preventDefault(); startRecording(); }}
                  title="Hold to record"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                    <rect x="9" y="2" width="6" height="12" rx="3" />
                    <path d="M5 10a7 7 0 0 0 14 0" fill="none" stroke="currentColor" strokeWidth="2" />
                    <line x1="12" y1="19" x2="12" y2="22" stroke="currentColor" strokeWidth="2" />
                    <line x1="9" y1="22" x2="15" y2="22" stroke="currentColor" strokeWidth="2" />
                  </svg>
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
