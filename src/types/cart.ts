import { MenuItem } from '../data/menuData';

export interface CartItemOption {
  spiciness?: string;
  selectedExtras: { name: string; price: number }[];
  size?: { name: string; priceDelta: number };
}

export interface CartItem {
  cartId: string;
  menuItem: MenuItem;
  quantity: number;
  options: CartItemOption;
  unitPrice: number;
  totalPrice: number;
}

export interface OrderForm {
  customerName: string;
  customerPhone: string;
  orderType: 'delivery' | 'pickup' | 'dinein';
  area: string;
  addressDetails: string;
  notes: string;
}

export function formatWhatsAppOrderMessage(
  items: CartItem[],
  subtotal: number,
  deliveryFee: number,
  formData: OrderForm
): string {
  const total = subtotal + (formData.orderType === 'delivery' ? deliveryFee : 0);
  const now = new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' });

  let text = `🍔 *طلب جديد من موقع كرانشيز | Crunchies* 🍟\n`;
  text += `⏰ الوقت: ${now}\n`;
  text += `━━━━━━━━━━━━━━━━━━━\n`;
  text += `👤 *العميل:* ${formData.customerName || 'عميل كرانشيز'}\n`;
  text += `📱 *رقم الهاتف:* ${formData.customerPhone || 'غير مسجل'}\n`;
  
  if (formData.orderType === 'delivery') {
    text += `🛵 *نوع الطلب:* توصيل دليفري\n`;
    text += `📍 *المنطقة في الفيوم:* ${formData.area || 'الفيوم'}\n`;
    text += `🏠 *العنوان بالتفصيل:* ${formData.addressDetails || 'غير محدد'}\n`;
  } else if (formData.orderType === 'pickup') {
    text += `🛍️ *نوع الطلب:* استلام من الفرع (تيك أواي - لطف الله)\n`;
  } else {
    text += `🍽️ *نوع الطلب:* صالة في المطعم\n`;
  }

  if (formData.notes) {
    text += `📝 *ملاحظات خاصة:* ${formData.notes}\n`;
  }

  text += `━━━━━━━━━━━━━━━━━━━\n`;
  text += `📋 *تفاصيل الوجبات:*\n`;

  items.forEach((item, index) => {
    text += `\n*${index + 1}. ${item.menuItem.name}* (×${item.quantity})\n`;
    text += `   السعر: ${item.totalPrice} ج.م\n`;
    if (item.options.spiciness) {
      text += `   • درجة الحرارة: ${item.options.spiciness}\n`;
    }
    if (item.options.selectedExtras && item.options.selectedExtras.length > 0) {
      const extrasStr = item.options.selectedExtras.map(e => `${e.name} (+${e.price} ج)`).join(', ');
      text += `   • إضافات: ${extrasStr}\n`;
    }
  });

  text += `\n━━━━━━━━━━━━━━━━━━━\n`;
  text += `💰 *المجموع الفرعي:* ${subtotal} ج.م\n`;
  if (formData.orderType === 'delivery') {
    text += `🛵 *رسوم التوصيل:* ${deliveryFee} ج.م\n`;
  }
  text += `🔥 *الإجمالي النهائي:* ${total} ج.م\n`;
  text += `━━━━━━━━━━━━━━━━━━━\n`;
  text += `شكراً لاختياركم كرانشيز - الطعم اللي يستاهل التجربة! 🍗✨`;

  return encodeURIComponent(text);
}
