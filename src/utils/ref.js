export const REF_STORAGE_KEY = 'friends_ref';
export const REF_START_PARAM = 'start';

function normalizeRefId(raw) {
  if (!raw || typeof raw !== 'string') return null;
  let s = raw.trim();
  if (s.startsWith('ref')) {
    s = s.slice(3).trim();
  }
  if (!/^-?\d+$/.test(s)) return null;
  const n = Number(s);
  if (!Number.isFinite(n) || n === 0) return null;
  return String(n);
}

export function captureRefFromUrl() {
  if (typeof window === 'undefined') return;

  const params = new URLSearchParams(window.location.search);
  const raw = params.get(REF_START_PARAM);
  const ref = normalizeRefId(raw);

  if (ref && !getStoredRef()) {
    try {
      localStorage.setItem(REF_STORAGE_KEY, ref);
    } catch {
      try {
        sessionStorage.setItem(REF_STORAGE_KEY, ref);
      } catch {
        // ignore
      }
    }
  }

  if (raw !== null && params.has(REF_START_PARAM) && raw.startsWith('ref')) {
    params.delete(REF_START_PARAM);
    const qs = params.toString();
    const next = `${window.location.pathname}${qs ? `?${qs}` : ''}${window.location.hash}`;
    window.history.replaceState(null, '', next);
  }
}

export function getStoredRef() {
  if (typeof window === 'undefined') return null;

  for (const storage of [localStorage, sessionStorage]) {
    try {
      const stored = storage.getItem(REF_STORAGE_KEY);
      const ref = normalizeRefId(stored);
      if (ref) {
        if (storage === sessionStorage) {
          try {
            localStorage.setItem(REF_STORAGE_KEY, ref);
          } catch {
            // keep session-only copy
          }
        }
        return ref;
      }
      if (stored) {
        storage.removeItem(REF_STORAGE_KEY);
      }
    } catch {
      // storage unavailable
    }
  }

  return null;
}

export function clearStoredRef() {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(REF_STORAGE_KEY);
  } catch {
    // ignore
  }
  try {
    sessionStorage.removeItem(REF_STORAGE_KEY);
  } catch {
    // ignore
  }
}
