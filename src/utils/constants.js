export const ROUTES = {
  HOME: '/',
  PRICING: '/pricing',
  SETUP: '/setup',
  SUPPORT: '/support',
  LOGIN: '/login',
  /** Редирект Telegram Login Widget (data-auth-url), без popup postMessage */
  LOGIN_TELEGRAM_CALLBACK: '/login/telegram-callback',
  /** Одноразовая ссылка из Telegram-бота (?token=…) */
  LOGIN_BOT: '/auth/bot',
  DASHBOARD: '/dashboard',
  CHECKOUT: '/checkout',
  SUCCESS: '/success',
  PRIVACY_POLICY: '/privacy',
  TERMS: '/terms',
};

export const BRAND_NAME = 'Open21 VPN';

function telegramHandleFromUrl(url, fallback = '') {
  const match = String(url || '').match(/t\.me\/([^/?#]+)/i);
  return match ? `@${match[1]}` : fallback;
}

const telegramBotUrl =
  import.meta.env.VITE_TELEGRAM_BOT_URL || 'https://t.me/fastmobilevpnbot';
const telegramSupportUrl =
  import.meta.env.VITE_TELEGRAM_SUPPORT_URL || 'https://t.me/goSocialsupp';

export const TELEGRAM = {
  BOT_URL: telegramBotUrl,
  BOT_NAME: import.meta.env.VITE_TELEGRAM_BOT_NAME || 'fastmobilevpnbot',
  SUPPORT_URL: telegramSupportUrl,
  SUPPORT_HANDLE: telegramHandleFromUrl(telegramSupportUrl, '@goSocialsupp'),
  CHANNEL_URL: 'https://t.me/zoomerskydostup',
};

export const PRO_SUBSCRIPTION_LABEL = 'Подписка PRO - соцсети';

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

export const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || '';

// Тарифы 21OpenVPN API: GET /api/config/tariffs (30 / 90 / 365)
export const TARIFFS = [
  { id: '30',  label: '1 месяц',  price: 349,  days: 30,  devices: 5, type: 'pro' },
  { id: '90',  label: '3 месяца (выгода −30%)',  price: 749,  days: 90,  devices: 5, type: 'pro', popular: true },
  { id: '365', label: '12 месяцев (выгода −60%)', price: 1799, days: 365, devices: 5, type: 'pro' },
];

export const PAYMENT_METHODS = [
  { id: 'sbp',    label: 'СБП',        icon: 'Zap' },
  { id: 'card',   label: 'Карта РФ',   icon: 'CreditCard' },
];

export const FEATURES = [
  {
    icon: 'Shield',
    title: 'VLESS Reality',
    description: 'Самый защищённый протокол. Трафик неотличим от обычного HTTPS.',
  },
  {
    icon: 'Zap',
    title: 'До 10 Гбит/с',
    description: 'Серверы на быстрых каналах. YouTube, стримы, игры без тормозов.',
  },
  {
    icon: 'Globe',
    title: '4 страны',
    description: 'Германия, Нидерланды, Польша, США. Выбирай ближайший сервер.',
  },
  {
    icon: 'Smartphone',
    title: 'До 5 устройств',
    description: 'Одна подписка на телефон, ноутбук, планшет и другие устройства одновременно.',
  },
  {
    icon: 'Infinity',
    title: 'Без лимитов',
    description: 'Никаких ограничений по трафику и скорости. Безлимит.',
  },
  {
    icon: 'Clock',
    title: '24/7 поддержка',
    description: 'Telegram-бот и живая поддержка. Ответим быстро.',
  },
];
