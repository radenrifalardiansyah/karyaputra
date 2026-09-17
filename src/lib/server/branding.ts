import { unstable_cache } from 'next/cache';
import { getSettings } from '@/lib/settings-pg';
import { defaultLiveBranding, LiveBranding } from '@/lib/branding';

interface SettingsDoc {
  storeName?: string;
  legalName?: string;
  storeTagline?: string;
  whatsapp?: string;
  address?: string;
  city?: string;
  openHours?: string;
  instagramUrl?: string;
  shopeeUrl?: string;
  mapsUrl?: string;
  storefrontThemeColor?: string;
  storefrontThemeBackgroundColor?: string;
  logo?: string;
  heroHeadline?: string;
  heroDesc?: string;
  featuredBadge?: string;
  featuredTitle?: string;
  featuredSubtitle?: string;
  categoriesBadge?: string;
  categoriesTitle?: string;
  categoriesSubtitle?: string;
}

function instagramHandleFromUrl(url: string): string {
  const m = url.match(/instagram\.com\/([^/?]+)/i);
  return m?.[1] || '';
}

// Branding is admin-editable via Settings > Info Toko / Kontak & Sosial Media / Tampilan
// & Tema (Postgres `settings` table, sama seperti payment-info — lihat api/payment-info/
// route.ts). Cache 1 jam, tag 'branding'; admin memicu revalidateStorefront('branding')
// lewat POST /api/revalidate setiap kali Settings disimpan (lihat cemilantehrisma-admin's
// api/settings/route.ts).
//
// Identity/contact fields (nama, tagline, alamat, WA, IG, Shopee, Maps, jam buka) come
// *only* from what the admin has actually saved — an unset field renders empty rather
// than silently falling back to the old placeholder business data baked into
// defaultLiveBranding(), which would otherwise look real to customers (e.g. routing
// orders to a WhatsApp number the store never configured). Only the visual theme
// colors and the logo image keep a hardcoded fallback, since a blank color/logo would
// break rendering rather than just being wrong contact info.
export const getCachedBranding = unstable_cache(
  async (): Promise<LiveBranding> => {
    const fallback = defaultLiveBranding();
    try {
      const s = (await getSettings()) as SettingsDoc;
      const whatsappNumber = s.whatsapp || '';
      const instagramUrl = s.instagramUrl || '';
      return {
        brandName: s.storeName || '',
        legalName: s.legalName || '',
        tagline: s.storeTagline || '',
        whatsappNumber,
        whatsappUrl: whatsappNumber ? `https://wa.me/${whatsappNumber}` : '',
        address: s.address || '',
        city: s.city || '',
        openHours: s.openHours || '',
        instagramUrl,
        instagramHandle: instagramHandleFromUrl(instagramUrl),
        shopeeUrl: s.shopeeUrl || '',
        mapsUrl: s.mapsUrl || '',
        themeColor: s.storefrontThemeColor || fallback.themeColor,
        themeBackgroundColor: s.storefrontThemeBackgroundColor || fallback.themeBackgroundColor,
        logo: s.logo || fallback.logo,
        // Section copy (Hero/Produk Terlaris/Kategori): unlike identity/contact fields
        // above, a blank value here would just look like broken layout, not wrong
        // business info — so these keep the same fallback-to-default pattern as
        // theme colors and logo.
        heroHeadline: s.heroHeadline || fallback.heroHeadline,
        heroDesc: s.heroDesc || fallback.heroDesc,
        featuredBadge: s.featuredBadge || fallback.featuredBadge,
        featuredTitle: s.featuredTitle || fallback.featuredTitle,
        featuredSubtitle: s.featuredSubtitle || fallback.featuredSubtitle,
        categoriesBadge: s.categoriesBadge || fallback.categoriesBadge,
        categoriesTitle: s.categoriesTitle || fallback.categoriesTitle,
        categoriesSubtitle: s.categoriesSubtitle || fallback.categoriesSubtitle,
      };
    } catch (err) {
      // Genuine infra failure (Postgres unreachable), not "admin left it blank" — fail
      // open to the static placeholder here so the storefront doesn't go fully blank.
      console.error('[getCachedBranding]', err);
      return fallback;
    }
  },
  ['public-branding'],
  { revalidate: 3600, tags: ['branding'] }
);
