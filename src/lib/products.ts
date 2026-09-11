import { Product } from '@/types';

// Product catalog is fully admin-managed (Postgres `products` table) — see
// src/lib/liveProducts.ts (merge logic) and src/lib/useLiveProducts.ts /
// src/lib/server/getProduct.ts (client/server live fetch). This static list used
// to seed a bundled demo catalog; it's kept empty so every product shown on the
// storefront always comes from the admin panel, with no bundled fallback data.
export const products: Product[] = [];

// Category display data (name/emoji/description/gradient) is also fully admin-managed
// — see src/lib/useLiveCategories.ts and src/app/api/categories/route.ts. Kept empty
// so CategoriesSection/Footer render purely from whatever the admin has configured.
export const categoryData: {
  id: string;
  name: string;
  emoji: string;
  description: string;
  gradient: string;
  count: number;
}[] = [];
