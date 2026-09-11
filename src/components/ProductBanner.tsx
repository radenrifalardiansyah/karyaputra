'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import { useLiveBranding } from '@/lib/useLiveBranding';
import { useLiveProducts } from '@/lib/useLiveProducts';
import { imageSrc } from '@/lib/liveProducts';

const MAX_BANNERS = 4;

const AUTOPLAY_INTERVAL = 5000;

export default function ProductBanner() {
  const branding = useLiveBranding();
  const products = useLiveProducts();
  const banners = products
    .filter(p => p.images && p.images.length > 0)
    .slice(0, MAX_BANNERS)
    .map(p => ({
      id: p.id,
      image: p.images![0],
      alt: `${p.name} — ${branding.brandName}`,
    }));
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const [direction, setDirection] = useState(1);

  const goTo = useCallback((index: number, dir: number) => {
    setDirection(dir);
    setCurrent(index);
  }, []);

  const prev = () => {
    const idx = (current - 1 + banners.length) % banners.length;
    goTo(idx, -1);
  };

  const next = useCallback(() => {
    const idx = (current + 1) % banners.length;
    goTo(idx, 1);
  }, [current, goTo, banners.length]);

  useEffect(() => {
    if (paused || banners.length < 2) return;
    const timer = setInterval(next, AUTOPLAY_INTERVAL);
    return () => clearInterval(timer);
  }, [paused, next, banners.length]);

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? '100%' : '-100%', opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? '-100%' : '100%', opacity: 0 }),
  };

  if (banners.length === 0) return null;

  return (
    <div
      className="relative w-full overflow-hidden rounded-2xl shadow-md mb-8 select-none"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      style={{ aspectRatio: '2 / 1', background: '#F5F5F5' }}
    >
      {/* Slides */}
      <AnimatePresence initial={false} custom={direction} mode="popLayout">
        <motion.div
          key={current}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
          className="absolute inset-0"
        >
          <Image
            src={imageSrc(banners[current].image)}
            alt={banners[current].alt}
            fill
            className="object-contain p-6"
            priority={current === 0}
            sizes="(max-width: 768px) 100vw, 1280px"
          />
        </motion.div>
      </AnimatePresence>

      {/* Prev / Next arrows */}
      {banners.length > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-black/30 hover:bg-black/50 text-white flex items-center justify-center backdrop-blur-sm transition-all"
            aria-label="Sebelumnya"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={next}
            className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-black/30 hover:bg-black/50 text-white flex items-center justify-center backdrop-blur-sm transition-all"
            aria-label="Berikutnya"
          >
            <ChevronRight size={18} />
          </button>
        </>
      )}

      {/* Dot indicators */}
      {banners.length > 1 && (
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 flex gap-2">
        {banners.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i, i > current ? 1 : -1)}
            aria-label={`Slide ${i + 1}`}
            className="relative h-2 rounded-full overflow-hidden transition-all duration-300"
            style={{ width: i === current ? 24 : 8, background: 'rgba(255,255,255,0.4)' }}
          >
            {i === current && (
              <motion.div
                className="absolute inset-y-0 left-0 bg-white rounded-full"
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: AUTOPLAY_INTERVAL / 1000, ease: 'linear' }}
                key={`${current}-progress`}
              />
            )}
          </button>
        ))}
      </div>
      )}

      {/* Autoplay pause indicator */}
      {paused && (
        <div className="absolute top-3 right-3 z-10 bg-black/30 backdrop-blur-sm rounded-full px-2 py-0.5 text-white text-[10px] font-medium">
          ⏸
        </div>
      )}
    </div>
  );
}
