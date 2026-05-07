const fs = require('fs');
const path = require('path');

const filePath = path.join('src', 'components', 'novario', 'OViiChat.tsx');
let content = fs.readFileSync(filePath, 'utf8');

// Add import
if (!content.includes('writeBatch')) {
    content = content.replace('setDoc, getDocs', 'setDoc, getDocs, writeBatch');
}

// Add function
const clearChatCode = `
  const clearChat = async () => {
    if (!confirm("Are you sure you want to clear all messages? This cannot be undone.")) return;
    try {
      const q = query(collection(db, "ovii", ROOM, "messages"));
      const snapshot = await getDocs(q);
      if (snapshot.empty) {
        toast.info("Chat is already empty");
        setShowMenu(false);
        return;
      }
      const batch = writeBatch(db);
      snapshot.docs.forEach((d) => batch.delete(d.ref));
      await batch.commit();
      toast.success(\`Cleared \${snapshot.docs.length} messages\`);
      setShowMenu(false);
    } catch (e) {
      console.error("Clear Chat Error:", e);
      toast.error(\`Failed: \${e.message || "Unknown error"}\`);
    }
  };
`;

if (!content.includes('const clearChat = async')) {
    content = content.replace('const unreadMedia = mediaMsgs.length;', 'const unreadMedia = mediaMsgs.length;' + clearChatCode);
}

fs.writeFileSync(filePath, content);
console.log('Successfully updated OViiChat.tsx');
