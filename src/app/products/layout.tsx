import type { Metadata } from 'next';
import { SITE_URL } from '@/lib/branding';
import { getCachedBranding } from '@/lib/server/branding';

export async function generateMetadata(): Promise<Metadata> {
  const branding = await getCachedBranding();
  return {
    title: 'Semua Produk',
    description: 'Lihat semua produk Tepung Aci Karya Putra. Bahan pilihan, harga bersahabat, tanpa pengawet.',
    keywords: [
      'beli tepung aci bogor', 'tepung aci online', 'tepung aci halal bogor',
      'harga tepung aci', 'oleh oleh khas bogor murah',
    ],
    openGraph: {
      title: `Semua Produk | ${branding.brandName}`,
      description: 'Tepung Aci Bogor. Halal, tanpa pengawet. Pesan via WhatsApp!',
      url: `${SITE_URL}/products`,
    },
    alternates: {
      canonical: `${SITE_URL}/products`,
    },
  };
}

export default function ProductsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
