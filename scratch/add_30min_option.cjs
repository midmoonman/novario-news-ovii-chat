const fs = require('fs');
const path = require('path');

const filePath = path.join('src', 'components', 'novario', 'OViiChat.tsx');
let content = fs.readFileSync(filePath, 'utf8');

const oldOptions = `                            {[
                              { label: "15 Minutes", val: 15 * 60 * 1000 },
                              { label: "1 Hour", val: 60 * 60 * 1000 },`;

const newOptions = `                            {[
                              { label: "15 Minutes", val: 15 * 60 * 1000 },
                              { label: "30 Minutes", val: 30 * 60 * 1000 },
                              { label: "1 Hour", val: 60 * 60 * 1000 },`;

content = content.replace(oldOptions, newOptions);

fs.writeFileSync(filePath, content);
console.log('Successfully added 30 Minutes option to No Lock');
