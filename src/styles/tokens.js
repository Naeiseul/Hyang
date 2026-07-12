// Sovereign design tokens

export const FONT = "'Segoe UI','Helvetica Neue',sans-serif";
export const SERIF = "'Georgia','Times New Roman',serif";
export const MONO = "'JetBrains Mono','Fira Code',ui-monospace,monospace";
export const HANGUL = "'Noto Sans KR','Pretendard',sans-serif";

// Frosted dark glass surface (inner pages)
export const GLASS = 'rgba(255,255,255,0.06)';
export const GLASS_BORDER = '1px solid rgba(255,255,255,0.08)';

// Inner-page text colours (over the dark BG)
export const TEXT = '#f0f0f0';
export const SUB_TEXT = '#999';
export const BG = '#0f0f1a';

// Pen-state accents tuned for the dark surface.
// Originals in pen.js stay as the canonical pen identity.
export const DARK_PEN_ACCENTS = {
  purple: '#9277E0',
  pink:   '#D4617A',
  navy:   '#5B7DA0',
};

export const COLORS = {
  purple: '#7C3AED',
  blue: '#378ADD',
  green: '#2D8A4E',
  orange: '#E2711D',
  amber: '#BA7517',
  red: '#E24B4A',
  rose: '#D4617A',
  ink: '#1a1a1a',
  soft: '#888',
};

export const PASSWORD_HASH =
  '08fa73170384094852a9b941359f0e3fcf00a6ee673c307009a18dedfc12ec28';

export async function sha256(text) {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text));
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

export const LS = {
  get(k, fallback = null) {
    try {
      const v = localStorage.getItem(k);
      return v ? JSON.parse(v) : fallback;
    } catch {
      return fallback;
    }
  },
  set(k, v) {
    try {
      localStorage.setItem(k, JSON.stringify(v));
    } catch {}
  },
  del(k) {
    try {
      localStorage.removeItem(k);
    } catch {}
  },
};

export const AUTH_KEY = 'sovereign-auth';
