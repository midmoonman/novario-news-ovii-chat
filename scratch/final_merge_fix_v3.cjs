const fs = require('fs');
const path = require('path');

const baseFile = path.join('scratch', 'OViiChat_stable_base_utf8.tsx');
const currentFile = path.join('src', 'components', 'novario', 'OViiChat.tsx');

let baseContent = fs.readFileSync(baseFile, 'utf8');
let currentContent = fs.readFileSync(currentFile, 'utf8');

// --- Extractors ---
function getComponent(content, startMarker, endMarker) {
    const start = content.indexOf(startMarker);
    const end = content.indexOf(endMarker, start);
    if (start === -1 || end === -1) return null;
    return content.substring(start, end + endMarker.length);
}

// 1. AudioPlayer (Pill version)
const newAudio = getComponent(currentContent, 'const AudioPlayer =', '};');
const oldAudioStart = baseContent.indexOf('const AudioPlayer =');
const oldMsgTickStart = baseContent.indexOf('const MsgTick =');
if (newAudio && oldAudioStart !== -1 && oldMsgTickStart !== -1) {
    baseContent = baseContent.substring(0, oldAudioStart) + newAudio + "\n\n" + baseContent.substring(oldMsgTickStart);
}

// 2. MsgTick (Blue checks)
const newMsgTick = getComponent(currentContent, 'const MsgTick =', '};');
const updatedMsgTickStart = baseContent.indexOf('const MsgTick =');
const oldRecVisStart = baseContent.indexOf('const RecordingVisualizer =');
if (newMsgTick && updatedMsgTickStart !== -1 && oldRecVisStart !== -1) {
    baseContent = baseContent.substring(0, updatedMsgTickStart) + newMsgTick + "\n\n" + baseContent.substring(oldRecVisStart);
}

// 3. Body (Scroll area to end of return)
const bodyStartMarker = 'ref={scrollRef}';
const bodyStart = currentContent.lastIndexOf('<div', currentContent.indexOf(bodyStartMarker));
const bodyEndMarker = '      {/* ΓöÇΓöÇ Full Image Preview Overlay ΓöÇΓöÇ */}';
const bodyEnd = currentContent.indexOf(bodyEndMarker);

const oldBodyStart = baseContent.lastIndexOf('<div', baseContent.indexOf(bodyStartMarker));
const oldBodyEnd = baseContent.indexOf(bodyEndMarker);

if (bodyStart !== -1 && bodyEnd !== -1 && oldBodyStart !== -1 && oldBodyEnd !== -1) {
    const newBody = currentContent.substring(bodyStart, bodyEnd);
    baseContent = baseContent.substring(0, oldBodyStart) + newBody + baseContent.substring(oldBodyEnd);
}

fs.writeFileSync(currentFile, baseContent);
console.log('Successfully merged features from current into base');
