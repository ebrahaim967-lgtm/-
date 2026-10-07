import chickenMadnessImg from '../assets/images/chicken_madness_crispy_1791396636643.jpg';
import smashBurgerImg from '../assets/images/smash_cheeseburger_1791396647414.jpg';
import cheesyPastaImg from '../assets/images/cheesy_pasta_bake_1791396657096.jpg';
import feastImg from '../assets/images/hero_crunchies_feast_1791396625374.jpg';

export interface MenuItem {
  id: string;
  name: string;
  nameEn: string;
  category: 'popular' | 'crunchies' | 'chicken_madness' | 'burgers' | 'pasta' | 'fast_food' | 'sides';
  description: string;
  price: number;
  image: string;
  isPopular?: boolean;
  isSpicy?: boolean;
  isNew?: boolean;
  calories?: string;
  options?: {
    sizes?: { name: string; priceDelta: number }[];
    spiciness?: string[];
    extras?: { name: string; price: number }[];
  };
}

export const MENU_CATEGORIES = [
  { id: 'all', name: 'الكل' },
  { id: 'popular', name: 'الأكثر طلبًا' },
  { id: 'crunchies', name: 'كرانشيز سبيشال' },
  { id: 'chicken_madness', name: 'Chicken Madness' },
  { id: 'burgers', name: 'برجر' },
  { id: 'pasta', name: 'مكرونات' },
  { id: 'fast_food', name: 'وجبات سريعة' },
  { id: 'sides', name: 'مقبلات وإضافات' },
] as const;

export const MENU_ITEMS: MenuItem[] = [
  // الأكثر طلبًا & كرانشيز سبيشال
  {
    id: 'crunchies-fire-box',
    name: 'وجبة كرانشيز فاير بوكس',
    nameEn: 'Crunchies Fire Box',
    category: 'crunchies',
    description: '4 قطع دجاج استربس مقرمش ذهبي مع بطاطس متبلة، خبز طازج، صوص كرانشيز السري وكول سلو منعش.',
    price: 210,
    image: chickenMadnessImg,
    isPopular: true,
    isSpicy: true,
    options: {
      spiciness: ['عادي', 'حار (سبايسي)'],
      extras: [
        { name: 'صوص جبنة شيدر سائلة', price: 25 },
        { name: 'صوص كرانشيز إضافي', price: 20 },
        { name: 'علبة هالبينو مقطع', price: 15 },
        { name: 'بطاطس مقلية متبلة لارج', price: 35 },
      ]
    }
  },
  {
    id: 'crunchies-monster-burger',
    name: 'ساندوتش كرانشيز مانستر',
    nameEn: 'Crunchies Monster Burger',
    category: 'crunchies',
    description: 'طبقة برجر لحم سماش مشوي مع قطعة دجاج كريسبي مقرمشة، غرقانة بجبنة الشيدر وصوص الباربيكيو في خبز بريوش.',
    price: 235,
    image: smashBurgerImg,
    isPopular: true,
    isNew: true,
    options: {
      spiciness: ['عادي', 'سبايسي'],
      extras: [
        { name: 'دبل شيدر', price: 25 },
        { name: 'بيكون لحم مدخن', price: 35 },
        { name: 'بطاطس وكانز بيبسي', price: 45 },
      ]
    }
  },
  {
    id: 'crunchies-tower-wrap',
    name: 'تورتيلا كرانشيز رول',
    nameEn: 'Crunchies Crunch Wrap',
    category: 'crunchies',
    description: 'دجاج كريسبي مقرمش ملفوف بخبز التورتيلا المحمص مع ميكس أجبان وصوص الرانش الغني والطماطم الطازجة.',
    price: 155,
    image: feastImg,
    isPopular: true,
    options: {
      spiciness: ['عادي', 'حار'],
      extras: [
        { name: 'صوص رانش إضافي', price: 20 },
        { name: 'جبنة موتزاريلا إضافية', price: 25 },
      ]
    }
  },

  // Chicken Madness
  {
    id: 'chicken-madness-strip-bucket',
    name: 'باكيت تشيكن مادنس 6 قطع',
    nameEn: 'Chicken Madness 6-Strips Bucket',
    category: 'chicken_madness',
    description: '6 قطع من صدور الدجاج المقرمشة الذهبية بتتبيلة مادنس السرية مع بطاطس عائلية، 2 خبز، كول سلو وصوصين.',
    price: 260,
    image: chickenMadnessImg,
    isPopular: true,
    options: {
      spiciness: ['تتبيلة عادية', 'تتبيلة حارة نارية'],
      extras: [
        { name: '2 قطعة ستربس إضافية', price: 65 },
        { name: 'صوص كرانشيز سبيشال', price: 20 },
        { name: 'كول سلو حجم كبير', price: 30 },
      ]
    }
  },
  {
    id: 'chicken-madness-supreme-sandwich',
    name: 'ساندوتش تشيكن سوبريم مادنس',
    nameEn: 'Chicken Supreme Madness',
    category: 'chicken_madness',
    description: 'قطعة صدور دجاج مقرمشة جامبو مغطاة بصوص الجبنة الشيدر، تركي مدخن، خس مقرمش ومايونيز ثوم.',
    price: 175,
    image: chickenMadnessImg,
    isPopular: true,
    options: {
      spiciness: ['عادي', 'سبايسي'],
      extras: [
        { name: 'إضافة تركي مدخن', price: 30 },
        { name: 'شيدر صوص', price: 25 },
      ]
    }
  },
  {
    id: 'chicken-madness-dynamite-meal',
    name: 'وجبة ديناميت تشيكن',
    nameEn: 'Dynamite Chicken Meal',
    category: 'chicken_madness',
    description: 'قطع دجاج مقرمشة بايتس غارقة في صوص الديناميت الحار والسمسم مع أرز متبل أو بطاطس ساخنة.',
    price: 195,
    image: feastImg,
    isSpicy: true,
    options: {
      spiciness: ['سبايسي معتدل', 'إكسترا حار 🔥'],
      extras: [
        { name: 'صوص ديناميت زيادة', price: 20 },
        { name: 'أرز ريزو متبل', price: 35 },
      ]
    }
  },

  // برجر (Burgers)
  {
    id: 'double-smash-cheese',
    name: 'دبل سماش تشيز برجر',
    nameEn: 'Double Smash Cheeseburger',
    category: 'burgers',
    description: 'شريحتان من لحم البلدي المشوي على الجريل بحواف مقرمشة ومغطاة بشيدر أمريكي أصلي مع خيار مخلل وصوص السماش.',
    price: 185,
    image: smashBurgerImg,
    isPopular: true,
    options: {
      extras: [
        { name: 'شريحة برجر ثالثة (تربل)', price: 60 },
        { name: 'إضافة بيض عيون', price: 20 },
        { name: 'بصل مكرمل مدخن', price: 15 },
        { name: 'هالبينو صوص', price: 20 }
      ]
    }
  },
  {
    id: 'bacon-mushroom-smash',
    name: 'سماش بيكون وماشروم',
    nameEn: 'Bacon & Mushroom Smash',
    category: 'burgers',
    description: 'برجر لحم مشوي مع شرائح المشروم الطازج بصوص الجريفي الغني، بيكون بقري مدخن وجبنة سويسرية ذائبة.',
    price: 215,
    image: smashBurgerImg,
    options: {
      extras: [
        { name: 'شيدر صوص إضافي', price: 25 },
        { name: 'بطاطس وكانز', price: 45 }
      ]
    }
  },
  {
    id: 'spicy-jalapeno-burger',
    name: 'سماش هالبينو فاير برجر',
    nameEn: 'Spicy Jalapeño Smash',
    category: 'burgers',
    description: 'لحم بقري مفروم طازج مع شرائح الهالبينو، صلصة السيراتشا الحارة وشيدر حار في خبز بطاطس ناعم محمص بالزبدة.',
    price: 195,
    image: smashBurgerImg,
    isSpicy: true,
    options: {
      extras: [
        { name: 'صوص شيدر ساخن', price: 25 },
        { name: 'أصابع موتزاريلا 3 قطع', price: 50 }
      ]
    }
  },

  // مكرونات (Pasta)
  {
    id: 'crunchies-chicken-alfredo-bake',
    name: 'طاجن مكرونة كرانشيز ألفريدو',
    nameEn: 'Crunchies Chicken Alfredo Bake',
    category: 'pasta',
    description: 'مكرونة بيني بصوص الكريمة الغني مع قطع الدجاج المقرمش والمشروم، مغطاة بطبقة موتزاريلا ذهبية ذائبة بالفرن.',
    price: 180,
    image: cheesyPastaImg,
    isPopular: true,
    options: {
      spiciness: ['عادي', 'سبايسي خفيف'],
      extras: [
        { name: 'دبل موتزاريلا', price: 30 },
        { name: 'قطع دجاج استربس إضافية', price: 45 },
      ]
    }
  },
  {
    id: 'mac-and-cheese-crunch',
    name: 'ماك أند تشيز كرانشي بايتس',
    nameEn: 'Mac & Cheese Crunch Bites',
    category: 'pasta',
    description: 'مكرونة بصوص الجبن الشيدر الأمريكي الأصيل الثلاثي، تعلوها قطع دجاج مقرمش ورشة بابريكا وأعشاب طازجة.',
    price: 165,
    image: cheesyPastaImg,
    isPopular: true,
    isNew: true,
    options: {
      extras: [
        { name: 'صوص شيدر إكسترا', price: 25 },
        { name: 'هالبينو سبايسي', price: 15 }
      ]
    }
  },
  {
    id: 'spicy-red-pasta-crispy',
    name: 'مكرونة نابوليتانا كريسبي شيكن',
    nameEn: 'Spicy Red Sauce Crispy Pasta',
    category: 'pasta',
    description: 'مكرونة مع صلصة الطماطم الإيطالية المتبلة بالريحان والثوم، فلفل حار، وقطع استربس دجاج مقرمش مع جبنة بارميزان.',
    price: 155,
    image: cheesyPastaImg,
    isSpicy: true,
    options: {
      spiciness: ['معتدل', 'سبايسي حار'],
      extras: [
        { name: 'إضافة جبنة موتزاريلا', price: 25 }
      ]
    }
  },

  // وجبات سريعة وساندوتشات (Fast Food Combos)
  {
    id: 'crunchies-duo-combo',
    name: 'كومبو كرانشيز الثنائي',
    nameEn: 'Crunchies Duo Combo',
    category: 'fast_food',
    description: 'ساندوتش كرانشيز تشيكن + ساندوتش سماش برجر فردي + بطاطس حجم عائلي + 2 كانز بيبسي مثلج.',
    price: 340,
    image: feastImg,
    isPopular: true,
    options: {
      spiciness: ['عادي', 'سبايسي'],
      extras: [
        { name: '2 صوص كرانشيز كبير', price: 35 }
      ]
    }
  },
  {
    id: 'single-crispy-chicken-meal',
    name: 'وجبة كرانشي سنجل ميل',
    nameEn: 'Crunchy Single Meal',
    category: 'fast_food',
    description: 'ساندوتش دجاج كريسبي مقرمش مع بطاطس متبلة، علبة كول سلو طازجة ومشروب غازي منعش من اختيارك.',
    price: 150,
    image: chickenMadnessImg,
    options: {
      spiciness: ['عادي', 'سبايسي'],
      extras: [
        { name: 'ترقية البطاطس إلى شيدر فرايز', price: 30 }
      ]
    }
  },
  {
    id: 'crunchies-family-party-bucket',
    name: 'باكيت العيلة كرانشيز بارتي',
    nameEn: 'Crunchies Family Party Bucket',
    category: 'fast_food',
    description: '10 قطع استربس سوبر كرانشي، 2 ساندوتش برجر سماش، بطاطس لارج، 4 صوصات متنوعة ولتر كولا مثلج.',
    price: 490,
    image: feastImg,
    isPopular: true,
    options: {
      spiciness: ['مكس عادي وسبايسي', 'عادي بالكامل', 'سبايسي بالكامل'],
      extras: [
        { name: 'طاجن ماك آند تشيز جانبي', price: 85 }
      ]
    }
  },

  // مقبلات وصوصات ومشروبات (Sides & Drinks)
  {
    id: 'cheesy-bacon-fries',
    name: 'بطاطس شيدر وبيكون مقرمش',
    nameEn: 'Loaded Cheesy Bacon Fries',
    category: 'sides',
    description: 'بطاطس كرينكل مقلية ذهبية غارقة بصوص الجبنة الشيدر الساخنة وقطع بيكون مقرمش مع رشة بقدونس.',
    price: 75,
    image: feastImg,
    options: {
      extras: [
        { name: 'إضافة هالبينو', price: 15 },
        { name: 'إضافة قطع فرايد تشيكن', price: 35 }
      ]
    }
  },
  {
    id: 'mozzarella-sticks-crunch',
    name: 'أصابع موتزاريلا مقرمشة (4 قطع)',
    nameEn: 'Crunchy Mozzarella Sticks (4 pcs)',
    category: 'sides',
    description: 'أصابع جبنة موتزاريلا مطاطية مغلفة ببقسماط مقرمش مع صوص المارينارا أو الرانش.',
    price: 65,
    image: cheesyPastaImg,
  },
  {
    id: 'signature-crunchies-sauce',
    name: 'صوص كرانشيز السري',
    nameEn: 'Signature Crunchies Sauce',
    category: 'sides',
    description: 'خلطة كرانشيز المميزة بنكهة كريمية مدخنة ولمسة بهارات خاصة.',
    price: 25,
    image: chickenMadnessImg,
  },
  {
    id: 'classic-coleslaw',
    name: 'كول سلو كرانشيز طازج',
    nameEn: 'Fresh Crunchy Coleslaw',
    category: 'sides',
    description: 'سلطة كرنب وجزر طازجة ومقرمشة مع دريسنج كريمي متوازن.',
    price: 30,
    image: feastImg,
  }
];
