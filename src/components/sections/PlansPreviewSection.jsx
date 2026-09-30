import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ROUTES, DEFAULT_DEVICES_MIN } from '@utils/constants';
import { devicesLabel } from '@utils/pricing';
import { configApi } from '@services/api';
import Button from '@components/ui/Button';

const FALLBACK = [
  { id: 'm3_d5', label: '3 месяца (выгода)', price: 749, days: 90, popular: true },
  { id: 'm1_d5', label: '1 месяц', price: 299, days: 30, popular: false },
];

const PLAN_ORDER = ['m3_d5', 'm1_d5'];

export default function PlansPreviewSection() {
  const [plans, setPlans] = useState(FALLBACK);

  useEffect(() => {
    configApi
      .tariffs()
      .then(({ data }) => {
        const list = data?.tariffs ?? (Array.isArray(data) ? data : []);
        const filtered = list.filter((t) => t.id === 'm1_d5' || t.id === 'm3_d5');
        filtered.sort(
          (a, b) => PLAN_ORDER.indexOf(a.id) - PLAN_ORDER.indexOf(b.id),
        );
        if (filtered.length >= 2) {
          setPlans(
            filtered.map((t) => ({
              id: t.id,
              label: t.id === 'm3_d5' ? '3 месяца (выгода)' : '1 месяц',
              price: t.price,
              days: t.id === 'm3_d5' ? 90 : 30,
              popular: t.id === 'm3_d5',
            })),
          );
        }
      })
      .catch(() => {});
  }, []);

  return (
    <section className="py-24 relative">
      <div className="absolute inset-0 bg-radial-glow opacity-50" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Простые <span className="text-gradient">тарифы</span>
          </h2>
          <p className="text-gray-400">
            {devicesLabel(DEFAULT_DEVICES_MIN)} в базе · можно увеличить до 15 на странице тарифов
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto mb-10">
          {plans.map((tariff, index) => (
            <motion.div
              key={tariff.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`relative card-dark text-center ${
                tariff.popular ? 'border-zoomer-neon ring-1 ring-zoomer-neon/50' : ''
              }`}
            >
              {tariff.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 surface-metallic rounded-full text-xs font-semibold flex items-center gap-1">
                  <Star className="w-3 h-3" /> Популярный
                </div>
              )}

              <div className="text-gray-400 text-sm mb-2">{tariff.label}</div>
              <div className="text-4xl font-bold text-white mb-1">
                {tariff.price} <span className="text-lg text-gray-400">руб</span>
              </div>
              <div className="text-gray-500 text-xs mb-6">
                ~{Math.round(tariff.price / tariff.days)} руб/день
              </div>

              <ul className="space-y-3 text-sm text-gray-300 mb-6 text-left">
                {[
                  'Безлимитный трафик',
                  `${devicesLabel(DEFAULT_DEVICES_MIN)} (расширяется)`,
                  '26 серверов',
                  'VLESS Reality',
                ].map((f, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-zoomer-green flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>

              <Link to={ROUTES.PRICING}>
                <Button variant={tariff.popular ? 'primary' : 'secondary'} className="w-full text-sm">
                  Выбрать
                </Button>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
