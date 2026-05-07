const fs = require('fs');
const path = require('path');

const filePath = path.join('src', 'components', 'novario', 'OViiChat.tsx');
let content = fs.readFileSync(filePath, 'utf8');

// 1. Re-add the hidden file input
// I'll add it just before the </AnimatePresence> of the folder or somewhere stable.
const scrollStart = '<div\n                ref={scrollRef}';
if (content.indexOf(scrollStart) !== -1) {
    const fileInput = `              <input 
                type="file" 
                ref={fileRef} 
                className="hidden" 
                accept="image/*" 
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) onImage(file);
                  e.target.value = '';
                }} 
              />
`;
    content = content.replace(scrollStart, fileInput + '              ' + scrollStart);
}

// 2. Fix the Footer: Remove border, improve send button, add recording overlay
const footerStart = '<footer className="shrink-0 p-2 pb-safe z-[60] relative">';
const footerEnd = '</footer>';
const fIdx = content.indexOf(footerStart);
const fEndIdx = content.indexOf(footerEnd, fIdx + 100);

const newFooter = `<footer className="shrink-0 p-2 pb-safe z-[60] relative overflow-hidden">
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

                  <div className="flex-1 flex items-end bg-[#202c33] rounded-[32px] min-h-[52px] px-3 py-1.5 shadow-sm">
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
                        <Send className="w-6 h-6 fill-white stroke-none" />
                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-[#00a884]" />
                      </div>
                    ) : (
                      text.trim() ? <Send className="w-6 h-6 fill-white stroke-none" /> : <Mic className="w-6 h-6" />
                    )}
                  </button>
                </div>
              </footer>`;

if (fIdx !== -1 && fEndIdx !== -1) {
    const finalEndIdx = content.indexOf('</footer>', fIdx + 100) + 9;
    content = content.substring(0, fIdx) + newFooter + content.substring(finalEndIdx);
}

fs.writeFileSync(filePath, content);
console.log('Fixed Image input, Send button, and restored Recording Bar');
