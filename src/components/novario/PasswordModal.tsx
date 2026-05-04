import { useState } from "react";
import { motion } from "framer-motion";

export function PasswordModal({ onUnlock }: { onUnlock: () => void }) {
  const [val, setVal] = useState("");
  const [err, setErr] = useState("");
  const [shake, setShake] = useState(0);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (val === "112233") {
      onUnlock();
    } else {
      setErr("Wrong key. Try again.");
      setShake((s) => s + 1);
    }
  };

  const [showHint, setShowHint] = useState(false);

  return (
    <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-xl flex items-center justify-center p-4">
      <motion.form
        key={shake}
        onSubmit={submit}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0, x: shake > 0 ? [0, -10, 10, -8, 8, 0] : 0 }}
        transition={{ duration: 0.45 }}
        className="w-full max-w-sm rounded-2xl border border-border bg-card p-8 shadow-elegant"
      >
        <div className="text-center mb-6">
          <div className="mx-auto mb-4 h-14 w-14 rounded-full gradient-gold flex items-center justify-center text-2xl">🔒</div>
          <h1 className="serif text-2xl font-bold">OVii</h1>
          <p className="text-xs text-muted-foreground mt-1">Private channel · enter key to continue</p>
        </div>
        <input
          type="password"
          autoFocus
          value={val}
          onChange={(e) => { setVal(e.target.value); setErr(""); }}
          placeholder="••••••"
          className="w-full text-center tracking-[0.6em] text-lg rounded-lg bg-background border border-border px-4 py-3 focus:border-primary focus:outline-none"
        />
        {err && <div className="mt-3 text-xs text-destructive text-center">{err}</div>}
        <button type="submit" className="mt-5 w-full rounded-lg bg-primary text-primary-foreground py-3 font-bold hover:opacity-90">
          Unlock
        </button>
        
        <button type="button" onClick={() => setShowHint(!showHint)} className="mt-3 w-full text-xs text-muted-foreground hover:text-primary transition-colors">
          Forgot PIN
        </button>
        
        {showHint && (
          <div className="mt-3 p-3 bg-muted/50 rounded-lg text-center border border-border">
            <span className="block text-xl font-bold text-primary mb-1">आँसू</span>
            <span className="text-xs text-muted-foreground tracking-[0.3em]">अ आ इ ई उ ऊ</span>
          </div>
        )}

        <div className="mt-4 text-center text-[10px] text-muted-foreground/70 uppercase tracking-widest">
          end-to-anonymous
        </div>
      </motion.form>
    </div>
  );
}
