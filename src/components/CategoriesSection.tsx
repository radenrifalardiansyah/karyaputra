'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useLiveProducts } from '@/lib/useLiveProducts';
import { useLiveCategories } from '@/lib/useLiveCategories';
import { useLiveBranding } from '@/lib/useLiveBranding';
import { splitBrandName } from '@/lib/branding';
import { trackClick } from '@/lib/trackClick';

// A small rotating gradient palette for category cards — categories themselves
// (name/emoji/description) are entirely admin-managed, so there's no per-category
// hardcoded style to look up; this just gives each card a distinct accent.
const CARD_GRADIENTS = [
  'from-amber-700 to-amber-500',
  'from-gray-800 to-gray-600',
  'from-amber-900 to-gray-700',
  'from-gray-700 to-amber-600',
];

function gradientFor(key: string) {
  let hash = 0;
  for (let i = 0; i < key.length; i++) {
    hash = (hash * 31 + key.charCodeAt(i)) | 0;
  }
  return CARD_GRADIENTS[Math.abs(hash) % CARD_GRADIENTS.length];
}

export default function CategoriesSection() {
  const { t } = useLanguage();
  const products = useLiveProducts();
  const liveCategories = useLiveCategories();
  const branding = useLiveBranding();
  const [title1, title2] = splitBrandName(branding.categoriesTitle);

  // The admin's live category collection is the master data — it decides which
  // categories exist, and (via the admin form) their name/icon/description.
  const cards = liveCategories
    .filter(c => products.some(p => p.category === c.id))
    .map(c => ({
      id: c.id,
      name: c.name,
      emoji: c.emoji || '🏷️',
      description: c.description || t.categories.subtitle,
      gradient: gradientFor(c.id),
      count: products.filter(p => p.category === c.id).length,
    }));

  return (
    <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-10 sm:mb-14"
      >
        <p className="text-amber-600/70 text-sm font-semibold tracking-widest uppercase mb-3">
          {branding.categoriesBadge}
        </p>
        <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold">
          <span className="text-amber-950">{title1} </span>
          <span className="gradient-text">{title2}</span>
        </h2>
        <p className="text-amber-800/55 text-sm sm:text-base mt-3 max-w-md mx-auto">
          {branding.categoriesSubtitle}
        </p>
      </motion.div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {cards.map((cat, i) => (
          <motion.div
            key={cat.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: i * 0.09 }}
          >
            <Link href={`/products?category=${cat.id}`} onClick={() => trackClick('category', cat.id)}>
              <motion.div
                whileHover={{ y: -5, scale: 1.01 }}
                whileTap={{ scale: 0.97 }}
                className="group relative overflow-hidden rounded-2xl p-5 sm:p-6 cursor-pointer h-36 sm:h-44 flex flex-col justify-between bg-white border border-amber-100 transition-all duration-300 hover:shadow-lg hover:shadow-amber-200/60 hover:border-amber-200"
              >
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${cat.gradient} opacity-70`} />

                <motion.span
                  animate={{ rotate: [0, 6, -6, 0] }}
                  transition={{ duration: 5, repeat: Infinity, delay: i * 0.4 }}
                  className="text-4xl sm:text-5xl"
                >
                  {cat.emoji}
                </motion.span>

                <div>
                  <h3 className="font-display font-bold text-amber-950 text-base sm:text-lg leading-tight">
                    {cat.name}
                  </h3>
                  <p className="text-amber-700/55 text-xs sm:text-sm mt-0.5">
                    {cat.description}
                  </p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-amber-600/55 text-xs">{cat.count} {t.categories.menuCount}</span>
                    <motion.div className="text-amber-500 opacity-0 group-hover:opacity-100 transition-opacity">
                      <ArrowRight size={13} />
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
