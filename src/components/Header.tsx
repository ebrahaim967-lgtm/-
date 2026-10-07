import React, { useState } from 'react';
import { ShoppingBag, Phone, Menu as MenuIcon, X, Navigation, Bike } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantInfo';
import { ActiveOrder } from '../types/orderTracker';

interface HeaderProps {
  cartCount: number;
  cartTotal: number;
  onOpenCart: () => void;
  activeOrder?: ActiveOrder | null;
  onOpenTracker?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ 
  cartCount, 
  cartTotal, 
  onOpenCart, 
  activeOrder, 
  onOpenTracker 
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-stone-950/90 backdrop-blur-md border-b border-stone-800/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Zone 1: Single text element wordmark */}
          <div className="flex items-center gap-3">
            <a 
              href="#hero" 
              className="group flex items-baseline gap-2 text-2xl sm:text-3xl font-black tracking-tight text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 rounded"
            >
              <span className="text-amber-500 group-hover:text-amber-400 transition-colors">كرانشيز</span>
              <span className="font-english text-stone-400 font-bold text-lg sm:text-xl group-hover:text-stone-300 transition-colors">Crunchies</span>
            </a>
          </div>

          {/* Zone 2: 4 Clean Text Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-stone-300">
            <a 
              href="#menu" 
              className="hover:text-amber-400 transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-amber-500 after:scale-x-0 hover:after:scale-x-100 after:transition-transform"
            >
              قائمة الطعام (المنيو)
            </a>
            <a 
              href="#about" 
              className="hover:text-amber-400 transition-colors py-1"
            >
              عن كرانشيز
            </a>
            <a 
              href="#reviews" 
              className="hover:text-amber-400 transition-colors py-1"
            >
              آراء العملاء
            </a>
            <a 
              href="#location" 
              className="hover:text-amber-400 transition-colors py-1"
            >
              الموقع والتوصيل
            </a>
          </nav>

          {/* Zone 3: Primary Actions (Phone CTA, Active Order Tracker & Cart) */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            
            {/* Active Order Tracker Button (Shows if there is an active tracked order) */}
            {activeOrder && onOpenTracker && (
              <button
                type="button"
                onClick={onOpenTracker}
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-amber-300 bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/40 rounded-lg transition-colors whitespace-nowrap"
                title="تتبع حالة طلبك المباشرة"
              >
                <Bike className="w-3.5 h-3.5 text-amber-400" />
                <span className="hidden sm:inline">تتبع الطلب</span>
                <span className="font-mono text-[11px] text-amber-400">{activeOrder.orderId}</span>
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
              </button>
            )}

            {/* Quick Call Button */}
            <a
              href={`tel:${RESTAURANT_INFO.phone}`}
              className="hidden lg:inline-flex items-center gap-2 px-3.5 py-2 text-xs font-bold text-stone-200 bg-stone-900 hover:bg-stone-800 border border-stone-700/80 rounded-lg transition-colors whitespace-nowrap focus-visible:ring-2 focus-visible:ring-amber-500"
              title="اتصل بكرانشيز الفيوم"
            >
              <Phone className="w-3.5 h-3.5 text-amber-500" />
              <span className="font-english dir-ltr">{RESTAURANT_INFO.phoneDisplay}</span>
            </a>

            {/* Cart Trigger Button */}
            <button
              onClick={onOpenCart}
              type="button"
              className="relative flex items-center gap-2 px-3.5 sm:px-4 py-2 text-xs sm:text-sm font-bold text-stone-950 bg-amber-500 hover:bg-amber-400 rounded-lg shadow-md transition-all active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-amber-500 whitespace-nowrap"
              aria-label="عرض سلة الطلبات"
            >
              <ShoppingBag className="w-4 h-4 text-stone-950" />
              <span className="hidden sm:inline">السلة</span>
              {cartCount > 0 ? (
                <span className="inline-flex items-center justify-center bg-stone-950 text-amber-400 text-xs font-bold px-2 py-0.5 rounded-full font-mono tabular-nums">
                  {cartCount} • {cartTotal} ج
                </span>
              ) : (
                <span className="text-xs opacity-75 font-mono">0 ج</span>
              )}
            </button>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              type="button"
              className="md:hidden p-2 text-stone-300 hover:text-white hover:bg-stone-900 rounded-lg focus-visible:ring-2 focus-visible:ring-amber-500"
              aria-label="القائمة الرئيسية"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Nav */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-stone-800 bg-stone-950/95 space-y-3">
            {activeOrder && onOpenTracker && (
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenTracker();
                }}
                className="w-full flex items-center justify-between px-3 py-2.5 text-sm font-bold text-amber-300 bg-amber-500/15 border border-amber-500/30 rounded-xl"
              >
                <div className="flex items-center gap-2">
                  <Bike className="w-4 h-4 text-amber-400" />
                  <span>تتبع طلبك الحالي ({activeOrder.orderId})</span>
                </div>
                <span className="text-xs bg-amber-500 text-stone-950 px-2 py-0.5 rounded-md font-bold">
                  مباشر
                </span>
              </button>
            )}

            <a
              href="#menu"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-base font-semibold text-stone-200 hover:bg-stone-900 rounded-lg"
            >
              قائمة الطعام (المنيو)
            </a>
            <a
              href="#about"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-base font-semibold text-stone-200 hover:bg-stone-900 rounded-lg"
            >
              عن كرانشيز
            </a>
            <a
              href="#reviews"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-base font-semibold text-stone-200 hover:bg-stone-900 rounded-lg"
            >
              آراء العملاء
            </a>
            <a
              href="#location"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-base font-semibold text-stone-200 hover:bg-stone-900 rounded-lg"
            >
              الموقع والتوصيل
            </a>
            <div className="pt-2 border-t border-stone-800">
              <a
                href={`tel:${RESTAURANT_INFO.phone}`}
                className="flex items-center justify-center gap-2 w-full py-2.5 text-sm font-bold text-stone-100 bg-stone-900 border border-stone-700 rounded-lg"
              >
                <Phone className="w-4 h-4 text-amber-500" />
                <span>اتصل الآن: {RESTAURANT_INFO.phoneDisplay}</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
