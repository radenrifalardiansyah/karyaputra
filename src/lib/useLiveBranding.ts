'use client';

import { LiveBranding } from './branding';
import { useBranding } from '@/contexts/BrandingContext';

// Branding managed from the admin dashboard (Settings > Info Toko / Kontak & Sosial
// Media / Tampilan & Tema). Resolved server-side once in RootLayout (getCachedBranding())
// and handed down via BrandingProvider — so this just reads the already-correct value
// instead of fetching /api/branding client-side, which used to render the hardcoded
// fallback text first and flash to the real value a moment later.
export function useLiveBranding(): LiveBranding {
  return useBranding();
}
