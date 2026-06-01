import { motion } from 'framer-motion';
import { Shield, Zap, Globe, Smartphone, Infinity, Clock } from 'lucide-react';
import { FEATURES, BRAND_NAME } from '@utils/constants';

const iconMap = { Shield, Zap, Globe, Smartphone, Infinity, Clock };

export default function FeaturesSection() {
  return (
    <section className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Почему <span className="text-gradient">{BRAND_NAME}</span>?
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Создан для себя и друзей. Особое внимание к приватности, скорости и стабильности.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((feature, index) => {
            const Icon = iconMap[feature.icon];
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="card-dark group"
              >
                <div className="w-12 h-12 rounded-xl bg-zoomer-neon/10 flex items-center justify-center mb-4 group-hover:bg-zoomer-neon/20 transition-colors">
                  <Icon className="w-6 h-6 text-zoomer-neon" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
