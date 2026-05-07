const fs = require('fs');
const path = require('path');

const filePath = path.join('src', 'components', 'novario', 'OViiChat.tsx');
let content = fs.readFileSync(filePath, 'utf8');

// Find line 1161 approx: '</div>{/* end body */}'
// I'll search for '</div>{/* end body */}'
const target = '</div>{/* end body */}';
const replacement = '</div>{/* end msgs-col */}\n          </div>{/* end body */}';

if (content.includes(target)) {
    content = content.replace(target, replacement);
    console.log('Fixed missing div');
} else {
    console.log('Target not found');
}

fs.writeFileSync(filePath, content);
