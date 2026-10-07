import React from 'react';
import { motion } from 'framer-motion';
import { Phone, ArrowDown, Sparkles, MessageCircle, Star, MapPin, Clock } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantInfo';
import heroImage from '../assets/images/hero_crunchies_feast_1791396625374.jpg';

interface HeroProps {
  onScrollToMenu: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onScrollToMenu }) => {
  return (
    <section id="hero" className="relative overflow-hidden pt-8 pb-16 lg:py-20 bg-stone-950 text-stone-100">
      {/* Subtle Background Glow Mesh */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-1/4 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Content Column with Framer Motion Slide-Up */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 space-y-6 text-right"
          >
            
            {/* Clean unboxed Kicker / Badge */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold tracking-wide uppercase text-amber-400"
            >
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
              <span className="font-english">Fast Food • Fayoum</span>
              <span aria-hidden="true" className="text-stone-600">/</span>
              <span className="text-stone-300">لطف الله، الفيوم</span>
            </motion.div>

            {/* Main Headline with balanced wrap */}
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight tracking-tight [text-wrap:balance]"
            >
              الطعم اللي يستاهل التجربة
            </motion.h1>

            {/* Subtitle */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="text-lg sm:text-xl text-stone-300 font-medium leading-relaxed max-w-2xl [text-wrap:balance]"
            >
              وجبات سريعة، نكهات مميزة، وتجربة تستاهل ترجع لها. برجر سماش طازج، دجاج كريسبي مقرمش، ومكرونات غرقانة بالجبنة.
            </motion.p>

            {/* Unboxed Metadata Trust Row (Zero-Pill Compliance) */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs sm:text-sm text-stone-400 pt-2 border-t border-stone-800/80"
            >
              <div className="flex items-center gap-1.5 text-amber-400 font-bold">
                <Star className="w-4 h-4 fill-amber-400" />
                <span className="font-mono tabular-nums">{RESTAURANT_INFO.rating}</span>
                <span className="text-stone-400 font-normal">من 5 ({RESTAURANT_INFO.reviewsCount} مراجعة)</span>
              </div>
              <span aria-hidden="true" className="text-stone-700">·</span>
              <div className="flex items-center gap-1.5 text-stone-300">
                <MapPin className="w-4 h-4 text-amber-500" />
                <span>بجوار عصائر العملاق</span>
              </div>
              <span aria-hidden="true" className="text-stone-700">·</span>
              <div className="flex items-center gap-1.5 text-stone-300">
                <Clock className="w-4 h-4 text-amber-500" />
                <span className="font-mono">12 ظهراً – 2 صباحاً</span>
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-wrap items-center gap-4 pt-4"
            >
              {/* Primary: View Menu */}
              <button
                onClick={onScrollToMenu}
                type="button"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-base font-bold text-stone-950 bg-amber-500 hover:bg-amber-400 active:scale-95 rounded-xl shadow-lg shadow-amber-500/20 transition-all focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-amber-500"
              >
                <span>شوف المنيو</span>
                <ArrowDown className="w-4 h-4" />
              </button>

              {/* Secondary: Call Now */}
              <a
                href={`tel:${RESTAURANT_INFO.phone}`}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-base font-bold text-stone-100 bg-stone-900 hover:bg-stone-800 border border-stone-700 rounded-xl transition-all active:scale-95 focus-visible:ring-2 focus-visible:ring-stone-500"
              >
                <Phone className="w-4 h-4 text-amber-400" />
                <span>اتصل الآن</span>
              </a>

              {/* WhatsApp Quick Order */}
              <a
                href={`https://wa.me/${RESTAURANT_INFO.whatsapp}?text=${encodeURIComponent('السلام عليكم، أريد طلب أوردر من مطعم كرانشيز')}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 text-base font-semibold text-emerald-400 hover:text-emerald-300 hover:bg-emerald-950/30 border border-emerald-800/60 rounded-xl transition-colors"
                title="طلب فوري عبر واتساب"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>طلب واتساب</span>
              </a>
            </motion.div>

            {/* Quiet Quick Value Highlights */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.45 }}
              className="grid grid-cols-3 gap-3 pt-4 max-w-xl text-stone-300"
            >
              <div className="border-r border-stone-800 pr-3 first:border-r-0">
                <span className="block text-white font-bold text-sm">قرمشة حقيقية</span>
                <span className="text-xs text-stone-400">تتبيلة طازجة 100%</span>
              </div>
              <div className="border-r border-stone-800 pr-3">
                <span className="block text-white font-bold text-sm">توصيل سريع</span>
                <span className="text-xs text-stone-400">ساخن لكل الفيوم</span>
              </div>
              <div className="border-r border-stone-800 pr-3">
                <span className="block text-white font-bold text-sm">سعر متوازن</span>
                <span className="text-xs text-stone-400 font-mono">200–400 ج للفرد</span>
              </div>
            </motion.div>

          </motion.div>

          {/* Visual Column with Framer Motion Entrance */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 relative"
          >
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              
              {/* Image Frame */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-stone-800 bg-stone-900 group">
                <img
                  src={heroImage}
                  alt="وجبة كرانشيز المميزة - برجر ودجاج مقرمش وبطاطس"
                  referrerPolicy="no-referrer"
                  className="w-full h-80 sm:h-96 lg:h-[420px] object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                />
                
                {/* Contrast Scrim */}
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/20 to-transparent pointer-events-none" />

                {/* Overlaid Editorial Food Caption */}
                <div className="absolute bottom-4 right-4 left-4 p-4 rounded-xl bg-stone-950/80 backdrop-blur-md border border-stone-800 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-amber-400 font-bold block">وجبة كرانشيز فاير & سماش</span>
                    <span className="text-sm font-semibold text-white">تتبيلة مقرمشة، صوصات غنية، وخبز بريوش طازج</span>
                  </div>
                  <button
                    onClick={onScrollToMenu}
                    className="shrink-0 text-xs font-bold text-stone-950 bg-amber-400 hover:bg-amber-300 px-3 py-1.5 rounded-lg transition-colors"
                  >
                    اطلبها
                  </button>
                </div>
              </div>

              {/* Verified Quality Floating Badge */}
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 bg-stone-900/95 border border-stone-700/80 shadow-xl rounded-xl p-3 flex items-center gap-2.5 backdrop-blur-sm"
              >
                <div className="w-8 h-8 rounded-lg bg-amber-500/20 flex items-center justify-center text-amber-400">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-white block">جودة وقرمشة مضمونة</span>
                  <span className="text-[11px] text-stone-400">لحوم ودواجن طازجة يومياً</span>
                </div>
              </motion.div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
