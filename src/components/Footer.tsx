import React from 'react';
import { Phone, MapPin, Clock, MessageCircle, Heart } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantInfo';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-stone-950 border-t border-stone-800 text-stone-400 py-12 text-right">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-stone-900">
          
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-amber-500">كرانشيز</span>
              <span className="font-english font-bold text-stone-300 text-lg">Crunchies</span>
            </div>
            <p className="text-xs sm:text-sm text-stone-400 leading-relaxed max-w-sm">
              مطعم الوجبات السريعة الأول في الفيوم المتخصص في الدجاج المقرمش بتتبيلة Chicken Madness الحصرية، برجر السماش الطازج، والمكرونات الغنية بالجبنة.
            </p>
            <div className="text-xs text-amber-400 font-semibold">
              {RESTAURANT_INFO.slogan} — {RESTAURANT_INFO.tagline}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white">روابط سريعة</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#hero" className="hover:text-amber-400 transition-colors">الرئيسية</a>
              </li>
              <li>
                <a href="#menu" className="hover:text-amber-400 transition-colors">قائمة المنيو والأسعار</a>
              </li>
              <li>
                <a href="#about" className="hover:text-amber-400 transition-colors">عن كرانشيز</a>
              </li>
              <li>
                <a href="#reviews" className="hover:text-amber-400 transition-colors">آراء العملاء والتقييمات</a>
              </li>
              <li>
                <a href="#location" className="hover:text-amber-400 transition-colors">موقع الفرع ومناطق التوصيل</a>
              </li>
            </ul>
          </div>

          {/* Direct Contact */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white">بيانات التواصل</h4>
            <div className="space-y-2.5 text-xs">
              <a
                href={`tel:${RESTAURANT_INFO.phone}`}
                className="flex items-center gap-2 text-stone-300 hover:text-amber-400 transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                <span className="font-english dir-ltr">{RESTAURANT_INFO.phoneDisplay}</span>
              </a>

              <a
                href={`https://wa.me/${RESTAURANT_INFO.whatsapp}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-stone-300 hover:text-emerald-400 transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span>طلب سريع عبر الواتساب</span>
              </a>

              <div className="flex items-start gap-2 text-stone-400">
                <MapPin className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                <span>{RESTAURANT_INFO.addressShort}</span>
              </div>

              <div className="flex items-center gap-2 text-stone-400">
                <Clock className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                <span>{RESTAURANT_INFO.openingHours}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Quiet Bottom Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p>© {new Date().getFullYear()} مطعم كرانشيز الفيوم (Crunchies). جميع الحقوق محفوظة.</p>
          <p className="flex items-center gap-1">
            <span>صُنع بكل فخر لخدمة أهالي محافظة الفيوم</span>
            <Heart className="w-3 h-3 text-red-500 fill-red-500 inline" />
          </p>
        </div>

      </div>
    </footer>
  );
};
