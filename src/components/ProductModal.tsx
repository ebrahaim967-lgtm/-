import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Plus, Minus, Flame, ShoppingBag, Check } from 'lucide-react';
import { MenuItem } from '../data/menuData';
import { CartItem } from '../types/cart';

interface ProductModalProps {
  item: MenuItem | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (cartItem: CartItem) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  item,
  isOpen,
  onClose,
  onAddToCart
}) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedSpiciness, setSelectedSpiciness] = useState<string>('عادي');
  const [selectedExtras, setSelectedExtras] = useState<{ name: string; price: number }[]>([]);
  const [addedSuccess, setAddedSuccess] = useState(false);

  // Sync state when item changes
  React.useEffect(() => {
    if (item) {
      setQuantity(1);
      setSelectedSpiciness(
        item.options?.spiciness?.[0] || (item.isSpicy ? 'حار (سبايسي)' : 'عادي')
      );
      setSelectedExtras([]);
      setAddedSuccess(false);
    }
  }, [item]);

  if (!isOpen || !item) return null;

  const toggleExtra = (extra: { name: string; price: number }) => {
    if (selectedExtras.some(e => e.name === extra.name)) {
      setSelectedExtras(selectedExtras.filter(e => e.name !== extra.name));
    } else {
      setSelectedExtras([...selectedExtras, extra]);
    }
  };

  const extrasTotal = selectedExtras.reduce((sum, e) => sum + e.price, 0);
  const unitPrice = item.price + extrasTotal;
  const totalPrice = unitPrice * quantity;

  const handleAdd = () => {
    const cartItem: CartItem = {
      cartId: `${item.id}-${Date.now()}`,
      menuItem: item,
      quantity,
      options: {
        spiciness: selectedSpiciness,
        selectedExtras: selectedExtras,
      },
      unitPrice,
      totalPrice
    };

    onAddToCart(cartItem);
    setAddedSuccess(true);
    setTimeout(() => {
      setAddedSuccess(false);
      onClose();
    }, 600);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/80 backdrop-blur-sm flex items-center justify-center p-4"
    >
      <motion.div 
        initial={{ opacity: 0, scale: 0.94, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 16 }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-lg bg-stone-900 border border-stone-800 rounded-2xl shadow-2xl overflow-hidden text-stone-100"
        role="dialog"
        aria-modal="true"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          type="button"
          className="absolute top-4 left-4 z-10 p-2 text-stone-400 hover:text-white bg-stone-950/70 hover:bg-stone-950 rounded-full transition-colors"
          aria-label="إغلاق"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Product Image */}
        <div className="relative h-56 sm:h-64 w-full bg-stone-950 overflow-hidden">
          <img
            src={item.image}
            alt={item.name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-transparent to-transparent pointer-events-none" />
          
          <div className="absolute bottom-3 right-4 left-4 flex justify-between items-end">
            <div>
              <span className="text-xs text-amber-400 font-bold block">{item.nameEn}</span>
              <h3 className="text-xl sm:text-2xl font-bold text-white">{item.name}</h3>
            </div>
            <span className="text-xl sm:text-2xl font-bold text-amber-400 font-mono tabular-nums">
              {item.price} ج.م
            </span>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 space-y-5 text-right max-h-[60vh] overflow-y-auto">
          {/* Description */}
          <p className="text-sm text-stone-300 leading-relaxed">
            {item.description}
          </p>

          {/* Spiciness Options */}
          {item.options?.spiciness && item.options.spiciness.length > 0 && (
            <div className="space-y-2">
              <label className="block text-xs font-bold text-stone-300">
                درجة الحرارة / التتبيلة
              </label>
              <div className="grid grid-cols-2 gap-2">
                {item.options.spiciness.map((spice) => (
                  <button
                    key={spice}
                    type="button"
                    onClick={() => setSelectedSpiciness(spice)}
                    className={`py-2 px-3 text-xs sm:text-sm font-semibold rounded-lg border text-center transition-all ${
                      selectedSpiciness === spice
                        ? 'bg-amber-500/20 border-amber-500 text-amber-300 shadow-sm'
                        : 'bg-stone-950/60 border-stone-800 text-stone-300 hover:border-stone-700'
                    }`}
                  >
                    {spice}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Extras / Add-ons */}
          {item.options?.extras && item.options.extras.length > 0 && (
            <div className="space-y-2">
              <label className="block text-xs font-bold text-stone-300">
                إضافات وصوصات مميزة (اختياري)
              </label>
              <div className="space-y-2">
                {item.options.extras.map((extra) => {
                  const isChecked = selectedExtras.some(e => e.name === extra.name);
                  return (
                    <button
                      key={extra.name}
                      type="button"
                      onClick={() => toggleExtra(extra)}
                      className={`w-full flex items-center justify-between p-3 rounded-xl border text-xs sm:text-sm transition-all ${
                        isChecked
                          ? 'bg-amber-500/10 border-amber-500/60 text-white'
                          : 'bg-stone-950/40 border-stone-800/80 text-stone-300 hover:border-stone-700'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <div className={`w-4 h-4 rounded border flex items-center justify-center ${
                          isChecked ? 'bg-amber-500 border-amber-500 text-stone-950' : 'border-stone-600'
                        }`}>
                          {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                        <span className="font-medium">{extra.name}</span>
                      </div>
                      <span className="font-mono tabular-nums text-amber-400 font-bold">
                        +{extra.price} ج
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Quantity Selector */}
          <div className="pt-2 border-t border-stone-800 flex items-center justify-between">
            <span className="text-sm font-bold text-stone-300">الكمية:</span>
            <div className="flex items-center gap-3 bg-stone-950 border border-stone-800 rounded-lg p-1">
              <button
                type="button"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-1.5 text-stone-400 hover:text-white rounded hover:bg-stone-800 transition-colors"
                aria-label="تقليل الكمية"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="font-mono tabular-nums font-bold text-base px-2 text-white">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity(quantity + 1)}
                className="p-1.5 text-stone-400 hover:text-white rounded hover:bg-stone-800 transition-colors"
                aria-label="زيادة الكمية"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Modal Footer / Add Button */}
        <div className="p-4 sm:p-5 bg-stone-950 border-t border-stone-800 flex items-center justify-between gap-4">
          <div className="text-right">
            <span className="text-xs text-stone-400 block">الإجمالي:</span>
            <span className="text-lg sm:text-xl font-black text-amber-400 font-mono tabular-nums">
              {totalPrice} ج.م
            </span>
          </div>

          <button
            onClick={handleAdd}
            type="button"
            className={`flex-1 flex items-center justify-center gap-2 py-3 px-5 rounded-xl font-bold text-sm sm:text-base transition-all active:scale-95 ${
              addedSuccess
                ? 'bg-emerald-600 text-white'
                : 'bg-amber-500 hover:bg-amber-400 text-stone-950 shadow-md shadow-amber-500/20'
            }`}
          >
            {addedSuccess ? (
              <>
                <Check className="w-4 h-4 stroke-[3]" />
                <span>تمت الإضافة للسلة!</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-4 h-4" />
                <span>أضف للطلب ({totalPrice} ج)</span>
              </>
            )}
          </button>
        </div>

      </motion.div>
    </motion.div>
  );
};
