const fs = require('fs');
const path = require('path');

const filePath = path.join('src', 'components', 'novario', 'LanguageMenu.tsx');
let content = fs.readFileSync(filePath, 'utf8');

const oldEffect = `  useEffect(() => {
    if (open && btnRef.current) {
      const rect = btnRef.current.getBoundingClientRect();
      const vw = window.innerWidth;
      const dropW = Math.min(320, vw - 16);
      let left = rect.right - dropW;
      left = Math.max(8, Math.min(left, vw - dropW - 8));
      setDropdownPos({ top: rect.bottom + 8, left, width: dropW });
    }
  }, [open]);`;

// Since I might have deleted it in a previous turn (it returned SUCCESS but with deletion)
// I'll check if it's there first.
if (!content.includes('window.addEventListener("scroll"')) {
    const newEffect = `  useEffect(() => {
    const updatePos = () => {
      if (open && btnRef.current) {
        const rect = btnRef.current.getBoundingClientRect();
        const vw = window.innerWidth;
        const dropW = Math.min(320, vw - 16);
        let left = rect.right - dropW;
        left = Math.max(8, Math.min(left, vw - dropW - 8));
        setDropdownPos({ top: rect.bottom + 8, left, width: dropW });
      }
    };
    
    updatePos();
    if (open) {
      window.addEventListener("scroll", updatePos, true);
      window.addEventListener("resize", updatePos);
    }
    return () => {
      window.removeEventListener("scroll", updatePos, true);
      window.removeEventListener("resize", updatePos);
    };
  }, [open]);`;

    if (content.includes(oldEffect)) {
        content = content.replace(oldEffect, newEffect);
    } else {
        // Find where to insert it (after the lang sync effect)
        content = content.replace('  }, [lang]);', '  }, [lang]);\n\n' + newEffect);
    }
}

fs.writeFileSync(filePath, content);
console.log('Successfully updated LanguageMenu to be scroll-aware');
