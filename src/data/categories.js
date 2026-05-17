import { Droplets, Footprints, ShoppingBag, Leaf, ShoppingBasket, Circle, Flame, Grid3x3 } from 'lucide-react';

export const exploreCats = [
  { id: 'honey', label: 'Honey', labelAr: 'عسل', Icon: Droplets },
  { id: 'belgha', label: 'Belgha', labelAr: 'بلغة', Icon: Footprints },
  { id: 'leather', label: 'Leather', labelAr: 'جلد', Icon: ShoppingBag },
  { id: 'argan', label: 'Argan', labelAr: 'أركان', Icon: Leaf },
  { id: 'baskets', label: 'Baskets', labelAr: 'قفة', Icon: ShoppingBasket },
  { id: 'pottery', label: 'Pottery', labelAr: 'فخار', Icon: Circle },
  { id: 'spices', label: 'Spices', labelAr: 'توابل', Icon: Flame },
  { id: 'rugs', label: 'Rugs', labelAr: 'زرابي', Icon: Grid3x3 }
];

export const homeCats = [
  { id: '', label: 'All', labelAr: 'الكل', Icon: null },
  ...exploreCats
];
