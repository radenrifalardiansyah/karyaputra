'use client';

import { createContext, useContext, ReactNode } from 'react';
import { LiveBranding, defaultLiveBranding } from '@/lib/branding';

// Seeded server-side by RootLayout (already resolved via getCachedBranding() for
// metadata/viewport) and handed down as the initial value here — so every client
// component reads the real admin-configured branding on its very first render,
// with no client-side fetch/flash from placeholder text to real text.
const BrandingContext = createContext<LiveBranding>(defaultLiveBranding());

export function BrandingProvider({ branding, children }: { branding: LiveBranding; children: ReactNode }) {
  return <BrandingContext.Provider value={branding}>{children}</BrandingContext.Provider>;
}

export function useBranding(): LiveBranding {
  return useContext(BrandingContext);
}
