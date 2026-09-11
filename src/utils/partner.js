export const PARTNER_STORAGE_KEY = 'friends_partner';
export const PARTNER_START_PARAM = 'start';

const PARTNER_ID_RE = /^[1-9]\d{0,19}$/;

function normalizePartnerId(raw) {
  if (!raw || typeof raw !== 'string') return null;
  let s = raw.trim();
  if (s.startsWith('partner_')) {
    s = s.slice('partner_'.length);
  }
  if (!PARTNER_ID_RE.test(s)) return null;
  return s;
}

export function capturePartnerFromUrl() {
  if (typeof window === 'undefined') return;

  const params = new URLSearchParams(window.location.search);
  const raw = params.get(PARTNER_START_PARAM);
  const partner = normalizePartnerId(raw);

  if (partner && !getStoredPartner()) {
    try {
      localStorage.setItem(PARTNER_STORAGE_KEY, partner);
    } catch {
      try {
        sessionStorage.setItem(PARTNER_STORAGE_KEY, partner);
      } catch {
        // ignore — браузер может блокировать storage
      }
    }
  }

  if (raw !== null && params.has(PARTNER_START_PARAM) && raw.startsWith('partner_')) {
    params.delete(PARTNER_START_PARAM);
    const qs = params.toString();
    const next = `${window.location.pathname}${qs ? `?${qs}` : ''}${window.location.hash}`;
    window.history.replaceState(null, '', next);
  }
}

export function getStoredPartner() {
  if (typeof window === 'undefined') return null;

  for (const storage of [localStorage, sessionStorage]) {
    try {
      const stored = storage.getItem(PARTNER_STORAGE_KEY);
      const partner = normalizePartnerId(stored);
      if (partner) {
        if (storage === sessionStorage) {
          try {
            localStorage.setItem(PARTNER_STORAGE_KEY, partner);
          } catch {
            // keep session-only copy
          }
        }
        return partner;
      }
      if (stored) {
        storage.removeItem(PARTNER_STORAGE_KEY);
      }
    } catch {
      // storage недоступен (private mode и т.п.)
    }
  }

  return null;
}

export function clearStoredPartner() {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(PARTNER_STORAGE_KEY);
  } catch {
    // ignore
  }
  try {
    sessionStorage.removeItem(PARTNER_STORAGE_KEY);
  } catch {
    // ignore
  }
}
