const fs = require('fs');
const path = require('path');

const filePath = path.join('src', 'components', 'novario', 'OViiChat.tsx');
let content = fs.readFileSync(filePath, 'utf8');

// Update timestamp styling
content = content.replace(
    'className={`${m.type === "image" ? "absolute bottom-2 right-2 bg-black/40 backdrop-blur-md px-1.5 py-0.5 rounded-md" : "absolute bottom-0 right-0"} flex items-center gap-1.5 opacity-90 pointer-events-none select-none`}',
    'className={`${m.type === "image" ? "absolute bottom-2 right-2 bg-black/40 backdrop-blur-md px-1.5 py-0.5 rounded-md" : "absolute bottom-1.5 right-1.5"} flex items-center gap-1.5 opacity-70 pointer-events-none select-none`}'
);

content = content.replace(
    'className={`text-[11px] tabular-nums font-[\'Inter\'] font-extralight tracking-tight ${m.type === "image" ? "text-white" : ""}`}',
    'className={`text-[10px] tabular-nums font-light tracking-tight ${m.type === "image" ? "text-white" : (isDarkMode ? "text-white/60" : "text-black/50")}`}'
);

fs.writeFileSync(filePath, content);
console.log('Successfully updated timestamp styling in OViiChat.tsx');
