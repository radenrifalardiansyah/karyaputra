export const BRAND_NAME = 'Karya Putra';
export const LEGAL_NAME = 'Karya Putra';
export const TAGLINE = 'Tepung Aci berkualitas khas Bogor. Bahan pilihan, harga bersahabat.';

export const SITE_URL = 'https://karyaputra.vercel.app';

export const WHATSAPP_NUMBER = '6281212132014';

export const ADDRESS = {
  streetAddress: 'Jl. Batara Kp. Bubulak No. 54 RT01/RW03, Kel. Ciluar',
  addressLocality: 'Bogor Utara',
  addressRegion: 'Jawa Barat',
  postalCode: '16156',
  addressCountry: 'ID',
};

export const ADDRESS_LINES = ['Jl. Batara Kp. Bubulak No. 54 RT01/RW03', 'Kel. Ciluar, Kec. Bogor Utara 16156'];

// Formats a raw WhatsApp number (e.g. '6281212132014', country code included, no '+')
// into the locally-familiar '0812-1213-2014' display form used across the storefront
// and PDFs — always derived from the admin-configured number, never hardcoded.
export function formatWhatsappDisplay(raw: string): string {
  return raw.replace(/^62/, '0').replace(/(\d{4})(?=\d)/g, '$1-');
}

export const SOCIAL = {
  instagramHandle: 'karyaputra.id',
  instagramUrl: 'https://www.instagram.com/karyaputra.id',
  shopeeUrl: 'https://shopee.co.id/karyaputra.id',
  whatsappUrl: `https://wa.me/${WHATSAPP_NUMBER}`,
  mapsUrl: 'https://maps.app.goo.gl/h1AyYBaTH2tAqS588',
};

export const BUSINESS = {
  name: BRAND_NAME,
  legalName: LEGAL_NAME,
  telephone: `+${WHATSAPP_NUMBER}`,
  address: ADDRESS,
  sameAs: [SOCIAL.instagramUrl, SOCIAL.shopeeUrl, SOCIAL.whatsappUrl],
};

export const THEME_COLOR = '#16A34A';
export const THEME_BACKGROUND_COLOR = '#FFFFFF';

export const DEVELOPER = {
  name: 'PT. Eleven Digital Indonesia',
  url: 'https://eleven-digital.id',
  supportedBy: 'PT. RMedia Production',
};

export interface LiveBranding {
  brandName: string;
  legalName: string;
  tagline: string;
  whatsappNumber: string;
  whatsappUrl: string;
  address: string;
  city: string;
  instagramUrl: string;
  instagramHandle: string;
  shopeeUrl: string;
  mapsUrl: string;
  themeColor: string;
  themeBackgroundColor: string;
  // Logo Toko dari admin (Cloudinary URL). null = admin belum upload logo custom —
  // komponen pakai gambar statis @/assets/images/logo-karyaputra.jpeg sebagai fallback.
  logo: string | null;
}

// Static fallback used when the admin hasn't set a field yet (or Postgres is
// unreachable) — see src/lib/server/branding.ts (server) and useLiveBranding.ts (client).
export function defaultLiveBranding(): LiveBranding {
  return {
    brandName: BRAND_NAME,
    legalName: LEGAL_NAME,
    tagline: TAGLINE,
    whatsappNumber: WHATSAPP_NUMBER,
    whatsappUrl: SOCIAL.whatsappUrl,
    address: ADDRESS.streetAddress,
    city: `${ADDRESS.addressLocality}, ${ADDRESS.addressRegion}`,
    instagramUrl: SOCIAL.instagramUrl,
    instagramHandle: SOCIAL.instagramHandle,
    shopeeUrl: SOCIAL.shopeeUrl,
    mapsUrl: SOCIAL.mapsUrl,
    themeColor: THEME_COLOR,
    themeBackgroundColor: THEME_BACKGROUND_COLOR,
    logo: null,
  };
}
