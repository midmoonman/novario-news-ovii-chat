const fs = require('fs');
const path = require('path');

const filePath = path.join('src', 'components', 'novario', 'OViiChat.tsx');
let content = fs.readFileSync(filePath, 'utf8');

// The mess starts inside the chatMsgs.map or near the scroll area.
// I'll replace everything from <div ref={scrollRef} ... to the end of the return statement.

const scrollAreaMarker = 'className="flex-1 min-h-0 overflow-y-auto overscroll-contain flex flex-col items-stretch touch-pan-y relative bg-[#0b141a] premium-scrollbar"';
const startIdx = content.indexOf('<div\n                ref={scrollRef}');
if (startIdx === -1) {
    // try different search
    const startIdx2 = content.indexOf('ref={scrollRef}');
    if (startIdx2 !== -1) {
        // find the opening <div
        const lastDiv = content.lastIndexOf('<div', startIdx2);
        console.log('Found scroll area at', lastDiv);
        
        // I want to replace everything from here until the closing </AnimatePresence> or similar.
        // Actually, I'll replace until the end of the component return.
        
        const returnEndMarker = '      {/* ── Full Image Preview Overlay ── */}';
        const endIdx = content.indexOf(returnEndMarker);
        
        if (endIdx !== -1) {
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
              <footer className="shrink-0 p-2 pb-safe z-[60] relative">
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
            content = content.substring(0, lastDiv) + newBody + content.substring(endIdx);
            fs.writeFileSync(filePath, content);
            console.log('Fixed the mess and applied high-fidelity UI');
        }
    }
}
