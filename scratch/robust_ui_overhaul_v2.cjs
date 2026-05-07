const fs = require('fs');
const path = require('path');

const filePath = path.join('src', 'components', 'novario', 'OViiChat.tsx');
let content = fs.readFileSync(filePath, 'utf8');

// 1. AudioPlayer Overhaul
const audioStart = 'const AudioPlayer = ({ src, id, mine, status, createdAt, isDarkMode }: { src: string, id: string, mine: boolean, status?: string, createdAt?: any, isDarkMode: boolean }) => {';
const audioEnd = '};'; // Need to be careful with this. I'll find the first one after audioStart.
const audioStartIdx = content.indexOf(audioStart);
const audioEndIdx = content.indexOf(audioEnd, audioStartIdx + 100); // skip some

const newAudioPlayer = `const AudioPlayer = ({ src, id, mine, status, createdAt, isDarkMode }: { src: string, id: string, mine: boolean, status?: string, createdAt?: any, isDarkMode: boolean }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const waveRef = useRef<WaveSurfer | null>(null);
  const [playing, setPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [speed, setSpeed] = useState<1 | 1.5 | 2>(1);

  useEffect(() => {
    if (!containerRef.current) return;
    const ws = WaveSurfer.create({
      container: containerRef.current,
      waveColor: "rgba(255,255,255,0.25)",
      progressColor: "#00a884",
      cursorWidth: 0,
      barWidth: 2,
      barGap: 3,
      barRadius: 2,
      height: 36,
      normalize: true,
    });
    ws.load(src);
    waveRef.current = ws;
    ws.on("ready", () => setDuration(ws.getDuration()));
    ws.on("audioprocess", () => setCurrentTime(ws.getCurrentTime()));
    ws.on("finish", () => { setPlaying(false); setCurrentTime(ws.getDuration()); });
    const stopOthers = (e: any) => { if (e.detail !== id && ws.isPlaying()) { ws.pause(); setPlaying(false); } };
    window.addEventListener(STOP_AUDIO_EVENT, stopOthers);
    return () => { window.removeEventListener(STOP_AUDIO_EVENT, stopOthers); ws.destroy(); };
  }, [src, id, isDarkMode, mine]);

  const toggle = () => {
    if (!waveRef.current) return;
    if (playing) waveRef.current.pause();
    else { window.dispatchEvent(new CustomEvent(STOP_AUDIO_EVENT, { detail: id })); waveRef.current.play(); }
    setPlaying(!playing);
  };

  const toggleSpeed = () => {
    if (!waveRef.current) return;
    const next = speed === 1 ? 1.5 : speed === 1.5 ? 2 : 1;
    waveRef.current.setPlaybackRate(next);
    setSpeed(next);
  };

  const fmt = (s: number) => {
    if (!s || isNaN(s)) return "0:00";
    const m = Math.floor(s / 60);
    const ss = Math.floor(s % 60);
    return \`\${m}:\${ss < 10 ? "0" : ""}\${ss}\`;
  };

  const timeStr = createdAt?.toDate?.()?.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) || "";

  return (
    <div className={\`flex flex-col gap-2 w-full max-w-[300px] p-4 rounded-[18px] transition-all \${
      mine ? "bg-[#005c4b] text-white" : "bg-[#202c33] text-white"
    }\`}>
      <div className="flex items-center gap-4">
        <button onClick={toggle} className="shrink-0 text-white active:scale-90 transition-all">
          {playing ? <Pause className="w-8 h-8 fill-white" /> : <Play className="w-8 h-8 fill-white ml-0.5" />}
        </button>
        <div ref={containerRef} className="flex-1 h-[36px]" />
      </div>
      <div className="flex items-center justify-between gap-2 mt-1">
        <div className="bg-white/10 rounded-full px-2.5 py-0.5 text-[10px] font-bold">
          {fmt(playing ? currentTime : duration)}
        </div>
        <div className="text-[10px] opacity-60 font-medium">
          {timeStr}
        </div>
        <button onClick={toggleSpeed} className="bg-white/10 rounded-full px-2.5 py-0.5 text-[10px] font-bold hover:bg-white/20">
          {speed}x
        </button>
        {mine && <MsgTick status={status} />}
      </div>
    </div>
  );
};`;

if (audioStartIdx !== -1 && audioEndIdx !== -1) {
    const finalEndIdx = content.indexOf('};', audioStartIdx + 100) + 2;
    content = content.substring(0, audioStartIdx) + newAudioPlayer + content.substring(finalEndIdx);
}

// 2. MsgTick Overhaul
const msgTickStart = 'const MsgTick = ({ status }: { status?: string }) => {';
const msgTickEnd = '};';
const mtIdx = content.indexOf(msgTickStart);
const mtEndIdx = content.indexOf(msgTickEnd, mtIdx + 50);

const newMsgTick = `const MsgTick = ({ status }: { status?: string }) => {
  if (status === "sending") return <svg className="w-3 h-3 opacity-40" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 2" /></svg>;
  if (status === "sent") return (
    <svg className="w-[13px] h-[9px] opacity-40" viewBox="0 0 12 9" fill="none">
      <path d="M1 4.5L4.5 8L11 1" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
  if (status === "delivered") return (
    <svg className="w-[17px] h-[9px] opacity-40" viewBox="0 0 16 9" fill="none">
      <path d="M1 4.5L4.5 8L11 1" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5 4.5L8.5 8L15 1" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
  if (status === "read") return (
    <svg className="w-[17px] h-[9px]" viewBox="0 0 16 9" fill="none">
      <path d="M1 4.5L4.5 8L11 1" stroke="#34b7f1" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5 4.5L8.5 8L15 1" stroke="#34b7f1" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
  return null;
};`;

if (mtIdx !== -1 && mtEndIdx !== -1) {
    const finalEndIdx = content.indexOf('};', mtIdx + 50) + 2;
    content = content.substring(0, mtIdx) + newMsgTick + content.substring(finalEndIdx);
}

// 3. Footer Overhaul
const footerStart = '<footer className="shrink-0 p-2 pb-safe z-[60] relative">';
const footerEnd = '</footer>';
const fIdx = content.indexOf(footerStart);
const fEndIdx = content.indexOf(footerEnd, fIdx + 100);

const newFooter = `<footer className="shrink-0 p-2 pb-safe z-[60] relative">
                <div className="flex items-end gap-2 max-w-5xl mx-auto px-1">
                  <div className="flex-1 flex items-end bg-[#202c33] rounded-[32px] min-h-[52px] px-3 py-1.5 shadow-sm border border-white/5">
                    <button 
                      onClick={() => fileRef.current?.click()}
                      className="p-2.5 text-[#8696a0] hover:text-white transition-colors"
                    >
                      <ImageIcon className="w-6 h-6" />
                    </button>
                    <textarea
                      rows={1}
                      value={text}
                      onChange={(e) => {
                        setText(e.target.value);
                        e.target.style.height = 'auto';
                        e.target.style.height = Math.min(e.target.scrollHeight, 150) + 'px';
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          onText();
                          e.currentTarget.style.height = 'auto';
                        }
                      }}
                      placeholder="Message"
                      className="flex-1 bg-transparent border-none focus:ring-0 text-[16px] text-white py-2.5 px-2 resize-none max-h-[150px] overflow-y-auto premium-scrollbar leading-[1.4] placeholder-[#8696a0]"
                    />
                  </div>
                  <button
                    onClick={recording ? stopAndSendRec : (text.trim() ? onText : startRec)}
                    className="w-[52px] h-[52px] rounded-full bg-[#00a884] flex items-center justify-center text-white shadow-lg active:scale-90 transition-all shrink-0"
                  >
                    {recording ? <XCircle className="w-7 h-7 animate-pulse" /> : (text.trim() ? <Send className="w-6 h-6 fill-white stroke-none" /> : <Mic className="w-6 h-6" />)}
                  </button>
                </div>
              </footer>`;

if (fIdx !== -1 && fEndIdx !== -1) {
    const finalEndIdx = content.indexOf('</footer>', fIdx + 100) + 9;
    content = content.substring(0, fIdx) + newFooter + content.substring(finalEndIdx);
}

fs.writeFileSync(filePath, content);
console.log('Robust UI overhaul complete via script');
