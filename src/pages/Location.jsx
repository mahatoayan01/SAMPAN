import { MapPin, Navigation, Clock, Car } from 'lucide-react';
import { restaurant } from '../data/restaurant';
import { useOpenStatus } from '../hooks/useOpenStatus';

export default function Location() {
  const { isOpen, todayHours } = useOpenStatus();

  return (
    <div className="min-h-screen bg-dark-950">
      <div className="bg-dark-900 py-10 px-4">
        <div className="container-max text-center">
          <h1 className="font-heading text-4xl font-bold text-white mb-2">Find Us</h1>
          <p className="text-dark-400">Visit us at Senapati Bapat Road, Pune</p>
        </div>
      </div>

      <div className="container-max section-padding">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Map */}
          <div className="rounded-xl overflow-hidden h-80 lg:h-full min-h-[320px]">
            <iframe
              title="Sampan Restaurant Location"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              src={`https://maps.google.com/maps?q=${encodeURIComponent(restaurant.name + ' ' + restaurant.address.full)}&t=&z=16&ie=UTF8&iwloc=&output=embed`}
              allowFullScreen
            />
          </div>

          {/* Info */}
          <div className="space-y-6">
            {/* Address */}
            <div className="bg-dark-900 rounded-xl p-6">
              <h2 className="text-white font-semibold text-lg flex items-center gap-2 mb-4">
                <MapPin size={20} className="text-primary-500" /> Address
              </h2>
              <p className="text-dark-300 leading-relaxed">{restaurant.address.full}</p>
              {restaurant.address.landmark && (
                <p className="text-dark-400 text-sm mt-2">📍 Landmark: {restaurant.address.landmark}</p>
              )}
              <a
                href={restaurant.mapLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary mt-4 inline-flex items-center gap-2 text-sm"
              >
                <Navigation size={16} /> Get Directions
              </a>
            </div>

            {/* Hours */}
            <div className="bg-dark-900 rounded-xl p-6">
              <h2 className="text-white font-semibold text-lg flex items-center gap-2 mb-4">
                <Clock size={20} className="text-primary-500" /> Opening Hours
              </h2>
              <span className={`inline-block mb-4 text-xs font-semibold px-3 py-1 rounded-full ${isOpen ? 'bg-accent-green/20 text-green-400' : 'bg-accent-red/20 text-red-400'}`}>
                {isOpen ? '● Open Now' : '● Closed'}
              </span>
              {restaurant.hours.map((h) => (
                <div key={h.day} className="flex justify-between py-2 border-b border-dark-800 last:border-0">
                  <span className="text-dark-300 text-sm">{h.day}</span>
                  <span className="text-white text-sm font-medium">{h.open} – {h.close === '00:00' ? 'Midnight' : h.close}</span>
                </div>
              ))}
            </div>

            {/* Parking */}
            <div className="bg-dark-900 rounded-xl p-6">
              <h2 className="text-white font-semibold text-lg flex items-center gap-2 mb-3">
                <Car size={20} className="text-primary-500" /> Getting Here
              </h2>
              <ul className="text-dark-300 text-sm space-y-2">
                <li>• Street parking available near the restaurant</li>
                <li>• Located near Chaturshringi Temple & Kakade Mall on SB Road</li>
                <li>• Easily accessible from Range Hill and University Road</li>
                <li>• Can get busy during peak evening hours — come early for seating</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
