import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { MenuSection } from './components/MenuSection';
import { ReviewsSection } from './components/ReviewsSection';
import { LocationSection } from './components/LocationSection';
import { Footer } from './components/Footer';
import { ProductModal } from './components/ProductModal';
import { CartDrawer } from './components/CartDrawer';
import { OrderTrackerModal } from './components/OrderTrackerModal';
import { MenuItem, MENU_ITEMS } from './data/menuData';
import { CartItem } from './types/cart';
import { ActiveOrder, OrderStatusStage } from './types/orderTracker';
import { RESTAURANT_INFO } from './data/restaurantInfo';
import { Phone, ShoppingBag, Bike } from 'lucide-react';

export default function App() {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('crunchies_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [selectedProduct, setSelectedProduct] = useState<MenuItem | null>(null);
  const [isProductModalOpen, setIsProductModalOpen] = useState<boolean>(false);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);

  // Active Order Tracking State
  const [activeOrder, setActiveOrder] = useState<ActiveOrder | null>(() => {
    try {
      const saved = localStorage.getItem('crunchies_active_order');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });
  const [isTrackerOpen, setIsTrackerOpen] = useState<boolean>(false);

  // Sync cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('crunchies_cart', JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  // Sync activeOrder to localStorage
  useEffect(() => {
    try {
      if (activeOrder) {
        localStorage.setItem('crunchies_active_order', JSON.stringify(activeOrder));
      } else {
        localStorage.removeItem('crunchies_active_order');
      }
    } catch (e) {
      console.error(e);
    }
  }, [activeOrder]);

  const handleOpenProductModal = (item: MenuItem) => {
    setSelectedProduct(item);
    setIsProductModalOpen(true);
  };

  const handleCloseProductModal = () => {
    setIsProductModalOpen(false);
    setSelectedProduct(null);
  };

  const handleAddToCart = (newItem: CartItem) => {
    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex(
        (ci) =>
          ci.menuItem.id === newItem.menuItem.id &&
          ci.options.spiciness === newItem.options.spiciness &&
          JSON.stringify(ci.options.selectedExtras) === JSON.stringify(newItem.options.selectedExtras)
      );

      if (existingIndex > -1) {
        const updated = [...prevCart];
        const existing = updated[existingIndex];
        const newQty = existing.quantity + newItem.quantity;
        updated[existingIndex] = {
          ...existing,
          quantity: newQty,
          totalPrice: existing.unitPrice * newQty,
        };
        return updated;
      }

      return [...prevCart, newItem];
    });
  };

  const handleUpdateQuantity = (cartId: string, delta: number) => {
    setCart((prevCart) => {
      return prevCart
        .map((item) => {
          if (item.cartId === cartId) {
            const nextQty = item.quantity + delta;
            if (nextQty <= 0) return null;
            return {
              ...item,
              quantity: nextQty,
              totalPrice: item.unitPrice * nextQty,
            };
          }
          return item;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const handleRemoveItem = (cartId: string) => {
    setCart((prev) => prev.filter((item) => item.cartId !== cartId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const handleOrderPlaced = (newOrder: ActiveOrder) => {
    setActiveOrder(newOrder);
    setCart([]); // Clear cart after order is placed
    setIsCartOpen(false);
    setIsTrackerOpen(true);
  };

  const handleUpdateStage = (nextStage: OrderStatusStage) => {
    if (activeOrder) {
      setActiveOrder({
        ...activeOrder,
        stage: nextStage,
      });
    }
  };

  const handleResetOrder = () => {
    if (activeOrder) {
      setActiveOrder({
        ...activeOrder,
        stage: 'received',
      });
    }
  };

  // Launch Demo Simulator with pre-filled delicious Crunchies meal
  const handleLaunchDemoTracking = () => {
    const demoItem1 = MENU_ITEMS[0];
    const demoItem2 = MENU_ITEMS[1];
    const demoOrder: ActiveOrder = {
      orderId: `#CR-${Math.floor(1000 + Math.random() * 9000)}`,
      createdAt: new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' }),
      estimatedDeliveryMinutes: 28,
      stage: 'received',
      items: [
        {
          cartId: 'demo-1',
          menuItem: demoItem1,
          quantity: 1,
          options: {
            spiciness: 'حار (سبايسي)',
            selectedExtras: [{ name: 'صوص جبنة شيدر سائلة', price: 25 }],
          },
          unitPrice: 235,
          totalPrice: 235,
        },
        {
          cartId: 'demo-2',
          menuItem: demoItem2,
          quantity: 1,
          options: {
            spiciness: 'عادي',
            selectedExtras: [],
          },
          unitPrice: 235,
          totalPrice: 235,
        },
      ],
      subtotal: 470,
      deliveryFee: 25,
      grandTotal: 495,
      customerInfo: {
        customerName: 'كريم الفيومي',
        customerPhone: '01050610008',
        orderType: 'delivery',
        area: 'حي الجامعة',
        addressDetails: 'بجوار مجمع الكليات، عمارة 4، الدور الثاني',
        notes: 'الاستربس مقرمش والبطاطس ساخنة لو سمحتوا',
      },
      courier: {
        name: 'إسلام عثمان',
        phone: '01050610008',
        vehicle: 'سكوتر دليفري كرانشيز (أحمر)',
      },
    };

    setActiveOrder(demoOrder);
    setIsCartOpen(false);
    setIsTrackerOpen(true);
  };

  const scrollToMenu = () => {
    const el = document.getElementById('menu');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartTotal = cart.reduce((acc, item) => acc + item.totalPrice, 0);

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 flex flex-col font-sans">
      {/* Top 3-Zone Header */}
      <Header
        cartCount={cartCount}
        cartTotal={cartTotal}
        onOpenCart={() => setIsCartOpen(true)}
        activeOrder={activeOrder}
        onOpenTracker={() => setIsTrackerOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        <Hero onScrollToMenu={scrollToMenu} />
        <AboutSection />
        <MenuSection onSelectItem={handleOpenProductModal} />
        <ReviewsSection />
        <LocationSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Product Customization Modal */}
      <AnimatePresence>
        {isProductModalOpen && selectedProduct && (
          <ProductModal
            item={selectedProduct}
            isOpen={isProductModalOpen}
            onClose={handleCloseProductModal}
            onAddToCart={handleAddToCart}
          />
        )}
      </AnimatePresence>

      {/* Shopping Cart Drawer */}
      <AnimatePresence>
        {isCartOpen && (
          <CartDrawer
            isOpen={isCartOpen}
            onClose={() => setIsCartOpen(false)}
            items={cart}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveItem}
            onClearCart={handleClearCart}
            onOrderPlaced={handleOrderPlaced}
            onLaunchDemoTracking={handleLaunchDemoTracking}
          />
        )}
      </AnimatePresence>

      {/* Order Tracker Modal (Interactive Simulator) */}
      <AnimatePresence>
        {isTrackerOpen && activeOrder && (
          <OrderTrackerModal
            order={activeOrder}
            isOpen={isTrackerOpen}
            onClose={() => setIsTrackerOpen(false)}
            onUpdateStage={handleUpdateStage}
            onResetOrder={handleResetOrder}
          />
        )}
      </AnimatePresence>

      {/* Mobile Quick Action Floating Bar (Under 15% Mobile Sticky Cap) */}
      <aside aria-label="شريط الطلب والتتبع السريع للجوال" className="sm:hidden fixed bottom-3 left-3 right-3 z-30 flex items-center gap-2 p-1.5 bg-stone-950/95 backdrop-blur-md border border-stone-800 rounded-2xl shadow-2xl">
        {activeOrder ? (
          <button
            onClick={() => setIsTrackerOpen(true)}
            type="button"
            className="flex-1 flex items-center justify-between px-3.5 py-2.5 bg-amber-500 text-stone-950 rounded-xl font-bold text-xs"
          >
            <div className="flex items-center gap-1.5">
              <Bike className="w-4 h-4 text-stone-950" />
              <span>تتبع الطلب ({activeOrder.orderId})</span>
            </div>
            <span className="font-mono text-[11px] bg-stone-950 text-amber-400 px-2 py-0.5 rounded-full font-bold">
              مباشر
            </span>
          </button>
        ) : (
          <button
            onClick={() => setIsCartOpen(true)}
            type="button"
            className="flex-1 flex items-center justify-between px-3.5 py-2.5 bg-amber-500 text-stone-950 rounded-xl font-bold text-xs"
          >
            <div className="flex items-center gap-1.5">
              <ShoppingBag className="w-4 h-4" />
              <span>عرض السلة</span>
            </div>
            <span className="font-mono tabular-nums bg-stone-950 text-amber-400 px-2 py-0.5 rounded-full text-[11px]">
              {cartCount > 0 ? `${cartCount} وجبة • ${cartTotal} ج` : '0 ج'}
            </span>
          </button>
        )}

        <a
          href={`tel:${RESTAURANT_INFO.phone}`}
          className="p-2.5 bg-stone-900 border border-stone-700 text-amber-400 rounded-xl flex items-center justify-center shrink-0"
          aria-label="اتصل الآن"
        >
          <Phone className="w-4 h-4" />
        </a>
      </aside>
    </div>
  );
}
