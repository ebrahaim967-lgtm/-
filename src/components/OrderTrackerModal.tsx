import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  X, CheckCircle, Clock, Bike, ChefHat, PackageCheck, 
  MapPin, Phone, MessageCircle, Play, FastForward, RotateCcw,
  Sparkles, AlertCircle, ShoppingBag
} from 'lucide-react';
import { ActiveOrder, ORDER_STAGES, OrderStatusStage } from '../types/orderTracker';
import { RESTAURANT_INFO } from '../data/restaurantInfo';

interface OrderTrackerModalProps {
  order: ActiveOrder | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdateStage: (nextStage: OrderStatusStage) => void;
  onResetOrder: () => void;
}

export const OrderTrackerModal: React.FC<OrderTrackerModalProps> = ({
  order,
  isOpen,
  onClose,
  onUpdateStage,
  onResetOrder
}) => {
  const [autoSimulate, setAutoSimulate] = useState(false);
  const [minutesRemaining, setMinutesRemaining] = useState(28);

  const stageOrder: OrderStatusStage[] = ['received', 'preparing', 'packaged', 'delivering', 'delivered'];
  const currentIndex = order ? stageOrder.indexOf(order.stage) : 0;

  // Auto simulate progression timer
  useEffect(() => {
    let interval: any;
    if (autoSimulate && order && currentIndex < stageOrder.length - 1) {
      interval = setInterval(() => {
        const next = stageOrder[currentIndex + 1];
        if (next) {
          onUpdateStage(next);
        }
      }, 7000);
    }
    return () => clearInterval(interval);
  }, [autoSimulate, currentIndex, order, onUpdateStage]);

  // Adjust remaining minutes depending on current stage
  useEffect(() => {
    if (!order) return;
    switch (order.stage) {
      case 'received':
        setMinutesRemaining(28);
        break;
      case 'preparing':
        setMinutesRemaining(20);
        break;
      case 'packaged':
        setMinutesRemaining(14);
        break;
      case 'delivering':
        setMinutesRemaining(7);
        break;
      case 'delivered':
        setMinutesRemaining(0);
        break;
    }
  }, [order?.stage]);

  if (!isOpen || !order) return null;

  const handleNextStage = () => {
    if (currentIndex < stageOrder.length - 1) {
      onUpdateStage(stageOrder[currentIndex + 1]);
    }
  };

  const handlePrevStage = () => {
    if (currentIndex > 0) {
      onUpdateStage(stageOrder[currentIndex - 1]);
    }
  };

  const currentStageInfo = ORDER_STAGES.find((s) => s.stage === order.stage) || ORDER_STAGES[0];

  const getStageIcon = (stage: OrderStatusStage) => {
    switch (stage) {
      case 'received':
        return <Clock className="w-5 h-5" />;
      case 'preparing':
        return <ChefHat className="w-5 h-5" />;
      case 'packaged':
        return <PackageCheck className="w-5 h-5" />;
      case 'delivering':
        return <Bike className="w-5 h-5" />;
      case 'delivered':
        return <CheckCircle className="w-5 h-5" />;
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4"
    >
      <motion.div 
        initial={{ opacity: 0, scale: 0.94, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 16 }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-2xl bg-stone-900 border border-stone-800 rounded-3xl shadow-2xl overflow-hidden text-stone-100 my-4"
        role="dialog"
        aria-modal="true"
      >
        {/* Top Header */}
        <div className="p-4 sm:p-6 bg-stone-950 border-b border-stone-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Bike className="w-5 h-5" />
            </div>
            <div className="text-right">
              <div className="flex items-center gap-2">
                <span className="text-xs text-stone-400 font-mono">رقم الطلب:</span>
                <span className="text-sm font-bold text-amber-400 font-mono">{order.orderId}</span>
              </div>
              <h2 className="text-base sm:text-lg font-bold text-white">تتبع طلب كرانشيز المباشر</h2>
            </div>
          </div>

          <button
            onClick={onClose}
            type="button"
            className="p-2 text-stone-400 hover:text-white rounded-lg hover:bg-stone-800 transition-colors"
            aria-label="إغلاق التتبع"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-5 sm:p-7 space-y-6 max-h-[75vh] overflow-y-auto">
          
          {/* Main Status Hero Card */}
          <div className="p-5 sm:p-6 rounded-2xl bg-stone-950 border border-stone-800/90 text-right relative overflow-hidden">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-2 text-xs font-bold text-amber-400 mb-1">
                  <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
                  <span>حالة الطلب الحالية</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-white">
                  {currentStageInfo.title}
                </h3>
                <p className="text-xs sm:text-sm text-stone-400 mt-1">
                  {currentStageInfo.detail}
                </p>
              </div>

              {/* Estimated Countdown Badge */}
              <div className="sm:text-left bg-stone-900/90 border border-stone-800 p-3 sm:p-4 rounded-xl shrink-0">
                <span className="text-[11px] text-stone-400 block mb-0.5">الوقت المتوقع للوصول</span>
                <div className="flex items-baseline gap-1 text-amber-400 font-mono font-bold text-xl sm:text-2xl tabular-nums">
                  {order.stage === 'delivered' ? (
                    <span className="text-emerald-400 text-lg">وصل بالعافية 🎉</span>
                  ) : (
                    <>
                      <span>{minutesRemaining}</span>
                      <span className="text-xs font-sans text-stone-300">دقيقة</span>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Simulated Live Route Bar */}
            <div className="mt-5 pt-4 border-t border-stone-900 flex items-center justify-between text-xs text-stone-400">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-amber-500" />
                <span className="text-white font-medium">الفرع: لطف الله</span>
              </div>
              <div className="h-0.5 flex-1 mx-3 bg-stone-800 relative">
                <div 
                  className="h-full bg-gradient-to-r from-amber-500 to-amber-400 transition-all duration-700"
                  style={{ width: `${((currentIndex + 1) / stageOrder.length) * 100}%` }}
                />
              </div>
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-white font-medium">
                  {order.customerInfo.area || 'الفيوم'}
                </span>
              </div>
            </div>
          </div>

          {/* Interactive Simulation Controls */}
          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex flex-col sm:flex-row items-center justify-between gap-3 text-right">
            <div>
              <span className="text-xs font-bold text-amber-300 block flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>لوحة تحكم محاكاة الطلب (Live Demo Simulator)</span>
              </span>
              <p className="text-[11px] text-stone-400 mt-0.5">
                يمكنك التقديم السريع لمراحل الطلب لمشاهدة دورة حياة الطلب كاملة فورياً.
              </p>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
              <button
                type="button"
                onClick={() => setAutoSimulate(!autoSimulate)}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg border transition-colors flex items-center gap-1 ${
                  autoSimulate 
                    ? 'bg-amber-500 text-stone-950 border-amber-500' 
                    : 'bg-stone-900 border-stone-700 text-stone-300 hover:text-white'
                }`}
              >
                <Play className="w-3 h-3" />
                <span>{autoSimulate ? 'إيقاف التلقائي' : 'محاكاة تلقائية'}</span>
              </button>

              <button
                type="button"
                disabled={currentIndex >= stageOrder.length - 1}
                onClick={handleNextStage}
                className="px-3 py-1.5 text-xs font-bold rounded-lg bg-amber-500 hover:bg-amber-400 disabled:opacity-40 text-stone-950 transition-colors flex items-center gap-1"
              >
                <span>المرحلة التالية</span>
                <FastForward className="w-3 h-3" />
              </button>

              <button
                type="button"
                onClick={onResetOrder}
                className="p-1.5 text-stone-400 hover:text-white bg-stone-900 border border-stone-700 rounded-lg transition-colors"
                title="إعادة تعيين المحاكاة"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Visual Step-by-Step Progress Timeline */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-stone-400 text-right uppercase tracking-wider">
              مراحل تجهيز وتوصيل الوجبة
            </h4>

            <div className="relative border-r-2 border-stone-800 mr-4 space-y-6 pb-2">
              {ORDER_STAGES.map((step, idx) => {
                const isPassed = idx < currentIndex;
                const isCurrent = idx === currentIndex;
                const isPending = idx > currentIndex;

                return (
                  <div key={step.stage} className="relative pr-6 text-right">
                    {/* Step Milestone Marker */}
                    <div 
                      className={`absolute -right-[13px] top-0 w-6 h-6 rounded-full flex items-center justify-center transition-all ${
                        isPassed 
                          ? 'bg-emerald-500 text-stone-950 shadow-md shadow-emerald-500/20' 
                          : isCurrent
                          ? 'bg-amber-500 text-stone-950 ring-4 ring-amber-500/20 animate-pulse'
                          : 'bg-stone-800 text-stone-500'
                      }`}
                    >
                      {isPassed ? (
                        <CheckCircle className="w-3.5 h-3.5 stroke-[3]" />
                      ) : (
                        <span className="text-[10px] font-bold font-mono">{idx + 1}</span>
                      )}
                    </div>

                    {/* Step Content */}
                    <div>
                      <div className="flex items-center justify-between gap-2">
                        <span className={`text-sm font-bold ${
                          isCurrent ? 'text-amber-400' : isPassed ? 'text-white' : 'text-stone-500'
                        }`}>
                          {step.title}
                        </span>
                        <span className="text-[11px] font-mono text-stone-500">
                          {step.timeEstimate}
                        </span>
                      </div>
                      <p className="text-xs text-stone-400 mt-0.5 leading-relaxed">
                        {step.subtitle}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Courier Card (Shows during packaged, delivering, or delivered) */}
          {currentIndex >= 2 && (
            <div className="p-4 rounded-2xl bg-stone-950 border border-stone-800 flex items-center justify-between text-right">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-stone-800 border border-stone-700 flex items-center justify-center text-amber-400">
                  <Bike className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[11px] text-amber-500 font-bold block">كابتن توصيل كرانشيز</span>
                  <h5 className="text-sm font-bold text-white">{order.courier.name}</h5>
                  <span className="text-xs text-stone-400">{order.courier.vehicle}</span>
                </div>
              </div>

              <div className="flex gap-2">
                <a
                  href={`tel:${order.courier.phone}`}
                  className="p-2.5 bg-stone-900 hover:bg-stone-800 border border-stone-700 text-stone-200 rounded-xl transition-colors"
                  title="اتصل بالكابتن"
                >
                  <Phone className="w-4 h-4 text-amber-400" />
                </a>
                <a
                  href={`https://wa.me/2${order.courier.phone}`}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 bg-stone-900 hover:bg-stone-800 border border-stone-700 text-emerald-400 rounded-xl transition-colors"
                  title="واتساب الكابتن"
                >
                  <MessageCircle className="w-4 h-4" />
                </a>
              </div>
            </div>
          )}

          {/* Order Receipt Details Summary */}
          <div className="p-4 rounded-2xl bg-stone-950/70 border border-stone-800/80 space-y-3 text-right text-xs">
            <div className="flex items-center justify-between pb-2 border-b border-stone-900 font-bold text-stone-300">
              <div className="flex items-center gap-1.5">
                <ShoppingBag className="w-3.5 h-3.5 text-amber-500" />
                <span>ملخص محتويات الوجبة</span>
              </div>
              <span className="font-mono tabular-nums text-amber-400 font-bold">
                {order.grandTotal} ج.م
              </span>
            </div>

            <div className="space-y-1.5 text-stone-400">
              {order.items.map((it) => (
                <div key={it.cartId} className="flex justify-between items-center">
                  <span>
                    {it.menuItem.name} <span className="font-mono">×{it.quantity}</span>
                    {it.options.spiciness && ` (${it.options.spiciness})`}
                  </span>
                  <span className="font-mono tabular-nums text-stone-300">{it.totalPrice} ج</span>
                </div>
              ))}
            </div>

            <div className="pt-2 border-t border-stone-900 flex justify-between text-stone-400">
              <span>العنوان:</span>
              <span className="text-stone-300">
                {order.customerInfo.orderType === 'delivery'
                  ? `${order.customerInfo.area} - ${order.customerInfo.addressDetails || 'الفيوم'}`
                  : 'استلام من فرع لطف الله'}
              </span>
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 bg-stone-950 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <a
            href={`tel:${RESTAURANT_INFO.phone}`}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-bold text-stone-200 bg-stone-900 hover:bg-stone-800 border border-stone-700 rounded-xl transition-colors"
          >
            <Phone className="w-4 h-4 text-amber-400" />
            <span>مساعدة المطعم: {RESTAURANT_INFO.phoneDisplay}</span>
          </a>

          <button
            onClick={onClose}
            type="button"
            className="w-full sm:w-auto px-6 py-2.5 text-xs font-bold text-stone-950 bg-amber-500 hover:bg-amber-400 rounded-xl transition-colors"
          >
            متابعة التصفح
          </button>
        </div>

      </motion.div>
    </motion.div>
  );
};
