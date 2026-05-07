const fs = require('fs');
const path = require('path');

const baseFile = path.join('scratch', 'OViiChat_stable_base_utf8.tsx');
const currentFile = path.join('src', 'components', 'novario', 'OViiChat.tsx');

let baseContent = fs.readFileSync(baseFile, 'utf8');
let currentContent = fs.readFileSync(currentFile, 'utf8');

// --- Helper to extract components from currentContent ---
function extract(content, startMarker, endMarker) {
    const start = content.indexOf(startMarker);
    const end = content.indexOf(endMarker, start);
    if (start === -1 || end === -1) return null;
    return content.substring(start, end + endMarker.length);
}

// 1. AudioPlayer (Pill version)
const newAudioPlayer = extract(currentContent, 'const AudioPlayer =', '};');
if (newAudioPlayer) {
    const oldAudioStart = baseContent.indexOf('const AudioPlayer =');
    const oldAudioEnd = baseContent.indexOf('};', oldAudioStart) + 2;
    baseContent = baseContent.substring(0, oldAudioStart) + newAudioPlayer + baseContent.substring(oldAudioEnd);
}

// 2. MsgTick (Blue checks)
const newMsgTick = extract(currentContent, 'const MsgTick =', '};');
if (newMsgTick) {
    const oldMsgTickStart = baseContent.indexOf('const MsgTick =');
    const oldMsgTickEnd = baseContent.indexOf('};', oldMsgTickStart) + 2;
    baseContent = baseContent.substring(0, oldMsgTickStart) + newMsgTick + baseContent.substring(oldMsgTickEnd);
}

// 3. Message Mapping (Alignment)
// I'll replace the entire {chatMsgs.map((m, i) => { ... })} block
const mapStart = '{chatMsgs.map((m, i) => {';
const mapEnd = '})}';
const newMap = extract(currentContent, mapStart, mapEnd);
if (newMap) {
    const oldMapStart = baseContent.indexOf(mapStart);
    const oldMapEnd = baseContent.indexOf(mapEnd, oldMapStart) + 3;
    baseContent = baseContent.substring(0, oldMapStart) + newMap + baseContent.substring(oldMapEnd);
}

// 4. Footer (Auto-growing textarea + Green circle)
const footerStart = '<footer';
const footerEnd = '</footer>';
const newFooter = extract(currentContent, footerStart, footerEnd);
if (newFooter) {
    const oldFooterStart = baseContent.indexOf(footerStart);
    const oldFooterEnd = baseContent.indexOf(footerEnd, oldFooterStart) + 9;
    baseContent = baseContent.substring(0, oldFooterStart) + newFooter + baseContent.substring(oldFooterEnd);
}

// 5. Cleanup: Ensure isMobileDevice uses width < 1024 or similar for better PC/Mobile split if needed
// But I'll stick to the user's wish: "made changes of mobile user only not for PC"

fs.writeFileSync(currentFile, baseContent);
console.log('Merged specific high-fidelity features into stable base UI');
