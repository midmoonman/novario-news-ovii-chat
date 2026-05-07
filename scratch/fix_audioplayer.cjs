const fs = require('fs');
const path = require('path');

const filePath = path.join('src', 'components', 'novario', 'OViiChat.tsx');
let content = fs.readFileSync(filePath, 'utf8');

const audioStart = 'const AudioPlayer =';
const msgTickStart = 'const MsgTick =';

const startIdx = content.indexOf(audioStart);
const endIdx = content.indexOf(msgTickStart);

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
};

`;

if (startIdx !== -1 && endIdx !== -1) {
    content = content.substring(0, startIdx) + newAudioPlayer + content.substring(endIdx);
    fs.writeFileSync(filePath, content);
    console.log('Fixed AudioPlayer');
} else {
    console.log('Could not find components');
}
