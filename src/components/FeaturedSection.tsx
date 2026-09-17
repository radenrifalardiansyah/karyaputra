'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Flame } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useLiveProducts } from '@/lib/useLiveProducts';
import { useLiveBranding } from '@/lib/useLiveBranding';
import { splitBrandName } from '@/lib/branding';
import ProductCard from './ProductCard';

export default function FeaturedSection() {
  const products = useLiveProducts();
  const featured = products.filter(p => p.badge === 'Best Seller' || p.badge === 'Popular').slice(0, 6);
  const { t } = useLanguage();
  const branding = useLiveBranding();
  const [title1, title2] = splitBrandName(branding.featuredTitle);

  return (
    <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-10 sm:mb-14"
      >
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Flame size={16} className="text-amber-500" />
            <p className="text-amber-600/70 text-sm font-semibold tracking-widest uppercase">
              {branding.featuredBadge}
            </p>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold">
            <span className="text-amber-950">{title1} </span>
            <span className="gradient-text">{title2}</span>
          </h2>
          <p className="text-amber-800/55 text-sm sm:text-base mt-1.5 max-w-md">
            {branding.featuredSubtitle}
          </p>
        </div>

        <Link href="/products">
          <motion.button
            whileHover={{ scale: 1.03, x: 2 }}
            whileTap={{ scale: 0.97 }}
            className="btn-outline flex items-center gap-2 px-5 py-2.5 text-sm font-semibold flex-shrink-0"
          >
            {t.featured.seeAll} <ArrowRight size={14} />
          </motion.button>
        </Link>
      </motion.div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
        {featured.map((product, i) => (
          <ProductCard key={product.id} product={product} index={i} />
        ))}
      </div>
    </section>
  );
}
