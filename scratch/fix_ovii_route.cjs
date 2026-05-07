const fs = require('fs');
const path = require('path');

const filePath = path.join('src', 'routes', 'ovii.tsx');
let content = fs.readFileSync(filePath, 'utf8');

const newInit = `
function OViiPage() {
  const [unlocked, setUnlocked] = useState(() => {
    const noLockUntil = localStorage.getItem("ovii_no_lock_until");
    if (noLockUntil && parseInt(noLockUntil) > Date.now()) {
      return true;
    }
    return false;
  });
`;

content = content.replace('function OViiPage() {\n  const [unlocked, setUnlocked] = useState(false);', newInit);

fs.writeFileSync(filePath, content);
console.log('Successfully updated OViiPage to persist unlock state');
