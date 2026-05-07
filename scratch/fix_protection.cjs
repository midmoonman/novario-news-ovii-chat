const fs = require('fs');
const path = require('path');

const filePath = path.join('src', 'components', 'novario', 'OViiChat.tsx');
let content = fs.readFileSync(filePath, 'utf8');

const protectionCode = `
  // Prevent accidental refresh while No Lock is active
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (noLockUntil && noLockUntil > Date.now()) {
        e.preventDefault();
        e.returnValue = "No Lock is currently active. Are you sure you want to refresh?";
        return e.returnValue;
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [noLockUntil]);
`;

if (!content.includes('window.addEventListener("beforeunload"')) {
    content = content.replace('// Close menu on click outside', protectionCode + '\n  // Close menu on click outside');
}

fs.writeFileSync(filePath, content);
console.log('Successfully added refresh protection to OViiChat.tsx');
