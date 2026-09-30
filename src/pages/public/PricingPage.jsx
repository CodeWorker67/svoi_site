import { useState, useEffect, useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Check, Minus, Plus, Zap, CreditCard } from 'lucide-react';
import {
  PAYMENT_METHODS,
  ROUTES,
  BRAND_NAME,
  MIN_TARIFF_PRICE,
  DEFAULT_DEVICES_MIN,
  DEFAULT_DEVICES_MAX,
  SUBSCRIPTION_MONTHS_OPTIONS,
} from '@utils/constants';
import { devicesLabel, estimateSubscriptionPrice } from '@utils/pricing';
import { configApi, paymentApi, trialApi } from '@services/api';
import useAuthStore from '@stores/authStore';
import Button from '@components/ui/Button';
import toast from 'react-hot-toast';

export default function PricingPage() {
  const [months, setMonths] = useState(3);
  const [devices, setDevices] = useState(DEFAULT_DEVICES_MIN);
  const [extraRub, setExtraRub] = useState({ 1: 50, 3: 120 });
  const [quote, setQuote] = useState(null);
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [trialLoading, setTrialLoading] = useState(false);
  const { isAuthenticated } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    configApi
      .tariffs()
      .then(({ data }) => {
        if (data?.extra_device_rub) setExtraRub(data.extra_device_rub);
        if (data?.devices_min) setDevices((d) => Math.max(data.devices_min, d));
      })
      .catch(() => {});
  }, []);

  const loadQuote = useCallback(() => {
    configApi
      .subscriptionQuote(months, devices)
      .then(({ data }) => setQuote(data))
      .catch(() => {
        setQuote({
          tariff_id: `m${months}_d${devices}`,
          price: estimateSubscriptionPrice(months, devices, extraRub),
          months,
          devices,
        });
      });
  }, [months, devices, extraRub]);

  useEffect(() => {
    loadQuote();
  }, [loadQuote]);

  const step = Number(extraRub[months] ?? extraRub[String(months)] ?? 50);

  const changeDevices = (delta) => {
    setDevices((d) => Math.min(DEFAULT_DEVICES_MAX, Math.max(DEFAULT_DEVICES_MIN, d + delta)));
    setSelectedMethod(null);
  };

  const handleTrialActivate = async () => {
    if (!isAuthenticated) {
      toast('Войдите, чтобы активировать триал', { icon: '🔑' });
      navigate(ROUTES.LOGIN);
      return;
    }
    setTrialLoading(true);
    try {
      const { data } = await trialApi.activate();
      if (data.success) {
        toast.success('Триал активирован! 1 день бесплатно');
        navigate(ROUTES.DASHBOARD);
      }
    } catch (err) {
      const msg =
        err.response?.data?.detail || err.response?.data?.error || 'Ошибка активации триала';
      toast.error(typeof msg === 'string' ? msg : 'Ошибка активации триала');
    } finally {
      setTrialLoading(false);
    }
  };

  const handlePurchase = async () => {
    if (!isAuthenticated) {
      toast('Войдите, чтобы оплатить', { icon: '🔑' });
      navigate(ROUTES.LOGIN);
      return;
    }
    if (!quote?.tariff_id || !selectedMethod) return;
    setIsProcessing(true);
    try {
      const { data } = await paymentApi.createPayment({
        tariff_id: quote.tariff_id,
        method: selectedMethod,
      });
      if (data.payment_url) {
        window.location.href = data.payment_url;
      } else {
        toast.error('Не удалось создать платёж');
      }
    } catch (err) {
      const msg = err.response?.data?.detail || 'Ошибка при создании платежа';
      toast.error(typeof msg === 'string' ? msg : 'Ошибка при создании платежа');
    } finally {
      setIsProcessing(false);
    }
  };

  const price = quote?.price ?? estimateSubscriptionPrice(months, devices, extraRub);
  const days = quote?.days ?? (months === 3 ? 90 : 30);

  return (
    <>
      <Helmet>
        <title>Тарифы — {BRAND_NAME}</title>
        <meta
          name="description"
          content={`Тарифы ${BRAND_NAME} от ${MIN_TARIFF_PRICE} руб. Безлимитный трафик, 5–15 устройств.`}
        />
      </Helmet>

      <section className="py-20 relative">
        <div className="absolute inset-0 bg-radial-glow" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">
              Выбери свой <span className="text-gradient">тариф</span>
            </h1>
            <p className="text-gray-400 text-lg">3 или 1 месяц · от 5 до 15 устройств · 1 день бесплатно</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="glass-card p-6 mb-8 text-center"
          >
            <div className="flex items-center justify-center gap-2 mb-2">
              <Zap className="w-5 h-5 text-yellow-400" />
              <span className="text-lg font-semibold text-white">1 день бесплатно</span>
            </div>
            <p className="text-gray-400 text-sm mb-4">
              5 устройств, антиглушилка 2 GB. Без привязки карты.
            </p>
            <Button
              onClick={handleTrialActivate}
              disabled={trialLoading}
              className={`px-6 py-2 text-sm ${trialLoading ? 'opacity-50' : ''}`}
            >
              {trialLoading ? 'Активируем…' : 'Активировать бесплатно'}
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="card-dark mb-8"
          >
            <h2 className="text-white font-semibold mb-4 text-center">Срок подписки</h2>
            <div className="grid grid-cols-2 gap-3">
              {SUBSCRIPTION_MONTHS_OPTIONS.map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => {
                    setMonths(m);
                    setSelectedMethod(null);
                  }}
                  className={`p-4 rounded-xl border text-center transition-all ${
                    months === m
                      ? 'surface-metallic border-transparent shadow-neon'
                      : 'border-zoomer-border bg-zoomer-card text-gray-400 hover:border-white/20'
                  }`}
                >
                  <div className="text-lg font-bold text-white">{m} {m === 1 ? 'месяц' : 'месяца'}</div>
                  <div className="text-xs text-gray-500 mt-1">
                    от {estimateSubscriptionPrice(m, DEFAULT_DEVICES_MIN, extraRub)} ₽
                  </div>
                </button>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="card-dark mb-8"
          >
            <h2 className="text-white font-semibold mb-4 text-center">Кол-во устройств</h2>
            <div className="flex items-center justify-center gap-4 mb-4">
              <button
                type="button"
                disabled={devices <= DEFAULT_DEVICES_MIN}
                onClick={() => changeDevices(-1)}
                className="p-3 rounded-xl bg-white/5 border border-zoomer-border disabled:opacity-40"
              >
                <Minus className="w-5 h-5 text-white" />
              </button>
              <div className="text-2xl font-bold text-white min-w-[8rem] text-center">
                {devicesLabel(devices)}
              </div>
              <button
                type="button"
                disabled={devices >= DEFAULT_DEVICES_MAX}
                onClick={() => changeDevices(1)}
                className="p-3 rounded-xl bg-white/5 border border-zoomer-border disabled:opacity-40"
              >
                <Plus className="w-5 h-5 text-white" />
              </button>
            </div>
            <p className="text-center text-sm text-gray-500">
              ±1 устройство: {step} ₽ к сумме тарифа
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="card-dark mb-8 text-center"
          >
            <div className="text-gray-400 text-sm mb-2">Итого</div>
            <div className="text-4xl font-bold text-white mb-1">
              {price} <span className="text-lg text-gray-400">₽</span>
            </div>
            <div className="text-xs text-gray-500">~{Math.round(price / days)} ₽/день</div>
            <ul className="mt-6 space-y-2 text-sm text-gray-400 text-left max-w-xs mx-auto">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-zoomer-green" />
                Безлимит трафик
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-zoomer-green" />
                {devicesLabel(devices)} одновременно
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-zoomer-green" />
                26 серверов
              </li>
            </ul>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h3 className="text-lg font-semibold text-white text-center mb-4">Способ оплаты</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6 max-w-md mx-auto">
              {PAYMENT_METHODS.map((method) => {
                const Icon = method.icon === 'CreditCard' ? CreditCard : Zap;
                return (
                  <button
                    key={method.id}
                    type="button"
                    onClick={() => setSelectedMethod(method.id)}
                    className={`p-4 rounded-xl border text-center transition-all ${
                      selectedMethod === method.id
                        ? 'surface-metallic border-transparent shadow-neon'
                        : 'border-zoomer-border bg-zoomer-card text-gray-400 hover:border-white/20'
                    }`}
                  >
                    <Icon className="w-5 h-5 mx-auto mb-2" />
                    <div className="text-xs font-medium">{method.label}</div>
                  </button>
                );
              })}
            </div>

            <Button
              onClick={handlePurchase}
              disabled={!selectedMethod || isProcessing}
              className={`w-full max-w-md mx-auto block text-base sm:text-lg py-3 sm:py-4 ${
                !selectedMethod || isProcessing ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {isProcessing ? 'Создаём платёж…' : 'Оплатить'}
            </Button>
          </motion.div>
        </div>
      </section>
    </>
  );
}
