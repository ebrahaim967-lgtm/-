import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Flame, Plus } from 'lucide-react';
import { MENU_CATEGORIES, MENU_ITEMS, MenuItem } from '../data/menuData';

interface MenuSectionProps {
  onSelectItem: (item: MenuItem) => void;
}

export const MenuSection: React.FC<MenuSectionProps> = ({ onSelectItem }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [onlySpicy, setOnlySpicy] = useState<boolean>(false);

  // Filter items based on category, search, and spiciness
  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      // Category match
      let matchesCat = true;
      if (activeCategory === 'popular') {
        matchesCat = item.isPopular === true;
      } else if (activeCategory !== 'all') {
        matchesCat = item.category === activeCategory;
      }

      // Search match
      const query = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !query ||
        item.name.toLowerCase().includes(query) ||
        item.nameEn.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query);

      // Spicy filter
      const matchesSpicy = !onlySpicy || item.isSpicy === true;

      return matchesCat && matchesSearch && matchesSpicy;
    });
  }, [activeCategory, searchQuery, onlySpicy]);

  return (
    <section id="menu" className="py-16 lg:py-24 bg-stone-950 text-stone-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Fade-In */}
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto mb-10 space-y-3"
        >
          <div className="inline-flex items-center justify-center gap-2 text-xs sm:text-sm font-bold uppercase tracking-wider text-amber-500">
            <span>منيو كرانشيز الفيوم</span>
            <span aria-hidden="true" className="text-stone-700">·</span>
            <span className="font-english">Authentic Fast Food</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            قائمة الطعام والمأكولات
          </h2>
          <p className="text-stone-400 text-sm sm:text-base leading-relaxed">
            استمتع بأقوى وجبات الدجاج المقرمش، برجر السماش الأصيل، وطواجن المكرونة الساخنة المحضرة طازجة بكل حب.
          </p>
        </motion.div>

        {/* Search & Filter Controls */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8"
        >
          {/* Search Box */}
          <div className="relative w-full sm:w-80">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ابحث عن وجبة أو ساندوتش..."
              className="w-full bg-stone-900 border border-stone-800 text-stone-200 placeholder-stone-500 text-sm rounded-xl py-2.5 pr-10 pl-4 focus:outline-none focus:border-amber-500 transition-colors"
            />
            <Search className="w-4 h-4 text-stone-500 absolute top-1/2 -translate-y-1/2 right-3.5" />
          </div>

          {/* Spicy Toggle Button */}
          <button
            type="button"
            onClick={() => setOnlySpicy(!onlySpicy)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold border transition-all ${
              onlySpicy
                ? 'bg-red-500/20 border-red-500 text-red-400'
                : 'bg-stone-900 border-stone-800 text-stone-400 hover:text-stone-200'
            }`}
          >
            <Flame className="w-4 h-4 text-red-500" />
            <span>وجبات حارة (سبايسي) فقط</span>
          </button>
        </motion.div>

        {/* Category Tabs (Segmented Control conforming to Zero-Pill Rules) */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="flex items-center gap-1.5 p-1.5 bg-stone-900/90 border border-stone-800 rounded-xl overflow-x-auto scrollbar-none mb-10 max-w-full"
        >
          {MENU_CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`relative px-4 py-2 text-xs sm:text-sm font-bold rounded-lg transition-all whitespace-nowrap shrink-0 ${
                  isActive
                    ? 'text-stone-950 shadow-sm'
                    : 'text-stone-400 hover:text-stone-200 hover:bg-stone-800/60'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeCategoryBg"
                    className="absolute inset-0 bg-amber-500 rounded-lg -z-0"
                    transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                  />
                )}
                <span className="relative z-10">{cat.name}</span>
              </button>
            );
          })}
        </motion.div>

        {/* Menu Items Grid */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-16 bg-stone-900/40 rounded-2xl border border-stone-800/80">
            <p className="text-stone-400 text-base mb-2">لم نجد أي وجبات مطابقة لبحثك</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('all');
                setOnlySpicy(false);
              }}
              className="text-xs font-bold text-amber-400 hover:underline"
            >
              عرض كل وجبات المنيو
            </button>
          </div>
        ) : (
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
          >
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item, idx) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ 
                    duration: 0.4, 
                    delay: Math.min(idx * 0.05, 0.3),
                    ease: [0.16, 1, 0.3, 1] 
                  }}
                  className="group flex flex-col bg-stone-900/80 border border-stone-800/90 rounded-2xl overflow-hidden hover:border-amber-500/40 transition-colors duration-300 shadow-lg"
                >
                  {/* Food Image Container */}
                  <div className="relative h-52 sm:h-56 w-full bg-stone-950 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                    
                    {/* Scrim Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-stone-900/20 to-transparent pointer-events-none" />

                    {/* Clean unboxed text indicators */}
                    <div className="absolute top-3 right-3 left-3 flex justify-between items-start pointer-events-none">
                      {item.isPopular ? (
                        <span className="text-[11px] font-bold text-amber-300 bg-stone-950/80 backdrop-blur-sm px-2.5 py-1 rounded-md border border-amber-500/30">
                          الأكثر طلبًا 🔥
                        </span>
                      ) : item.isNew ? (
                        <span className="text-[11px] font-bold text-emerald-300 bg-stone-950/80 backdrop-blur-sm px-2.5 py-1 rounded-md border border-emerald-500/30">
                          جديد كرانشيز ⭐
                        </span>
                      ) : <span />}

                      {item.isSpicy && (
                        <span className="text-[11px] font-bold text-red-400 bg-stone-950/80 backdrop-blur-sm px-2 py-1 rounded-md border border-red-500/30 flex items-center gap-1">
                          <Flame className="w-3 h-3 text-red-500" />
                          <span>حار</span>
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-5 flex-1 flex flex-col justify-between text-right space-y-4">
                    <div className="space-y-2">
                      {/* Item Title & English Name */}
                      <div className="flex items-baseline justify-between gap-2">
                        <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-amber-400 transition-colors">
                          {item.name}
                        </h3>
                      </div>
                      <span className="text-xs text-stone-500 font-medium block">
                        {item.nameEn}
                      </span>

                      {/* Short Description */}
                      <p className="text-xs sm:text-sm text-stone-400 leading-relaxed line-clamp-2">
                        {item.description}
                      </p>
                    </div>

                    {/* Card Bottom: Price & Add Button */}
                    <div className="pt-3 border-t border-stone-800/80 flex items-center justify-between gap-3">
                      <div className="text-right">
                        <span className="text-xs text-stone-500 block">السعر</span>
                        <span className="text-xl font-black text-amber-400 font-mono tabular-nums">
                          {item.price} <span className="text-xs text-stone-400 font-normal">ج.م</span>
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={() => onSelectItem(item)}
                        className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 text-xs sm:text-sm font-bold text-stone-950 bg-amber-500 hover:bg-amber-400 active:scale-95 rounded-xl shadow transition-all focus-visible:ring-2 focus-visible:ring-amber-500"
                      >
                        <Plus className="w-4 h-4 stroke-[2.5]" />
                        <span>طلب الوجبة</span>
                      </button>
                    </div>
                  </div>

                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

      </div>
    </section>
  );
};
