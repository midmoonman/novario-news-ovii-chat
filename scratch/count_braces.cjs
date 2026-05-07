const fs = require('fs');
const path = require('path');

const filePath = path.join('src', 'components', 'novario', 'OViiChat.tsx');
let content = fs.readFileSync(filePath, 'utf8');

let openCount = 0;
let closeCount = 0;
for (let char of content) {
    if (char === '{') openCount++;
    if (char === '}') closeCount++;
}

console.log('Open:', openCount, 'Close:', closeCount);

if (openCount !== closeCount) {
    console.log('Mismatch found!');
}
