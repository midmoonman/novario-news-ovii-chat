// Web Crypto API - End-to-End Encryption for Ovii Chat
// Uses AES-GCM symmetric encryption. Key is derived from roomId.

const ALGO = "AES-GCM";
const KEY_LENGTH = 256;

async function deriveKey(roomId: string): Promise<CryptoKey> {
  const enc = new TextEncoder();
  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    enc.encode(roomId.padEnd(32, "0").slice(0, 32)),
    { name: "PBKDF2" },
    false,
    ["deriveKey"]
  );
  return crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt: enc.encode("ovii-salt-2024"),
      iterations: 100000,
      hash: "SHA-256",
    },
    keyMaterial,
    { name: ALGO, length: KEY_LENGTH },
    false,
    ["encrypt", "decrypt"]
  );
}

export async function encryptMessage(text: string, roomId: string): Promise<string> {
  try {
    const key = await deriveKey(roomId);
    const iv = crypto.getRandomValues(new Uint8Array(12));
    const enc = new TextEncoder();
    const encrypted = await crypto.subtle.encrypt(
      { name: ALGO, iv },
      key,
      enc.encode(text)
    );
    const combined = new Uint8Array(iv.length + encrypted.byteLength);
    combined.set(iv);
    combined.set(new Uint8Array(encrypted), iv.length);
    return btoa(String.fromCharCode(...combined));
  } catch {
    return text; // fallback
  }
}

export async function decryptMessage(ciphertext: string, roomId: string): Promise<string> {
  try {
    const key = await deriveKey(roomId);
    const combined = Uint8Array.from(atob(ciphertext), (c) => c.charCodeAt(0));
    const iv = combined.slice(0, 12);
    const data = combined.slice(12);
    const decrypted = await crypto.subtle.decrypt({ name: ALGO, iv }, key, data);
    return new TextDecoder().decode(decrypted);
  } catch {
    return ciphertext; // fallback
  }
}
