const fs = require('fs');
const path = require('path');

const filePath = path.join('src', 'components', 'novario', 'OViiChat.tsx');
let content = fs.readFileSync(filePath, 'utf8');

// 1. Restore the Three Dots Menu dropdown
const menuButtonEnd = '</button>\n              </div>';
const menuIdx = content.indexOf(menuButtonEnd);
if (menuIdx !== -1) {
    const menuDropdown = `                <AnimatePresence>
                  {showMenu && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95, y: -10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: -10 }}
                      className={\`absolute top-full right-0 mt-2 w-48 rounded-2xl shadow-2xl z-[100] border p-1 \${isDarkMode ? "bg-[#233138] border-white/10 text-white" : "bg-white border-black/5 text-black"}\`}
                    >
                      <button 
                        onClick={() => { setShowFolder(true); setShowMenu(false); }}
                        className="w-full flex items-center gap-3 px-4 py-3 text-sm hover:bg-white/5 rounded-xl transition-colors"
                      >
                        <Folder className="w-4 h-4 text-primary" /> View Files
                      </button>
                      <button 
                        onClick={() => { clearChat(); setShowMenu(false); }}
                        className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-400 hover:bg-white/5 rounded-xl transition-colors"
                      >
                        <Trash2 className="w-4 h-4" /> Clear Chat
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
`;
    content = content.replace(menuButtonEnd, '</button>\n' + menuDropdown + '              </div>');
}

// 2. Fix the "White Line" (outline/shadow) in the input bar
const inputBarDiv = 'className="flex-1 flex items-end bg-[#202c33] rounded-[32px] min-h-[52px] px-3 py-1.5 shadow-sm border border-white/5"';
const inputBarDiv2 = 'className="flex-1 flex items-end bg-[#202c33] rounded-[32px] min-h-[52px] px-3 py-1.5 shadow-sm"'; // from previous fix

if (content.indexOf(inputBarDiv) !== -1) {
    content = content.replace(inputBarDiv, 'className="flex-1 flex items-end bg-[#202c33] rounded-[32px] min-h-[52px] px-3 py-1.5 border-none outline-none shadow-none"');
} else if (content.indexOf(inputBarDiv2) !== -1) {
    content = content.replace(inputBarDiv2, 'className="flex-1 flex items-end bg-[#202c33] rounded-[32px] min-h-[52px] px-3 py-1.5 border-none outline-none shadow-none"');
}

// 3. Fix Send/Mic icons and colors
const sendIcon = '<Send className="w-6 h-6 fill-white stroke-none" />';
const micIcon = '<Mic className="w-6 h-6" />';

content = content.replace(new RegExp(sendIcon, 'g'), '<Send size={24} color="white" fill="white" />');
content = content.replace(new RegExp(micIcon, 'g'), '<Mic size={24} color="white" />');

fs.writeFileSync(filePath, content);
console.log('Restored Menu, Fixed White Line, and Updated Icons');
