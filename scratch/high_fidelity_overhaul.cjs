const fs = require('fs');
const path = require('path');

const filePath = path.join('src', 'components', 'novario', 'OViiChat.tsx');
let content = fs.readFileSync(filePath, 'utf8');

// 1. Update Header to match target UI (Back arrow, etc)
const headerStart = '<header className={`h-[64px] px-3 flex items-center justify-between z-[60] shrink-0 shadow-sm';
const headerEnd = '</header>';
const hIdx = content.indexOf(headerStart);
const hEndIdx = content.indexOf(headerEnd, hIdx);

const newHeader = `<header className={\`h-[64px] px-2 flex items-center justify-between z-[60] shrink-0 shadow-sm \${isDarkMode ? "bg-[#202c33] border-b border-white/5 text-white" : "bg-white border-b border-black/5 text-black"}\`}>
            <div className="flex items-center gap-1.5 min-w-0">
              <button onClick={() => window.location.href = "/news"} className="p-2 -ml-1 hover:bg-white/10 rounded-full transition-colors shrink-0">
                <ChevronLeft className="w-7 h-7" />
              </button>
              <div className="h-10 w-10 rounded-full overflow-hidden border border-white/10 bg-muted shrink-0 shadow-sm">
                {otherAvatar ? (
                  <img src={otherAvatar} alt="" className="w-full h-full object-cover" />
                ) : avatar ? (
                  <img src={avatar} alt="" className="w-full h-full object-cover opacity-40 grayscale" />
                ) : null}
              </div>
              <div className="flex flex-col min-w-0 ml-1">
                <div className="font-bold text-[16px] leading-tight truncate">
                  {otherName || (count > 1 ? "Ovii User" : "Waiting...") || "Waiting..."}
                </div>
                <div className="text-[11px] opacity-60 truncate font-medium">
                  {recordingUsers.length > 0 ? (
                    <span className="text-emerald-500 animate-pulse">Recording...</span>
                  ) : typingUsers.length > 0 ? (
                    <span className="text-emerald-500 animate-pulse">Typing...</span>
                  ) : otherOnline ? (
                    <span className="text-emerald-500 uppercase tracking-tighter text-[10px]">online</span>
                  ) : otherName ? (
                    <span className="opacity-70 italic text-[10px]">last seen today at 11:27 PM</span>
                  ) : (
                    "no one else here"
                  )}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-0.5">
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className={\`p-2 rounded-full transition-colors \${isDarkMode ? "hover:bg-white/10" : "hover:bg-black/10"}\`}
              >
                {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              <button
                onClick={() => { window.location.href = "/news"; }}
                className={\`p-2 rounded-full transition-colors \${isDarkMode ? "hover:bg-white/10" : "hover:bg-black/10"}\`}
              >
                <ArrowLeftRight className="w-5 h-5" />
              </button>
              <button
                onClick={onLock}
                className={\`ml-1 text-[11px] font-black uppercase tracking-wider px-3.5 py-1.5 rounded-full transition-all border \${isDarkMode
                    ? "bg-white/5 hover:bg-white/10 border-white/10 text-white/90"
                    : "bg-black/5 hover:bg-black/10 border-black/10 text-black/90"
                  }\`}
              >
                LOCK
              </button>
              <div className="relative" ref={menuRef}>
                <button
                  onClick={() => setShowMenu(!showMenu)}
                  className={\`p-2 rounded-full transition-colors \${isDarkMode ? "hover:bg-white/10" : "hover:bg-black/10"}\`}
                >
                  <MoreVertical className="w-5 h-5" />
                </button>
              </div>
            </div>
          </header>`;

if (hIdx !== -1 && hEndIdx !== -1) {
    content = content.substring(0, hIdx) + newHeader + content.substring(hEndIdx + 9);
}

// 2. Update Message Mapping for better alignment and AudioPlayer bubble
// I'll search for the map block
const mapStart = '{chatMsgs.map((m, i) => {';
const mapEnd = '})}'; // Need to find the correct closing bracket
const mapIdx = content.indexOf(mapStart);

// I'll replace the entire map block with a cleaner version
const newMap = `{chatMsgs.map((m, i) => {
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
                    })}`;

if (mapIdx !== -1) {
    const mapBlockEndIdx = content.indexOf('})}', mapIdx) + 3;
    content = content.substring(0, mapIdx) + newMap + content.substring(mapBlockEndIdx);
}

fs.writeFileSync(filePath, content);
console.log('High-fidelity UI overhaul complete');
