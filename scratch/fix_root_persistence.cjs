const fs = require('fs');
const path = require('path');

const filePath = path.join('src', 'routes', '__root.tsx');
let content = fs.readFileSync(filePath, 'utf8');

const newInit = `
function RootComponent() {
  const [showOvii, setShowOvii] = useState(() => {
    const noLockUntil = localStorage.getItem("ovii_no_lock_until");
    return (noLockUntil && parseInt(noLockUntil) > Date.now());
  });
  const [unlocked, setUnlocked] = useState(() => {
    const noLockUntil = localStorage.getItem("ovii_no_lock_until");
    return (noLockUntil && parseInt(noLockUntil) > Date.now());
  });
`;

content = content.replace('function RootComponent() {\n  const [showOvii, setShowOvii] = useState(false);\n  const [unlocked, setUnlocked] = useState(false);', newInit);

fs.writeFileSync(filePath, content);
console.log('Successfully updated RootComponent to persist chat state');
