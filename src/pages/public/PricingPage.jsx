import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Check, Star, Zap, CreditCard } from 'lucide-react';
import {
  TARIFFS,
  PAYMENT_METHODS,
  ROUTES,
  BRAND_NAME,
  DEVICE_TIERS,
  getTariffsByDevices,
  MIN_TARIFF_PRICE,
} from '@utils/constants';
import { paymentApi } from '@services/api';
import useAuthStore from '@stores/authStore';
import Button from '@components/ui/Button';
import toast from 'react-hot-toast';

export default function PricingPage() {
  const [selectedDevices, setSelectedDevices] = useState(5);
  const [selectedTariff, setSelectedTariff] = useState(null);
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const { isAuthenticated } = useAuthStore();
  const navigate = useNavigate();

  const proTariffs = getTariffsByDevices(selectedDevices);

  const handleDeviceChange = (devices) => {
    setSelectedDevices(devices);
    setSelectedTariff(null);
    setSelectedMethod(null);
  };

  const handlePurchase = async () => {
    if (!isAuthenticated) {
      toast('Войдите, чтобы оплатить', { icon: '🔑' });
      navigate(ROUTES.LOGIN);
      return;
    }
    if (!selectedTariff || !selectedMethod) return;
    setIsProcessing(true);
    try {
      const { data } = await paymentApi.createPayment({
        tariff_id: selectedTariff,
        method: selectedMethod,
      });
      if (data.payment_url) {
        window.location.href = data.payment_url;
      } else {
        toast.error('Не удалось создать платёж');
      }
    } catch (err) {
      const msg = err.response?.data?.detail || 'Ошибка при создании платежа';
      toast.error(msg);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Тарифы — {BRAND_NAME}</title>
        <meta
          name="description"
          content={`Тарифы ${BRAND_NAME} от ${MIN_TARIFF_PRICE} руб. Безлимитный трафик, до 10 устройств, 26 серверов.`}
        />
      </Helmet>

      <section className="py-20 relative">
        <div className="absolute inset-0 bg-radial-glow" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">
              Выбери свой <span className="text-gradient">тариф</span>
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Безлимитный трафик и скорость. Без скрытых платежей.
            </p>
          </motion.div>

          {/* Device tier selector */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="flex justify-center mb-10"
          >
            <div className="inline-flex gap-1 p-1 bg-zoomer-card rounded-xl border border-zoomer-border">
              {DEVICE_TIERS.map((devices) => (
                <button
                  key={devices}
                  onClick={() => handleDeviceChange(devices)}
                  className={`px-4 sm:px-6 py-2.5 rounded-lg text-sm font-medium transition-all ${
                    selectedDevices === devices
                      ? 'surface-metallic shadow-neon'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {devices} {devices === 3 ? 'устройства' : 'устройств'}
                </button>
              ))}
            </div>
          </motion.div>

          {/* PRO tariffs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12 max-w-5xl mx-auto">
            {proTariffs.map((tariff, index) => (
              <motion.div
                key={tariff.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.05 }}
                onClick={() => setSelectedTariff(tariff.id)}
                className={`relative card-dark cursor-pointer text-center ${
                  selectedTariff === tariff.id
                    ? 'border-zoomer-neon ring-2 ring-zoomer-neon/50'
                    : ''
                } ${tariff.popular ? 'border-zoomer-neon/20' : ''}`}
              >
                {(tariff.popular || tariff.badge) && (
                  <div
                    className={`absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 ${
                      tariff.promo
                        ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white'
                        : 'surface-metallic'
                    }`}
                  >
                    {tariff.popular && <Star className="w-3 h-3" />}
                    {tariff.badge || 'Популярный'}
                  </div>
                )}

                <div className="text-gray-400 text-sm mb-3 mt-2">{tariff.label}</div>
                <div className="text-3xl font-bold text-white mb-1">
                  {tariff.price}
                  <span className="text-base text-gray-400 ml-1">руб</span>
                </div>
                <div className="text-xs text-gray-500 mb-4">
                  ~{Math.round(tariff.price / tariff.days)} руб/день
                </div>

                <ul className="space-y-2 text-xs text-gray-400 text-left">
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-zoomer-green flex-shrink-0" />
                    Безлимит трафик
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-zoomer-green flex-shrink-0" />
                    До {tariff.devices} устройств
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-zoomer-green flex-shrink-0" />
                    26 серверов
                  </li>
                </ul>
              </motion.div>
            ))}
          </div>

          {selectedTariff && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-md mx-auto"
            >
              <h3 className="text-lg font-semibold text-white text-center mb-4">Способ оплаты</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                {PAYMENT_METHODS.map((method) => {
                  const icons = { Zap, CreditCard };
                  const Icon = icons[method.icon] || Zap;
                  return (
                    <button
                      key={method.id}
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
                className={`w-full text-base sm:text-lg py-3 sm:py-4 ${
                  !selectedMethod || isProcessing ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {isProcessing
                  ? 'Создаём платёж...'
                  : `Оплатить ${TARIFFS.find((t) => t.id === selectedTariff)?.price} руб`}
              </Button>
            </motion.div>
          )}
        </div>
      </section>
    </>
  );
}
