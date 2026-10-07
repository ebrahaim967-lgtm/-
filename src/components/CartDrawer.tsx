import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Trash2, Plus, Minus, MessageCircle, Phone, MapPin, Bike, Store, ArrowLeft, Sparkles, Navigation } from 'lucide-react';
import { CartItem, OrderForm, formatWhatsAppOrderMessage } from '../types/cart';
import { ActiveOrder } from '../types/orderTracker';
import { RESTAURANT_INFO } from '../data/restaurantInfo';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (cartId: string, delta: number) => void;
  onRemoveItem: (cartId: string) => void;
  onClearCart: () => void;
  onOrderPlaced: (order: ActiveOrder) => void;
  onLaunchDemoTracking?: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onOrderPlaced,
  onLaunchDemoTracking
}) => {
  const [orderForm, setOrderForm] = useState<OrderForm>({
    customerName: '',
    customerPhone: '',
    orderType: 'delivery',
    area: RESTAURANT_INFO.deliveryZones[0],
    addressDetails: '',
    notes: ''
  });

  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.totalPrice, 0);
  const deliveryFee = orderForm.orderType === 'delivery' && items.length > 0 ? 25 : 0;
  const grandTotal = subtotal + deliveryFee;

  const handleCheckoutAndTrack = (openWhatsApp: boolean = true) => {
    if (items.length === 0) return;

    const randomId = `#CR-${Math.floor(1000 + Math.random() * 9000)}`;
    const newOrder: ActiveOrder = {
      orderId: randomId,
      createdAt: new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' }),
      estimatedDeliveryMinutes: 28,
      stage: 'received',
      items: [...items],
      subtotal,
      deliveryFee,
      grandTotal,
      customerInfo: { ...orderForm },
      courier: {
        name: 'إسلام عثمان',
        phone: '01050610008',
        vehicle: 'سكوتر دليفري كرانشيز (أحمر)',
      }
    };

    if (openWhatsApp) {
      const msg = formatWhatsAppOrderMessage(items, subtotal, deliveryFee, orderForm);
      const url = `https://wa.me/${RESTAURANT_INFO.whatsapp}?text=${msg}`;
      window.open(url, '_blank');
    }

    onOrderPlaced(newOrder);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 overflow-hidden bg-stone-950/80 backdrop-blur-sm flex justify-end"
    >
      <motion.div 
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-md bg-stone-900 border-r sm:border-l border-stone-800 h-full flex flex-col text-stone-100 shadow-2xl"
        role="dialog"
        aria-modal="true"
      >
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 border-b border-stone-800 flex items-center justify-between bg-stone-950">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-white">سلة الطلبات</h2>
            <span className="text-xs font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full font-mono">
              {items.reduce((acc, i) => acc + i.quantity, 0)} وجبات
            </span>
          </div>

          <button
            onClick={onClose}
            type="button"
            className="p-2 text-stone-400 hover:text-white rounded-lg hover:bg-stone-800 transition-colors"
            aria-label="إغلاق السلة"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-6">
          
          {/* Empty State */}
          {items.length === 0 ? (
            <div className="py-16 text-center space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-stone-800/80 flex items-center justify-center text-stone-500">
                <Store className="w-8 h-8" />
              </div>
              <p className="text-base font-bold text-stone-300">سلتك فارغة حالياً</p>
              <p className="text-xs text-stone-500 max-w-xs mx-auto">
                تصفح قائمة الطعام واختر وجبات الدجاج المقرمش والبرجر والمكرونات المفضلة لديك.
              </p>
              
              <div className="space-y-2 pt-2">
                <button
                  onClick={onClose}
                  type="button"
                  className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2.5 text-xs font-bold text-stone-950 bg-amber-500 hover:bg-amber-400 rounded-xl"
                >
                  <span>تصفح المنيو الآن</span>
                </button>

                {onLaunchDemoTracking && (
                  <button
                    onClick={onLaunchDemoTracking}
                    type="button"
                    className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-bold text-amber-400 bg-stone-950 border border-amber-500/30 hover:border-amber-500 rounded-xl transition-colors"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>جرّب محاكي تتبع الطلب (Demo)</span>
                  </button>
                )}
              </div>
            </div>
          ) : (
            <>
              {/* Order Items List */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-stone-400">
                  <span>الوجبات المختارة</span>
                  <button
                    onClick={onClearCart}
                    className="text-stone-500 hover:text-red-400 transition-colors flex items-center gap-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>إفراغ السلة</span>
                  </button>
                </div>

                {items.map((item) => (
                  <div
                    key={item.cartId}
                    className="p-3.5 rounded-xl bg-stone-950 border border-stone-800/90 flex gap-3 text-right"
                  >
                    <img
                      src={item.menuItem.image}
                      alt={item.menuItem.name}
                      referrerPolicy="no-referrer"
                      className="w-16 h-16 rounded-lg object-cover shrink-0"
                    />

                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-1">
                          <h4 className="text-sm font-bold text-white truncate">
                            {item.menuItem.name}
                          </h4>
                          <button
                            onClick={() => onRemoveItem(item.cartId)}
                            className="text-stone-500 hover:text-red-400 p-0.5"
                            title="حذف"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {/* Options summary */}
                        <div className="text-[11px] text-stone-400 space-y-0.5 mt-0.5">
                          {item.options.spiciness && (
                            <p>• التتبيلة: {item.options.spiciness}</p>
                          )}
                          {item.options.selectedExtras && item.options.selectedExtras.length > 0 && (
                            <p>• إضافات: {item.options.selectedExtras.map(e => e.name).join(', ')}</p>
                          )}
                        </div>
                      </div>

                      {/* Quantity & Unit Price */}
                      <div className="flex items-center justify-between pt-2 border-t border-stone-900 mt-2">
                        <span className="font-mono tabular-nums text-sm font-bold text-amber-400">
                          {item.totalPrice} ج.م
                        </span>

                        <div className="flex items-center gap-2 bg-stone-900 border border-stone-800 rounded-md px-1.5 py-0.5">
                          <button
                            onClick={() => onUpdateQuantity(item.cartId, -1)}
                            className="p-0.5 text-stone-400 hover:text-white"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-bold font-mono px-1">{item.quantity}</span>
                          <button
                            onClick={() => onUpdateQuantity(item.cartId, 1)}
                            className="p-0.5 text-stone-400 hover:text-white"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Type Selector */}
              <div className="space-y-2 pt-2 border-t border-stone-800">
                <label className="block text-xs font-bold text-stone-300">
                  طريقة الاستلام:
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setOrderForm({ ...orderForm, orderType: 'delivery' })}
                    className={`flex items-center justify-center gap-2 py-2 px-3 rounded-lg border text-xs font-bold transition-all ${
                      orderForm.orderType === 'delivery'
                        ? 'bg-amber-500/20 border-amber-500 text-amber-300'
                        : 'bg-stone-950 border-stone-800 text-stone-400 hover:text-stone-200'
                    }`}
                  >
                    <Bike className="w-4 h-4" />
                    <span>توصيل دليفري (+25ج)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setOrderForm({ ...orderForm, orderType: 'pickup' })}
                    className={`flex items-center justify-center gap-2 py-2 px-3 rounded-lg border text-xs font-bold transition-all ${
                      orderForm.orderType === 'pickup'
                        ? 'bg-amber-500/20 border-amber-500 text-amber-300'
                        : 'bg-stone-950 border-stone-800 text-stone-400 hover:text-stone-200'
                    }`}
                  >
                    <Store className="w-4 h-4" />
                    <span>استلام من الفرع</span>
                  </button>
                </div>
              </div>

              {/* Delivery Details Form */}
              <div className="space-y-3 pt-2">
                <div>
                  <label className="block text-xs text-stone-300 mb-1">اسم العميل:</label>
                  <input
                    type="text"
                    value={orderForm.customerName}
                    onChange={(e) => setOrderForm({ ...orderForm, customerName: e.target.value })}
                    placeholder="مثال: أحمد محمود"
                    className="w-full bg-stone-950 border border-stone-800 rounded-lg px-3 py-2 text-xs text-white placeholder-stone-600 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs text-stone-300 mb-1">رقم الموبايل:</label>
                  <input
                    type="tel"
                    value={orderForm.customerPhone}
                    onChange={(e) => setOrderForm({ ...orderForm, customerPhone: e.target.value })}
                    placeholder="010XXXXXXXX"
                    className="w-full bg-stone-950 border border-stone-800 rounded-lg px-3 py-2 text-xs text-white placeholder-stone-600 focus:outline-none focus:border-amber-500 dir-ltr text-right"
                  />
                </div>

                {orderForm.orderType === 'delivery' && (
                  <>
                    <div>
                      <label className="block text-xs text-stone-300 mb-1">المنطقة في الفيوم:</label>
                      <select
                        value={orderForm.area}
                        onChange={(e) => setOrderForm({ ...orderForm, area: e.target.value })}
                        className="w-full bg-stone-950 border border-stone-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                      >
                        {RESTAURANT_INFO.deliveryZones.map(zone => (
                          <option key={zone} value={zone}>{zone}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs text-stone-300 mb-1">العنوان بالتفصيل:</label>
                      <input
                        type="text"
                        value={orderForm.addressDetails}
                        onChange={(e) => setOrderForm({ ...orderForm, addressDetails: e.target.value })}
                        placeholder="اسم الشارع، رقم العمارة، الدور، علامة مميزة"
                        className="w-full bg-stone-950 border border-stone-800 rounded-lg px-3 py-2 text-xs text-white placeholder-stone-600 focus:outline-none focus:border-amber-500"
                      />
                    </div>
                  </>
                )}

                <div>
                  <label className="block text-xs text-stone-300 mb-1">ملاحظات للأوردر (اختياري):</label>
                  <textarea
                    rows={2}
                    value={orderForm.notes}
                    onChange={(e) => setOrderForm({ ...orderForm, notes: e.target.value })}
                    placeholder="كاتشب زيادة، بدون مخلل، تجهيز سريع..."
                    className="w-full bg-stone-950 border border-stone-800 rounded-lg px-3 py-2 text-xs text-white placeholder-stone-600 focus:outline-none focus:border-amber-500 resize-none"
                  />
                </div>
              </div>
            </>
          )}

        </div>

        {/* Drawer Footer with Checkout Actions */}
        {items.length > 0 && (
          <div className="p-4 sm:p-5 bg-stone-950 border-t border-stone-800 space-y-3">
            {/* Price Calculations */}
            <div className="space-y-1.5 text-xs text-stone-400">
              <div className="flex justify-between">
                <span>المجموع الفرعي:</span>
                <span className="font-mono tabular-nums text-stone-200">{subtotal} ج.م</span>
              </div>
              {orderForm.orderType === 'delivery' && (
                <div className="flex justify-between">
                  <span>خدمة التوصيل (الفيوم):</span>
                  <span className="font-mono tabular-nums text-stone-200">{deliveryFee} ج.م</span>
                </div>
              )}
              <div className="flex justify-between text-base font-bold text-white pt-2 border-t border-stone-800/80">
                <span>الإجمالي النهائي:</span>
                <span className="font-mono tabular-nums text-amber-400 text-lg">{grandTotal} ج.م</span>
              </div>
            </div>

            {/* Primary Action: Send to WhatsApp & Launch Live Order Tracker */}
            <button
              onClick={() => handleCheckoutAndTrack(true)}
              type="button"
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold text-sm bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-900/30 transition-all active:scale-95"
            >
              <MessageCircle className="w-5 h-5" />
              <span>إرسال الطلب عبر واتساب وبدء التتبع ({grandTotal} ج)</span>
            </button>

            {/* Secondary Action: Direct Tracker simulation without opening external app */}
            <button
              onClick={() => handleCheckoutAndTrack(false)}
              type="button"
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl font-bold text-xs bg-amber-500 hover:bg-amber-400 text-stone-950 transition-colors"
            >
              <Navigation className="w-4 h-4" />
              <span>تأكيد الطلب وبدء محاكاة التتبع فوراً</span>
            </button>

            {/* Direct Call Button */}
            <a
              href={`tel:${RESTAURANT_INFO.phone}`}
              className="w-full flex items-center justify-center gap-2 py-2 px-4 rounded-xl font-bold text-xs bg-stone-900 hover:bg-stone-800 text-stone-200 border border-stone-800 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-amber-500" />
              <span>أو اتصال هاتفي: {RESTAURANT_INFO.phoneDisplay}</span>
            </a>
          </div>
        )}

      </motion.div>
    </motion.div>
  );
};
