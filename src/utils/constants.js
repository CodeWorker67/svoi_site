export const ROUTES = {
  HOME: '/',
  PRICING: '/pricing',
  SETUP: '/setup',
  SUPPORT: '/support',
  LOGIN: '/login',
  LOGIN_TELEGRAM_CALLBACK: '/login/telegram-callback',
  LOGIN_BOT: '/auth/bot',
  DASHBOARD: '/dashboard',
  ADD_DEVICE: '/add_device',
  CHECKOUT: '/checkout',
  SUCCESS: '/success',
  PRIVACY_POLICY: '/privacy',
  TERMS: '/terms',
  GIFT: '/gift',
  TRAFFIC_BUY: '/traffic_buy',
};

export const BRAND_NAME = 'Для Своих';

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

export const PRO_SUBSCRIPTION_LABEL = 'Подписка PRO';

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

export const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || '';

/** Базовый слот основной подписки (legacy 3/10 — только если активны в API). */
export const MAIN_SUBSCRIPTION_SLOT_KEY = 'pro_5';

/** Мин. цена «от … руб» на главной (~3 мес / 3). */
export const MIN_TARIFF_PRICE = 249;

export const DEFAULT_DEVICES_MIN = 5;
export const DEFAULT_DEVICES_MAX = 15;
export const SUBSCRIPTION_MONTHS_OPTIONS = [3, 1];

export const PAYMENT_METHODS = [
  { id: 'sbp', label: 'СБП', icon: 'Zap' },
  { id: 'card', label: 'Карта РФ', icon: 'CreditCard' },
];

export const TRAFFIC_PACKAGES = [
  { gb: '500', price: 1249 },
  { gb: '250', price: 629 },
  { gb: '100', price: 259 },
  { gb: '50', price: 149 },
  { gb: '20', price: 79 },
  { gb: '10', price: 50 },
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
    title: 'До 15 устройств',
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
