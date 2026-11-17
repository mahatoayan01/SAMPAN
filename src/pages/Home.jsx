import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ChevronUp, Star, ExternalLink, Phone, MessageCircle, CalendarDays, X } from 'lucide-react';
import { restaurant, menuCategories, reviews, offers, faq, instagramPosts } from '../data/restaurant';
import { useOpenStatus } from '../hooks/useOpenStatus';
import LazyImage from '../components/LazyImage';
import StarRating from '../components/StarRating';

function HeroSection() {
  const { isOpen } = useOpenStatus();
  const phone = restaurant.phone;
  const whatsapp = restaurant.whatsapp;
  const hasPhone = phone && !phone.startsWith('[');
  const hasWhatsapp = whatsapp && !whatsapp.startsWith('[');

  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <img src={restaurant.images.hero.src} alt={restaurant.images.hero.alt} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-950/70 to-dark-950/40" />
      </div>
      <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
        <span className={`inline-block mb-4 text-xs font-semibold px-3 py-1 rounded-full ${isOpen ? 'bg-accent-green/20 text-green-400 border border-green-800' : 'bg-accent-red/20 text-red-400 border border-red-800'}`}>
          {isOpen ? '● Open Now' : '● Currently Closed'} — 12 PM to Midnight
        </span>
        <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4">
          {restaurant.name}
        </h1>
        <p className="text-dark-200 text-lg sm:text-xl mb-8 max-w-xl mx-auto">
          {restaurant.tagline}
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link to="/menu" className="btn-primary text-base">Order Now</Link>
          <Link to="/contact" className="btn-outline text-base flex items-center gap-2"><CalendarDays size={18} /> Book a Table</Link>
          {hasPhone && (
            <a href={`tel:${phone}`} className="btn-outline text-base flex items-center gap-2"><Phone size={18} /> Call</a>
          )}
          {hasWhatsapp && (
            <a href={`https://wa.me/${whatsapp.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer" className="border-2 border-green-600 text-green-400 hover:bg-green-600 hover:text-white font-semibold px-6 py-3 rounded-lg transition-colors text-base flex items-center gap-2">
              <MessageCircle size={18} /> WhatsApp
            </a>
          )}
        </div>
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <section className="section-padding bg-dark-950">
      <div className="container-max grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h2 className="font-heading text-3xl font-bold text-white mb-4">About {restaurant.shortName}</h2>
          <p className="text-dark-300 leading-relaxed mb-4">{restaurant.description}</p>
          <div className="flex flex-wrap gap-2">
            {restaurant.cuisine.map((c) => (
              <span key={c} className="bg-dark-800 text-primary-500 text-xs font-medium px-3 py-1 rounded-full">{c}</span>
            ))}
          </div>
          <div className="flex items-center gap-4 mt-6">
            <div className="flex items-center gap-1">
              <Star size={20} className="text-primary-500 fill-primary-500" />
              <span className="text-white font-bold text-lg">{restaurant.rating}</span>
            </div>
            <span className="text-dark-400 text-sm">{restaurant.totalReviews}+ reviews</span>
            <span className="text-dark-400 text-sm">•</span>
            <span className="text-dark-400 text-sm">{restaurant.priceRange}</span>
          </div>
        </div>
        <LazyImage src={restaurant.images.interior.src} alt={restaurant.images.interior.alt} imageSource={restaurant.images.interior.imageSource} className="w-full h-72 sm:h-80 object-cover rounded-xl" />
      </div>
    </section>
  );
}

function PopularDishes() {
  const popular = menuCategories.flatMap((cat) => cat.items.filter((item) => item.popular));
  if (popular.length === 0) return null;

  return (
    <section className="section-padding bg-dark-900">
      <div className="container-max">
        <h2 className="font-heading text-3xl font-bold text-white text-center mb-2">Popular Dishes</h2>
        <p className="text-dark-400 text-center mb-10">Our customers' all-time favourites</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {popular.slice(0, 8).map((item) => (
            <Link to="/menu" key={item.id} className="group bg-dark-800 rounded-xl overflow-hidden hover:ring-2 hover:ring-primary-500/50 transition-all">
              <LazyImage src={item.image} alt={item.name} imageSource={item.imageSource} className="w-full h-36 sm:h-44 object-cover group-hover:scale-105 transition-transform duration-300" />
              <div className="p-3">
                <h3 className="text-white text-sm font-semibold truncate">{item.name}</h3>
                <p className="text-primary-500 font-bold text-sm mt-1">₹{item.price}</p>
              </div>
            </Link>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link to="/menu" className="btn-primary">View Full Menu</Link>
        </div>
      </div>
    </section>
  );
}

function OffersSection() {
  return (
    <section className="section-padding bg-dark-950">
      <div className="container-max">
        <h2 className="font-heading text-3xl font-bold text-white text-center mb-2">Special Offers</h2>
        <p className="text-dark-400 text-center mb-10">Great deals for you</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {offers.map((offer) => (
            <div key={offer.id} className="bg-gradient-to-br from-dark-800 to-dark-900 border border-dark-700 rounded-xl p-6 relative overflow-hidden">
              {offer.sample && <span className="absolute top-3 right-3 text-[10px] text-dark-500 bg-dark-800 px-2 py-0.5 rounded">Sample offer</span>}
              <span className="bg-primary-500 text-dark-900 text-xs font-bold px-2 py-1 rounded mb-3 inline-block">{offer.badge}</span>
              <h3 className="text-white font-bold text-lg mb-2">{offer.title}</h3>
              <p className="text-dark-300 text-sm">{offer.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function GallerySection() {
  const [lightbox, setLightbox] = useState(null);

  return (
    <section className="section-padding bg-dark-900">
      <div className="container-max">
        <h2 className="font-heading text-3xl font-bold text-white text-center mb-10">Gallery</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {restaurant.gallery.map((img, i) => (
            <button key={i} onClick={() => setLightbox(i)} className="relative overflow-hidden rounded-lg group focus:outline-none focus:ring-2 focus:ring-primary-500">
              <LazyImage src={img.src} alt={img.alt} imageSource={img.imageSource} className="w-full h-40 sm:h-48 object-cover group-hover:scale-105 transition-transform duration-300" />
            </button>
          ))}
        </div>
      </div>

      {lightbox !== null && (
        <div className="lightbox-overlay" onClick={() => setLightbox(null)}>
          <button className="absolute top-4 right-4 text-white hover:text-primary-500 z-50" onClick={() => setLightbox(null)} aria-label="Close">
            <X size={32} />
          </button>
          <img
            src={restaurant.gallery[lightbox].src}
            alt={restaurant.gallery[lightbox].alt}
            className="max-h-[85vh] max-w-[90vw] object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  );
}

function HoursSection() {
  const { isOpen, todayHours } = useOpenStatus();

  return (
    <section className="section-padding bg-dark-950">
      <div className="container-max max-w-lg mx-auto text-center">
        <h2 className="font-heading text-3xl font-bold text-white mb-6">Opening Hours</h2>
        <span className={`inline-block mb-6 text-sm font-semibold px-4 py-2 rounded-full ${isOpen ? 'bg-accent-green/20 text-green-400' : 'bg-accent-red/20 text-red-400'}`}>
          {isOpen ? '● Open Now' : '● Closed'} — Today: {todayHours}
        </span>
        <div className="bg-dark-900 rounded-xl p-6">
          {restaurant.hours.map((h) => (
            <div key={h.day} className="flex justify-between py-2 border-b border-dark-800 last:border-0">
              <span className="text-dark-300">{h.day}</span>
              <span className="text-white font-medium">{h.open} – {h.close === '00:00' ? 'Midnight' : h.close}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ReviewsSection() {
  return (
    <section className="section-padding bg-dark-900">
      <div className="container-max">
        <div className="text-center mb-10">
          <h2 className="font-heading text-3xl font-bold text-white mb-2">What Our Customers Say</h2>
          <div className="flex items-center justify-center gap-2 mt-3">
            <Star size={24} className="text-primary-500 fill-primary-500" />
            <span className="text-white font-bold text-2xl">{restaurant.rating}</span>
            <span className="text-dark-400">/ 5 · {restaurant.totalReviews}+ reviews</span>
          </div>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review) => (
            <div key={review.id} className="bg-dark-800 rounded-xl p-6">
              {review.source !== 'real' && review.source !== 'real-summary' && (
                <span className="text-[10px] text-dark-500 mb-2 block">Sample review</span>
              )}
              <StarRating rating={review.rating} />
              <p className="text-dark-200 text-sm mt-3 mb-4 leading-relaxed">"{review.text}"</p>
              <div className="flex justify-between items-center">
                <span className="text-white font-semibold text-sm">{review.name}</span>
                <span className="text-dark-500 text-xs">{review.date}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-8">
          <a href={restaurant.mapLink} target="_blank" rel="noopener noreferrer" className="btn-outline inline-flex items-center gap-2">
            See all reviews on Google <ExternalLink size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}

function InstagramSection() {
  const handle = restaurant.social.instagram;
  const hasHandle = handle && !handle.startsWith('[');

  return (
    <section className="section-padding bg-dark-950">
      <div className="container-max">
        <h2 className="font-heading text-3xl font-bold text-white text-center mb-2">Follow Us on Instagram</h2>
        <p className="text-dark-400 text-center mb-10">{hasHandle ? `@${handle}` : 'Follow us for the latest updates'}</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {instagramPosts.map((post) => (
            <a
              key={post.id}
              href={hasHandle ? `https://instagram.com/${handle}` : '#'}
              target={hasHandle ? '_blank' : undefined}
              rel="noopener noreferrer"
              className="relative overflow-hidden rounded-lg group"
            >
              <LazyImage src={post.image} alt={post.alt} imageSource="ai-sample" showBadge={post.sample} className="w-full h-40 sm:h-52 object-cover group-hover:scale-105 transition-transform duration-300" />
              {post.sample && (
                <div className="absolute inset-0 bg-dark-950/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-white text-sm font-medium">View on Instagram</span>
                </div>
              )}
            </a>
          ))}
        </div>
        {hasHandle && (
          <div className="text-center mt-8">
            <a href={`https://instagram.com/${handle}`} target="_blank" rel="noopener noreferrer" className="btn-primary inline-flex items-center gap-2">
              Follow us on Instagram <ExternalLink size={16} />
            </a>
          </div>
        )}
      </div>
    </section>
  );
}

function FAQSection() {
  const [openIdx, setOpenIdx] = useState(null);

  return (
    <section className="section-padding bg-dark-900">
      <div className="container-max max-w-2xl mx-auto">
        <h2 className="font-heading text-3xl font-bold text-white text-center mb-10">Frequently Asked Questions</h2>
        <div className="space-y-3">
          {faq.map((item, i) => (
            <div key={i} className="bg-dark-800 rounded-xl overflow-hidden">
              <button
                className="w-full flex items-center justify-between p-5 text-left focus:outline-none focus:ring-2 focus:ring-primary-500 rounded-xl"
                onClick={() => setOpenIdx(openIdx === i ? null : i)}
                aria-expanded={openIdx === i}
              >
                <span className="text-white font-medium pr-4">{item.question}</span>
                {openIdx === i ? <ChevronUp size={20} className="text-primary-500 shrink-0" /> : <ChevronDown size={20} className="text-dark-400 shrink-0" />}
              </button>
              {openIdx === i && (
                <div className="px-5 pb-5 text-dark-300 text-sm leading-relaxed">
                  {item.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <PopularDishes />
      <OffersSection />
      <GallerySection />
      <HoursSection />
      <ReviewsSection />
      <InstagramSection />
      <FAQSection />
    </>
  );
}
