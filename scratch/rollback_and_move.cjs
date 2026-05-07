const fs = require('fs');
const path = require('path');

const filePath = path.join('src', 'components', 'novario', 'OViiChat.tsx');
let content = fs.readFileSync(filePath, 'utf8');

// 1. Rollback font changes
content = content.replace(
    'className={`${m.type === "image" ? "absolute bottom-2 right-2 bg-black/40 backdrop-blur-md px-1.5 py-0.5 rounded-md" : "absolute bottom-1.5 right-1.5"} flex items-center gap-1.5 opacity-70 pointer-events-none select-none`}',
    'className={`${m.type === "image" ? "absolute bottom-2 right-2 bg-black/40 backdrop-blur-md px-1.5 py-0.5 rounded-md" : "absolute bottom-0 right-0"} flex items-center gap-1.5 opacity-90 pointer-events-none select-none`}'
);

content = content.replace(
    'className={`text-[10px] tabular-nums font-light tracking-tight ${m.type === "image" ? "text-white" : (isDarkMode ? "text-white/60" : "text-black/50")}`}',
    'className={`text-[11px] tabular-nums font-[\'Inter\'] font-extralight tracking-tight ${m.type === "image" ? "text-white" : ""}`}'
);

// 2. Move download button in image preview
// Remove the old absolute div
const oldDownloadDiv = `              <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-4">
                <button 
                  onClick={() => downloadFile(selectedImage, "preview", "image")}
                  className="px-6 py-2.5 bg-primary text-white rounded-full font-bold text-sm shadow-lg hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
                >
                  <Download className="w-4 h-4" /> Download
                </button>
              </div>`;

content = content.replace(oldDownloadDiv, '');

// Add new download button near X
const xButton = `<X className="w-6 h-6" />
            </motion.button>`;

const newDownloadButton = `<X className="w-6 h-6" />
            </motion.button>

            <motion.button
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              onClick={() => downloadFile(selectedImage, "preview", "image")}
              className="absolute top-20 right-5 p-2.5 bg-white/10 hover:bg-white/20 rounded-full text-white transition-all z-10"
            >
              <Download className="w-6 h-6" />
            </motion.button>`;

content = content.replace(xButton, newDownloadButton);

fs.writeFileSync(filePath, content);
console.log('Successfully rolled back fonts and moved download button');
