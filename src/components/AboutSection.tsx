import React from 'react';
import { motion } from 'framer-motion';
import { Flame, UtensilsCrossed, ShieldCheck, HeartHandshake } from 'lucide-react';
import atmosphereImg from '../assets/images/crunchies_atmosphere_1791396667004.jpg';
import { RESTAURANT_INFO } from '../data/restaurantInfo';

const PILLARS = [
  {
    icon: Flame,
    title: 'قرمشة حقيقية وطهي فوري',
    desc: 'دجاج مقرمش ذهبي وتتبيلة مميزة بدون زفارة أو زيت زيادة، طازج أول بأول.'
  },
  {
    icon: UtensilsCrossed,
    title: 'تنوع يجمع كل العيلة',
    desc: 'سماش برجر، استربس، مكرونات ساخنة، وساندوتشات كرانشيز تناسب كل رغباتك.'
  },
  {
    icon: ShieldCheck,
    title: 'نظافة ومكونات موثوقة',
    desc: 'التزام تام بأعلى معايير الجودة والطهي الصحي والنظافة في مطبخنا.'
  },
  {
    icon: HeartHandshake,
    title: 'خدمة وتوصيل سريع',
    desc: 'فريق عمل ودود وتغطية توصيل لجميع أحياء الفيوم مع تغليف حراري محكم.'
  }
];

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-16 lg:py-24 bg-stone-900/60 border-t border-b border-stone-800/80 text-stone-100 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Visual Column */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 order-2 lg:order-1"
          >
            <div className="relative rounded-2xl overflow-hidden border border-stone-800 shadow-xl bg-stone-950 group">
              <img
                src={atmosphereImg}
                alt="أجواء مطعم كرانشيز في الفيوم"
                referrerPolicy="no-referrer"
                className="w-full h-80 sm:h-96 object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent pointer-events-none" />
              
              <div className="absolute bottom-4 right-4 left-4 p-4 rounded-xl bg-stone-950/85 backdrop-blur-md border border-stone-800/80">
                <span className="text-amber-400 text-xs font-bold block mb-1">فرع لطف الله - الفيوم</span>
                <p className="text-stone-300 text-xs leading-relaxed">
                  مطبخ مجهز بأعلى معايير النظافة والطهي الفوري لضمان وصول الوجبة ساخنة ومقرمشة في كل مرة.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Content Column */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 space-y-6 order-1 lg:order-2 text-right"
          >
            
            <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold uppercase tracking-wider text-amber-500">
              <span>منيو غني ومبتكر</span>
              <span aria-hidden="true" className="text-stone-700">·</span>
              <span className="font-english">Crunchies Fast Food</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight tracking-tight [text-wrap:balance]">
              أهلاً بيك في كرانشيز
            </h2>

            <p className="text-base sm:text-lg text-stone-300 leading-relaxed font-normal">
              في كرانشيز، نركز على تقديم وجبات سريعة بنكهة لا تُنسى وجودة لا تقبل المساومة. نقدم تشكيلة مدروسة ومتنوعة ترضي كل الأذواق؛ من وجبات الدجاج المقرمشة وتتبيلات <strong className="text-amber-400 font-semibold">Chicken Madness</strong> الحصرية، وسماش برجر اللحم الغني بجبنة الشيدر، وحتى طواجن المكرونة الساخنة مثل الألفريدو والماك آند تشيز الغارقة في الصوصات اللذيذة.
            </p>

            <p className="text-stone-400 text-sm sm:text-base leading-relaxed">
              كل ساندوتش وكل وجبة بنحضرها طازجة فور طلبك بمكونات مختارة بعناية، عشان تستمتع بالقرمشة الأصلية والنكهة المتوازنة سواء كنت بتفضل تتناول وجبتك في الفرع بلطف الله، أو تطلب دليفري سريع يوصلك لحد باب بيتك في الفيوم.
            </p>

            {/* Core Pillars with Staggered Fade-In */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              {PILLARS.map((pillar, idx) => {
                const IconComponent = pillar.icon;
                return (
                  <motion.div
                    key={pillar.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.1 * idx }}
                    className="p-4 rounded-xl bg-stone-950/60 border border-stone-800/80 hover:border-amber-500/30 transition-colors"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-400 shrink-0">
                        <IconComponent className="w-4 h-4" />
                      </div>
                      <h3 className="font-bold text-white text-base">{pillar.title}</h3>
                    </div>
                    <p className="text-stone-400 text-xs sm:text-sm leading-normal">
                      {pillar.desc}
                    </p>
                  </motion.div>
                );
              })}
            </div>

            {/* Quick Location & Price metadata */}
            <div className="pt-2 text-xs text-stone-400 flex items-center gap-3">
              <span>متوسط السعر: {RESTAURANT_INFO.averagePrice}</span>
              <span aria-hidden="true">·</span>
              <span>الموقع: {RESTAURANT_INFO.addressShort}</span>
            </div>

          </motion.div>

        </div>

      </div>
    </section>
  );
};
