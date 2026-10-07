import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Clock, Navigation, CheckCircle2, Bike, ExternalLink } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantInfo';

export const LocationSection: React.FC = () => {
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    'كرانشيز لطف الله بجوار عصائر العملاق الفيوم'
  )}`;

  return (
    <section id="location" className="py-16 lg:py-24 bg-stone-950 text-stone-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-12 space-y-2"
        >
          <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold uppercase tracking-wider text-amber-500">
            <span>الفرع ومناطق التوصيل</span>
            <span aria-hidden="true" className="text-stone-700">·</span>
            <span className="font-english">Location & Delivery</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white">
            زورنا في لطف الله أو اطلب دليفري
          </h2>
          <p className="text-stone-400 text-sm">
            موقعنا في أرقى شوارع الفيوم الحيوية، وسيارات وموتوسيكلات الدليفري جاهزة لخدمتكم بأسرع وقت.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Contact & Hours Info Column */}
          <motion.div 
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 space-y-6 text-right"
          >
            
            {/* Location Details Box */}
            <div className="p-6 rounded-2xl bg-stone-900/80 border border-stone-800 space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0 mt-1">
                  <MapPin className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <span className="text-xs text-amber-500 font-bold block">العنوان الدقيق</span>
                  <h3 className="text-lg font-bold text-white">{RESTAURANT_INFO.addressShort}</h3>
                  <p className="text-xs sm:text-sm text-stone-400 leading-relaxed">
                    شارع لطف الله، بجوار عصائر العملاق مباشرة، مدينة الفيوم، محافظة الفيوم، مصر.
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 pt-2">
                <a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-stone-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>الاتجاهات على خرائط Google</span>
                  <ExternalLink className="w-3 h-3 opacity-70" />
                </a>

                <a
                  href={`tel:${RESTAURANT_INFO.phone}`}
                  className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-stone-200 bg-stone-800 hover:bg-stone-700 rounded-lg transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-amber-400" />
                  <span>اتصال: {RESTAURANT_INFO.phoneDisplay}</span>
                </a>
              </div>
            </div>

            {/* Hours & Ordering Info */}
            <div className="p-6 rounded-2xl bg-stone-900/80 border border-stone-800 space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0 mt-1">
                  <Clock className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <span className="text-xs text-amber-500 font-bold block">ساعات العمل والاستقبال</span>
                  <h3 className="text-base font-bold text-white">{RESTAURANT_INFO.openingHours}</h3>
                  <p className="text-xs text-stone-400">
                    مفتوح طوال أيام الأسبوع لطلبات الصالة، التيك أواي، وخدمة التوصيل المنزلي السريع.
                  </p>
                </div>
              </div>
            </div>

            {/* Delivery Coverage Areas in Fayoum */}
            <div className="p-6 rounded-2xl bg-stone-900/80 border border-stone-800 space-y-3">
              <div className="flex items-center gap-2 text-white font-bold text-sm">
                <Bike className="w-4 h-4 text-amber-400" />
                <span>المناطق المشمولة بخدمة التوصيل السريع بالفيوم:</span>
              </div>
              <div className="grid grid-cols-2 gap-2 pt-1 text-xs text-stone-300">
                {RESTAURANT_INFO.deliveryZones.map((zone) => (
                  <div key={zone} className="flex items-center gap-1.5 py-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>{zone}</span>
                  </div>
                ))}
              </div>
            </div>

          </motion.div>

          {/* Map Visualizer Column */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7"
          >
            <div className="relative rounded-2xl overflow-hidden border border-stone-800 bg-stone-900 shadow-2xl h-[420px] sm:h-[480px]">
              
              {/* Google Maps iFrame */}
              <iframe
                title="موقع كرانشيز الفيوم لطف الله"
                src="https://maps.google.com/maps?q=29.3130,30.8415&hl=ar&z=15&output=embed"
                className="w-full h-full border-0 filter contrast-125 saturate-75 opacity-90"
                loading="lazy"
                referrerPolicy="no-referrer"
              />

              {/* Overlaid Location Badge Card */}
              <div className="absolute bottom-4 right-4 left-4 sm:left-auto sm:max-w-sm p-4 rounded-xl bg-stone-950/95 backdrop-blur-md border border-stone-800 shadow-xl text-right">
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                  <span className="text-xs font-bold text-white">كرانشيز مفتوح الآن</span>
                </div>
                <h4 className="text-sm font-bold text-amber-400">شارع لطف الله، بجوار عصائر العملاق</h4>
                <p className="text-[11px] text-stone-400 mt-1">
                  أشهر نقطة حيوية للشباب والعائلات في الفيوم. يتوفر مكان مريح لتناول الطعام أو الاستلام السريع.
                </p>
                <div className="mt-3 flex gap-2">
                  <a
                    href={googleMapsUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 py-1.5 text-center text-xs font-bold text-stone-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors"
                  >
                    افتح في Google Maps
                  </a>
                </div>
              </div>

            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
};
