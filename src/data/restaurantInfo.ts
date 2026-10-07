export interface RestaurantInfo {
  name: string;
  nameEn: string;
  slogan: string;
  tagline: string;
  category: string;
  address: string;
  addressShort: string;
  landmark: string;
  city: string;
  country: string;
  phone: string;
  phoneDisplay: string;
  whatsapp: string;
  averagePrice: string;
  rating: number;
  reviewsCount: number;
  openingHours: string;
  deliveryZones: string[];
}

export const RESTAURANT_INFO: RestaurantInfo = {
  name: 'كرانشيز',
  nameEn: 'Crunchies',
  slogan: 'الطعم اللي يستاهل التجربة',
  tagline: 'وجبات سريعة، نكهات مميزة، وتجربة تستاهل ترجع لها.',
  category: 'مطعم وجبات سريعة',
  address: 'شارع لطف الله، بجوار عصائر العملاق، محافظة الفيوم، مصر',
  addressShort: 'لطف الله، بجوار عصائر العملاق، الفيوم',
  landmark: 'بجوار عصائر العملاق',
  city: 'الفيوم',
  country: 'مصر',
  phone: '01050610008',
  phoneDisplay: '010 5061 0008',
  whatsapp: '201050610008',
  averagePrice: '200–400 جنيه للشخص',
  rating: 3.9,
  reviewsCount: 123,
  openingHours: 'يومياً من 12:00 ظهراً إلى 2:00 صباحاً',
  deliveryZones: [
    'لطف الله',
    'حي الجامعة',
    'كيمان فارس',
    'المسلة',
    'السواقي ووسط البلد',
    'دلة',
    'باغوص',
    'الحادقة',
    'منطقة التدريب والفنية',
    'الصوفي وقحافة'
  ]
};
