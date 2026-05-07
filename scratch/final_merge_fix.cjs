const fs = require('fs');
const path = require('path');

const baseFile = path.join('scratch', 'OViiChat_stable_base_utf8.tsx');
let baseContent = fs.readFileSync(baseFile, 'utf8');

// 1. AudioPlayer (Pill version)
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

// 2. MsgTick (Blue checks)
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

// Replace components in base
const oldAudioStart = baseContent.indexOf('const AudioPlayer =');
const oldAudioEnd = baseContent.indexOf('};', oldAudioStart) + 2;
baseContent = baseContent.substring(0, oldAudioStart) + newAudioPlayer + baseContent.substring(oldAudioEnd);

const oldMsgTickStart = baseContent.indexOf('const MsgTick =');
const oldMsgTickEnd = baseContent.indexOf('};', oldMsgTickStart) + 2;
baseContent = baseContent.substring(0, oldMsgTickStart) + newMsgTick + baseContent.substring(oldMsgTickEnd);

// 3. Mapping and Footer (Large chunk replace)
// I'll replace everything from <div ref={scrollRef} ... to the end of the return
const scrollStart = baseContent.indexOf('ref={scrollRef}');
const scrollDivStart = baseContent.lastIndexOf('<div', scrollStart);
const returnEndMarker = '      {/* ΓöÇΓöÇ Full Image Preview Overlay ΓöÇΓöÇ */}';
const endIdx = baseContent.indexOf(returnEndMarker);

const newBody = `<div
                ref={scrollRef}
                className="flex-1 min-h-0 overflow-y-auto overscroll-contain flex flex-col items-stretch touch-pan-y relative bg-[#0b141a] premium-scrollbar"
                style={{ overscrollBehavior: "contain", overflowX: "hidden" }}
                onScroll={(e) => {
                  const t = e.currentTarget;
                  setShowScrollDown(t.scrollHeight - t.scrollTop > t.clientHeight + 80);
                }}
              >
                <div className="flex-1" />

                {error && <div className="text-xs text-destructive bg-destructive/10 border border-destructive/30 rounded-md p-3 mb-3">{error}</div>}
                {!error && chatMsgs.length === 0 && (
                  <div className="h-full flex items-center justify-center text-center text-muted-foreground text-sm my-auto">
                    <div><div className="text-4xl mb-2">👋</div>No messages yet.</div>
                  </div>
                )}

                <div className="flex-1 flex flex-col justify-end shrink-0 relative px-[10px] pt-[12px] pb-[90px] gap-[4px]">
                  <AnimatePresence>
                    {chatMsgs.map((m, i) => {
                      const mine = m.uid === uid;
                      const prevMsg = chatMsgs[i - 1];
                      const isConsecutive = prevMsg && prevMsg.uid === m.uid;
                      const nextMsg = chatMsgs[i + 1];
                      const isLastInGroup = !nextMsg || nextMsg.uid !== m.uid;

                      return (
                        <div key={m.id} className={\`w-full flex \${mine ? "justify-end" : "justify-start"} \${!isConsecutive ? "mt-4" : "mt-0"}\`}>
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={\`flex items-end gap-2 max-w-[85%] \${mine ? "flex-row-reverse" : "flex-row"}\`}
                          >
                            <div className="w-8 shrink-0 flex justify-center">
                              {isLastInGroup && <img src={m.avatar} className="h-8 w-8 rounded-full object-cover shadow-md border border-white/5" alt="" />}
                            </div>

                            <div className={\`flex-1 min-w-0 flex flex-col \${mine ? "items-end" : "items-start"}\`}>
                              {!mine && !isConsecutive && m.name && (
                                <span className="text-[12px] font-bold text-white/40 ml-2 mb-1 uppercase tracking-wider">{m.name}</span>
                              )}

                              {m.type === "voice" ? (
                                <AudioPlayer src={m.content} id={m.id} mine={mine} status={m.status} createdAt={m.createdAt} isDarkMode={isDarkMode} />
                              ) : (
                                <div className={\`relative px-[12px] py-[8px] shadow-md w-fit max-w-full \${
                                  mine 
                                    ? "bg-[#005c4b] text-white rounded-[18px] rounded-br-[4px]"
                                    : "bg-[#202c33] text-white rounded-[18px] rounded-bl-[4px]"
                                }\`}>
                                  {m.type === "image" ? (
                                    <div className="flex flex-col gap-2">
                                      <div className="rounded-[12px] overflow-hidden cursor-pointer" onClick={() => setSelectedImage(m.content)}>
                                        <img src={m.content} alt="" className="max-w-full h-auto object-cover max-h-[300px]" />
                                      </div>
                                      {m.caption && <p className="text-[16px] leading-[1.45]">{m.caption}</p>}
                                    </div>
                                  ) : (
                                    <p className="text-[16px] leading-[1.45] break-words whitespace-pre-wrap">{m.content}</p>
                                  )}
                                  
                                  <div className="flex items-center justify-end gap-1 opacity-50 mt-1">
                                    <span className="text-[10px] font-medium uppercase tracking-tighter">
                                      {m.createdAt?.toDate()?.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                                    </span>
                                    {mine && <MsgTick status={m.status} />}
                                  </div>
                                </div>
                              )}
                            </div>
                          </motion.div>
                        </div>
                      );
                    })}
                  </AnimatePresence>
                  <div ref={messagesEndRef} />
                </div>
              </div>

              {/* Scroll-to-bottom button */}
              <AnimatePresence>
                {showScrollDown && (
                  <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    onClick={() => scrollToBottom()}
                    className="absolute bottom-[80px] left-1/2 -translate-x-1/2 bg-[#00a884] text-white p-2 rounded-full shadow-lg z-20 flex items-center gap-1 px-3 text-[10px] font-bold uppercase"
                  >
                    New message ↓
                  </motion.button>
                )}
              </AnimatePresence>

              {/* Input bar */}
              <footer className="shrink-0 p-2 pb-safe z-[60] relative overflow-hidden">
                <div className="flex items-end gap-2 max-w-5xl mx-auto px-1 relative">
                  
                  {/* --- Recording Overlay --- */}
                  <AnimatePresence>
                    {recording && (
                      <motion.div 
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        className="absolute inset-y-0 left-1 right-[62px] bg-[#202c33] z-[70] rounded-full flex items-center px-4 shadow-lg border border-white/5"
                      >
                        <div className="flex items-center gap-3 flex-1">
                          <div className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
                          <span className="text-white text-sm font-bold tabular-nums">Recording...</span>
                          <div className="flex-1 text-center">
                            <span className="text-white/40 text-xs uppercase tracking-widest animate-pulse">
                              Slide to cancel 
                            </span>
                          </div>
                        </div>
                        <button 
                          onClick={cancelRec}
                          className="text-[#8696a0] hover:text-white uppercase text-[11px] font-black tracking-wider px-2"
                        >
                          Cancel
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="flex-1 flex items-end bg-[#202c33] rounded-[32px] min-h-[52px] px-3 py-1.5 border-none outline-none shadow-none">
                    <button 
                      onClick={() => fileRef.current?.click()}
                      className="p-2.5 text-[#8696a0] hover:text-white transition-colors shrink-0"
                    >
                      <ImageIcon className="w-6 h-6" />
                    </button>
                    <textarea
                      rows={1}
                      ref={inputRef}
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
                      onPaste={handlePaste}
                      placeholder="Message"
                      className="flex-1 bg-transparent border-none focus:ring-0 text-[16px] text-white py-2.5 px-2 resize-none max-h-[150px] overflow-y-auto premium-scrollbar leading-[1.4] placeholder-[#8696a0]"
                    />
                  </div>
                  <button
                    onClick={recording ? stopAndSendRec : (text.trim() ? onText : startRec)}
                    className="w-[52px] h-[52px] rounded-full bg-[#00a884] flex items-center justify-center text-white shadow-lg active:scale-90 transition-all shrink-0"
                  >
                    {recording ? (
                      <div className="relative">
                        <Send size={24} color="white" fill="white" />
                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-[#00a884]" />
                      </div>
                    ) : (
                      text.trim() ? <Send size={24} color="white" fill="white" /> : <Mic size={24} color="white" />
                    )}
                  </button>
                </div>
              </footer>

            <AnimatePresence>
              {showFolder && (
                <motion.div
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: 380, opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  transition={{ type: "spring", damping: 30, stiffness: 300 }}
                  className="hidden lg:flex flex-col border-l border-border/40 bg-muted/5 relative overflow-hidden shrink-0"
                >
                  <div className="p-4 border-b border-border/60 flex items-center justify-between bg-background/40 backdrop-blur-md sticky top-0 z-10">
                    <h2 className="text-sm font-bold uppercase tracking-wider flex items-center gap-2.5">
                      <Folder className="w-4 h-4 text-destructive" /> FILES
                    </h2>
                    <button onClick={() => setShowFolder(false)} className="p-2 rounded-full bg-background/60 hover:bg-background text-foreground transition-all active:scale-90 border border-border/20 shadow-sm">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-hide">
                    <MediaList msgs={msgs} uid={uid} downloadFile={downloadFile} isDarkMode={isDarkMode} setSelectedImage={setSelectedImage} />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </div>{/* end msgs-col */}
          </div>{/* end body */}
        </div>{/* end ovii-chat-frame */}
      </div>{/* end ovii-chat-root */}
`;

baseContent = baseContent.substring(0, scrollDivStart) + newBody + baseContent.substring(endIdx);

fs.writeFileSync(path.join('src', 'components', 'novario', 'OViiChat.tsx'), baseContent);
console.log('Final merged rollback complete');
