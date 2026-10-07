import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantInfo';

interface CustomerReview {
  id: string;
  author: string;
  location: string;
  rating: number;
  date: string;
  comment: string;
  favoriteItem: string;
  helpfulCount: number;
}

const INITIAL_REVIEWS: CustomerReview[] = [
  {
    id: 'rev-1',
    author: 'أحمد سعيد الباسل',
    location: 'لطف الله، الفيوم',
    rating: 4.5,
    date: 'منذ أسبوعين',
    comment: 'الاستربس عندهم ممتاز جداً ومقرمش بجد مش معجن، وصوص كرانشيز السري طعمه مميز. الأوردر وصل سخن في لطف الله خلال نص ساعة تقريباً.',
    favoriteItem: 'باكيت تشيكن مادنس 6 قطع',
    helpfulCount: 18,
  },
  {
    id: 'rev-2',
    author: 'سارة عبد الرحمن',
    location: 'حي الجامعة، الفيوم',
    rating: 4.0,
    date: 'منذ 3 أسابيع',
    comment: 'طاجن مكرونة الألفريدو بالدجاج الكريسبي والجبنة السايحة خطير ويشبع جداً. كمية الجبنة محترمة وسعرها مناسب.',
    favoriteItem: 'طاجن مكرونة كرانشيز ألفريدو',
    helpfulCount: 14,
  },
  {
    id: 'rev-3',
    author: 'محمود الجيار',
    location: 'كيمان فارس، الفيوم',
    rating: 4.0,
    date: 'منذ شهر',
    comment: 'سماش برجر اللحم عندهم لحمته بلدي واضحة وطعم الشيدر الأمريكي مع العيش البريوش ممتاز، تجربة تستاهل وهرجع اطلب تاني.',
    favoriteItem: 'دبل سماش تشيز برجر',
    helpfulCount: 9,
  },
  {
    id: 'rev-4',
    author: 'كريم ممدوح',
    location: 'المسلة، الفيوم',
    rating: 3.5,
    date: 'منذ شهر ونصف',
    comment: 'الأكل طعمه حلو جداً والقرمشة مظبوطة، الدليفري اتأخر 10 دقايق عشان كان وقت ذروة بس الأكل وصل ساخن ومغلف كويس جداً.',
    favoriteItem: 'وجبة كرانشيز فاير بوكس',
    helpfulCount: 7,
  }
];

export const ReviewsSection: React.FC = () => {
  const [reviews, setReviews] = useState<CustomerReview[]>(INITIAL_REVIEWS);
  const [showAddReview, setShowAddReview] = useState(false);
  const [newAuthor, setNewAuthor] = useState('');
  const [newLocation, setNewLocation] = useState(RESTAURANT_INFO.deliveryZones[0]);
  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState('');
  const [newFavorite, setNewFavorite] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAuthor.trim() || !newComment.trim()) return;

    const created: CustomerReview = {
      id: `rev-${Date.now()}`,
      author: newAuthor,
      location: newLocation,
      rating: newRating,
      date: 'الآن',
      comment: newComment,
      favoriteItem: newFavorite || 'وجبة كرانشيز المميزة',
      helpfulCount: 1,
    };

    setReviews([created, ...reviews]);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setShowAddReview(false);
      setNewAuthor('');
      setNewComment('');
      setNewFavorite('');
    }, 1500);
  };

  return (
    <section id="reviews" className="py-16 lg:py-24 bg-stone-900/40 border-t border-stone-800/80 text-stone-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <motion.div 
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5 }}
            className="space-y-2 text-right"
          >
            <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold uppercase tracking-wider text-amber-500">
              <span>تجارب حقيقية من أهل الفيوم</span>
              <span aria-hidden="true" className="text-stone-700">·</span>
              <span className="font-english">Customer Feedback</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white">
              تقييمات وآراء العملاء
            </h2>
            <p className="text-stone-400 text-sm max-w-xl">
              رأي عملائنا في الفيوم هو بوصلتنا الدائمة لتقديم أفضل قرمشة وجودة طعام تليق بكم.
            </p>
          </motion.div>

          {/* Rating Summary Card */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex items-center gap-4 p-4 rounded-2xl bg-stone-950 border border-stone-800 shadow-lg shrink-0"
          >
            <div className="text-right">
              <div className="flex items-center gap-2">
                <span className="text-3xl sm:text-4xl font-black text-amber-400 font-mono tabular-nums">
                  {RESTAURANT_INFO.rating}
                </span>
                <div className="flex text-amber-400">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      className={`w-4 h-4 ${s <= 4 ? 'fill-amber-400' : 'text-stone-600'}`}
                    />
                  ))}
                </div>
              </div>
              <span className="text-xs text-stone-400 block mt-0.5">
                متوسط التقييم بناءً على <strong className="text-white font-mono">{RESTAURANT_INFO.reviewsCount}</strong> مراجعة حقيقية
              </span>
            </div>

            <button
              onClick={() => setShowAddReview(!showAddReview)}
              className="px-4 py-2.5 text-xs font-bold text-stone-950 bg-amber-500 hover:bg-amber-400 rounded-xl transition-colors whitespace-nowrap"
            >
              شاركنا برأيك
            </button>
          </motion.div>
        </div>

        {/* Add Review Drawer / Collapsible Form */}
        <AnimatePresence>
          {showAddReview && (
            <motion.form
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.35 }}
              onSubmit={handleAddReview}
              className="mb-10 p-6 rounded-2xl bg-stone-950 border border-stone-800 space-y-4 max-w-2xl mx-auto text-right overflow-hidden"
            >
              <h3 className="text-lg font-bold text-white">أضف تقييمك لتجربة كرانشيز</h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-stone-300 mb-1">الاسم الكامل:</label>
                  <input
                    type="text"
                    required
                    value={newAuthor}
                    onChange={(e) => setNewAuthor(e.target.value)}
                    placeholder="مثال: يوسف إبراهيم"
                    className="w-full bg-stone-900 border border-stone-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs text-stone-300 mb-1">المنطقة في الفيوم:</label>
                  <select
                    value={newLocation}
                    onChange={(e) => setNewLocation(e.target.value)}
                    className="w-full bg-stone-900 border border-stone-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                  >
                    {RESTAURANT_INFO.deliveryZones.map((z) => (
                      <option key={z} value={z}>{z}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs text-stone-300 mb-1">تقييمك (من 1 إلى 5):</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setNewRating(star)}
                      className="p-1 text-amber-400 focus:outline-none"
                    >
                      <Star
                        className={`w-6 h-6 ${star <= newRating ? 'fill-amber-400' : 'text-stone-700'}`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs text-stone-300 mb-1">أكلتك المفضلة من كرانشيز:</label>
                <input
                  type="text"
                  value={newFavorite}
                  onChange={(e) => setNewFavorite(e.target.value)}
                  placeholder="مثال: وجبة كرانشيز فاير أو سماش برجر"
                  className="w-full bg-stone-900 border border-stone-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs text-stone-300 mb-1">رأيك بالتفصيل:</label>
                <textarea
                  rows={3}
                  required
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="اكتب تجربتك مع الطعم والقرمشة وسرعة التوصيل..."
                  className="w-full bg-stone-900 border border-stone-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500 resize-none"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddReview(false)}
                  className="px-4 py-2 text-xs font-semibold text-stone-400 hover:text-white"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold text-stone-950 bg-amber-500 hover:bg-amber-400 rounded-lg transition-colors"
                >
                  {submitted ? 'تم النشر بنجاح!' : 'نشر التقييم'}
                </button>
              </div>
            </motion.form>
          )}
        </AnimatePresence>

        {/* Reviews Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reviews.map((rev, idx) => (
            <motion.div
              key={rev.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.45, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="p-6 rounded-2xl bg-stone-950/80 border border-stone-800 flex flex-col justify-between text-right space-y-4 hover:border-amber-500/30 transition-colors"
            >
              <div className="space-y-3">
                {/* Author info header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-stone-800 flex items-center justify-center text-stone-400 font-bold text-sm">
                      {rev.author[0]}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">{rev.author}</h4>
                      <span className="text-xs text-stone-400">{rev.location}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 text-amber-400">
                    <Star className="w-4 h-4 fill-amber-400" />
                    <span className="font-mono tabular-nums text-sm font-bold">{rev.rating}</span>
                  </div>
                </div>

                {/* Review Body */}
                <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                  "{rev.comment}"
                </p>
              </div>

              {/* Review Footer with unboxed metadata */}
              <div className="pt-3 border-t border-stone-800/80 flex items-center justify-between text-xs text-stone-400">
                <span className="text-stone-400">
                  الوجبة المفضلة: <span className="text-amber-400/90 font-medium">{rev.favoriteItem}</span>
                </span>
                <span className="text-stone-500 font-mono text-[11px]">{rev.date}</span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
