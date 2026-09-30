import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Zap, CreditCard } from 'lucide-react';
import { BRAND_NAME, PAYMENT_METHODS, ROUTES } from '@utils/constants';
import { devicesLabel } from '@utils/pricing';
import { paymentApi, userApi } from '@services/api';
import Button from '@components/ui/Button';
import toast from 'react-hot-toast';

function formatEndDate(iso) {
  if (!iso) return '—';
  try {
    const d = new Date(iso);
    return d.toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch {
    return iso;
  }
}

export default function AddDevicePage() {
  const [info, setInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedAdd, setSelectedAdd] = useState(null);
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    userApi
      .addDevicesOptions()
      .then(({ data }) => setInfo(data))
      .catch((err) => {
        if (err.response?.status === 403) {
          setInfo({ forbidden: true });
        } else {
          toast.error('Не удалось загрузить данные');
        }
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="py-20 min-h-screen flex items-center justify-center text-gray-400">
        Загрузка…
      </div>
    );
  }

  if (info?.forbidden) {
    return <Navigate to={ROUTES.DASHBOARD} replace />;
  }

  if (!info?.options?.length) {
    return (
      <section className="py-20 min-h-screen">
        <div className="max-w-lg mx-auto px-4 card-dark text-center">
          <p className="text-gray-300 mb-6">
            {info?.max_add === 0
              ? 'Достигнут лимит устройств (15).'
              : 'Добавление устройств недоступно.'}
          </p>
          <Link to={ROUTES.DASHBOARD}>
            <Button className="w-full">В личный кабинет</Button>
          </Link>
        </div>
      </section>
    );
  }

  const handlePay = async () => {
    if (!selectedAdd || !selectedMethod) return;
    setIsProcessing(true);
    try {
      const { data } = await paymentApi.createAddDevicesPayment({
        add_count: selectedAdd,
        method: selectedMethod,
      });
      if (data.payment_url) {
        window.location.href = data.payment_url;
      } else {
        toast.error('Не удалось создать платёж');
      }
    } catch (err) {
      const msg = err.response?.data?.detail || 'Ошибка оплаты';
      toast.error(typeof msg === 'string' ? msg : 'Ошибка оплаты');
    } finally {
      setIsProcessing(false);
    }
  };

  const selectedOption = info.options.find((o) => o.add_count === selectedAdd);

  return (
    <>
      <Helmet>
        <title>Добавить устройство — {BRAND_NAME}</title>
      </Helmet>

      <section className="py-20 min-h-screen">
        <div className="max-w-lg mx-auto px-4 sm:px-6">
          <button
            type="button"
            onClick={() => navigate(ROUTES.DASHBOARD)}
            className="flex items-center gap-2 text-gray-400 hover:text-white mb-8 text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Личный кабинет
          </button>

          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="card-dark mb-6">
            <h1 className="text-xl font-bold text-white mb-4">Добавить устройство</h1>
            <p className="text-gray-300 text-sm mb-2">
              У вас подписка на <b className="text-white">{devicesLabel(info.current_devices)}</b>
            </p>
            <p className="text-gray-400 text-sm">
              Дата окончания подписки — {formatEndDate(info.subscription_end)}
            </p>
            {info.billable_months > 0 && (
              <p className="text-gray-500 text-xs mt-2">
                Расчёт до конца срока: {info.billable_months} мес. (округление по 30 дней)
              </p>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="card-dark mb-6"
          >
            <h2 className="text-white font-semibold mb-4">Выберите кол-во устройств к добавлению</h2>
            <div className="space-y-2">
              {info.options.map((opt) => (
                <button
                  key={opt.add_count}
                  type="button"
                  onClick={() => {
                    setSelectedAdd(opt.add_count);
                    setSelectedMethod(null);
                  }}
                  className={`w-full p-4 rounded-xl border text-left transition-all ${
                    selectedAdd === opt.add_count
                      ? 'surface-metallic border-transparent shadow-neon'
                      : 'border-zoomer-border bg-zoomer-dark/50 text-gray-300 hover:border-white/20'
                  }`}
                >
                  {opt.button_label}
                </button>
              ))}
            </div>
          </motion.div>

          {selectedOption && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="card-dark">
              <h3 className="text-lg font-semibold text-white text-center mb-2">Способ оплаты</h3>
              <p className="text-center text-gray-400 text-sm mb-4">
                Сумма: <span className="text-white font-bold">{selectedOption.price_rub} ₽</span>
              </p>
              <div className="grid grid-cols-2 gap-3 mb-6">
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
                          : 'border-zoomer-border bg-zoomer-card text-gray-400'
                      }`}
                    >
                      <Icon className="w-5 h-5 mx-auto mb-2" />
                      <div className="text-xs font-medium">{method.label}</div>
                    </button>
                  );
                })}
              </div>
              <Button
                onClick={handlePay}
                disabled={!selectedMethod || isProcessing}
                className="w-full"
              >
                {isProcessing ? 'Создаём платёж…' : 'Оплатить'}
              </Button>
            </motion.div>
          )}
        </div>
      </section>
    </>
  );
}
