// Path: data/seed/initial-data.ts

import { SpatialCase, MaterialSKU } from '@aetherspace/core-types';

export const SEED_SPATIAL_CASES: SpatialCase[] = [
  {
    id: 'case-id-001',
    title: 'PIK 2 Tropical Modern Courtyard Villa',
    category: 'residential',
    subtype: 'villa',
    style: 'Tropical Modern',
    areaSqm: 320,
    country: 'Indonesia',
    imageUrl: 'https://r2.aetherspace.core/cases/pik2-courtyard-villa.webp',
    unitCostIdr: 8200000,
  },
  {
    id: 'case-id-002',
    title: 'Uluwatu Cliffside Boutique Resort Suite',
    category: 'commercial',
    subtype: 'hotel',
    style: 'Wabi-Sabi Resort',
    areaSqm: 110,
    country: 'Indonesia',
    imageUrl: 'https://r2.aetherspace.core/cases/uluwatu-suite.webp',
    unitCostIdr: 9500000,
  },
  {
    id: 'case-global-003',
    title: 'Kyoto Minimalist Tea Pavilion & Gallery',
    category: 'public',
    subtype: 'museum',
    style: 'Minimalist Zen',
    areaSqm: 185,
    country: 'Japan',
    imageUrl: 'https://r2.aetherspace.core/cases/kyoto-pavilion.webp',
    unitCostIdr: 11000000,
  },
];

export const SEED_MATERIAL_SKUS: MaterialSKU[] = [
  {
    skuId: 'SKU-ID-TEAK-01',
    name: 'Perhutani Grade-A Kiln-Dried Teak Panel',
    category: 'Wood & Timber',
    grade: 'Premium',
    priceIdr: 1250000,
    wasteFactor: 0.08,
    climateFit: 'tropical_high_humidity',
  },
  {
    skuId: 'SKU-ID-ANDESITE-02',
    name: 'Cirebon Honed Andesite Volcanic Stone',
    category: 'Natural Stone',
    grade: 'Standard',
    priceIdr: 480000,
    wasteFactor: 0.10,
    climateFit: 'tropical_high_humidity',
  },
  {
    skuId: 'SKU-IT-MARBLE-03',
    name: 'Carrara Statuario Imported Marble Slab',
    category: 'Natural Stone',
    grade: 'Luxury',
    priceIdr: 2850000,
    wasteFactor: 0.12,
    climateFit: 'universal',
  },
  {
    skuId: 'SKU-ID-MICROCEMENT-04',
    name: 'Waterproof Tropical Polymer Microcement',
    category: 'Wall Finish',
    grade: 'Premium',
    priceIdr: 620000,
    wasteFactor: 0.05,
    climateFit: 'tropical_high_humidity',
  },
];
