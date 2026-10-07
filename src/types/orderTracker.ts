import { CartItem, OrderForm } from './cart';

export type OrderStatusStage = 
  | 'received' 
  | 'preparing' 
  | 'packaged' 
  | 'delivering' 
  | 'delivered';

export interface TrackingStep {
  stage: OrderStatusStage;
  title: string;
  subtitle: string;
  timeEstimate: string;
  detail: string;
}

export interface ActiveOrder {
  orderId: string;
  createdAt: string;
  estimatedDeliveryMinutes: number;
  stage: OrderStatusStage;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  grandTotal: number;
  customerInfo: OrderForm;
  courier: {
    name: string;
    phone: string;
    vehicle: string;
  };
}

export const ORDER_STAGES: TrackingStep[] = [
  {
    stage: 'received',
    title: 'تم استلام وتأكيد الطلب',
    subtitle: 'فرع لطف الله، الفيوم',
    timeEstimate: 'الدقيقة 0 - 5',
    detail: 'استلم كاشير كرانشيز طلبك وجاري تحويله فوراً إلى فريق المطبخ للبدء في التحضير.'
  },
  {
    stage: 'preparing',
    title: 'جاري القلي والطهي الطازج',
    subtitle: 'مطبخ كرانشيز الساخن',
    timeEstimate: 'الدقيقة 5 - 18',
    detail: 'الشيف يقوم الآن بقلي الاستربس المقرمش وشوي برجر السماش وتحضير صوصات كرانشيز الغنية.'
  },
  {
    stage: 'packaged',
    title: 'تم التغليف الحراري',
    subtitle: 'جاهز مع كابتن التوصيل',
    timeEstimate: 'الدقيقة 18 - 22',
    detail: 'تم وضع وجباتك داخل عبوات كرانشيز الحرارية للحفاظ على السخونة والقرمشة الذهبية.'
  },
  {
    stage: 'delivering',
    title: 'الكابتن في الطريق إليك',
    subtitle: 'في شوارع الفيوم متجهاً لعنوانك',
    timeEstimate: 'الدقيقة 22 - 35',
    detail: 'مندوب كرانشيز يتحرك الآن باتجاه موقعك، يرجى الاستعداد واستلام الطلب ساخناً.'
  },
  {
    stage: 'delivered',
    title: 'تم تسليم الطلب بنجاح',
    subtitle: 'بالهناء والشفاء!',
    timeEstimate: 'مكتمل',
    detail: 'نتمنى لك تجربة ممتعة مع كرانشيز! لا تنس مشاركتنا رأيك وتقييمك لطعم الوجبة.'
  }
];
