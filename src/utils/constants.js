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

export const TELEGRAM = {
  BOT_URL: 'https://t.me/zoomerskyvpn_bot',
  BOT_NAME: import.meta.env.VITE_TELEGRAM_BOT_NAME || 'zoomerskyvpn_bot',
  SUPPORT_URL: 'https://t.me/suppzoomvpn',
  CHANNEL_URL: 'https://t.me/zoomerskydostup',
};

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

export const GOOGLE_CLIENT_ID = '936653148340-kvcp09r27i3q37n0g4qm5s623t868gk5.apps.googleusercontent.com';

export const TARIFFS = [
  { id: '7',    label: 'Неделя',    price: 99,  days: 7,   devices: 3, type: 'pro' },
  { id: '30',   label: '30 дней',   price: 249, days: 30,  devices: 3, type: 'pro' },
  { id: '90',   label: '90 дней (выгода −40%)', price: 539, days: 90, devices: 3, type: 'pro', popular: true },
  { id: '180',  label: '180 дней (выгода −50%)', price: 999, days: 180, devices: 3, type: 'pro' },
  { id: 'white_30', label: 'Ускоритель игр Mobile', price: 399, days: 30, devices: 1, type: 'mobile', badge: 'Mobile' },
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
    title: 'До 3 устройств',
    description: 'Одна подписка на телефон, ноутбук и планшет одновременно.',
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
