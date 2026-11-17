import { MapPin, Phone, Clock, Instagram, Facebook } from 'lucide-react';
import { restaurant } from '../data/restaurant';
import { useOpenStatus } from '../hooks/useOpenStatus';

export default function Footer() {
  const { isOpen } = useOpenStatus();
  const social = restaurant.social;

  return (
    <footer className="bg-dark-900 border-t border-dark-800">
      <div className="container-max section-padding pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="font-heading font-bold text-primary-500 text-xl mb-3">{restaurant.shortName}</h3>
            <p className="text-dark-300 text-sm leading-relaxed">{restaurant.tagline}</p>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-3 flex items-center gap-2"><MapPin size={16} className="text-primary-500" /> Address</h4>
            <p className="text-dark-300 text-sm leading-relaxed">{restaurant.address.full}</p>
            <a href={restaurant.mapLink} target="_blank" rel="noopener noreferrer" className="text-primary-500 text-sm hover:underline mt-2 inline-block">
              Get Directions →
            </a>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-3 flex items-center gap-2"><Clock size={16} className="text-primary-500" /> Hours</h4>
            <p className="text-dark-300 text-sm">Open Daily: 12:00 PM – Midnight</p>
            <span className={`inline-block mt-2 text-xs font-semibold px-2 py-1 rounded ${isOpen ? 'bg-accent-green/20 text-green-400' : 'bg-accent-red/20 text-red-400'}`}>
              {isOpen ? '● Open Now' : '● Closed'}
            </span>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-3 flex items-center gap-2"><Phone size={16} className="text-primary-500" /> Contact</h4>
            <a href={`tel:${restaurant.phone}`} className="text-dark-300 text-sm hover:text-primary-500 block">{restaurant.phone}</a>
            {restaurant.phoneAlt && <a href={`tel:${restaurant.phoneAlt}`} className="text-dark-300 text-sm hover:text-primary-500 block">{restaurant.phoneAlt}</a>}
            <div className="flex gap-3 mt-4">
              {social.instagram && !social.instagram.startsWith('[') && (
                <a href={`https://instagram.com/${social.instagram}`} target="_blank" rel="noopener noreferrer" className="text-dark-400 hover:text-primary-500" aria-label="Instagram"><Instagram size={20} /></a>
              )}
              {social.facebook && !social.facebook.startsWith('[') && (
                <a href={social.facebook} target="_blank" rel="noopener noreferrer" className="text-dark-400 hover:text-primary-500" aria-label="Facebook"><Facebook size={20} /></a>
              )}
            </div>
          </div>
        </div>
        <div className="mt-10 pt-6 border-t border-dark-800 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-dark-500 text-xs">© {new Date().getFullYear()} {restaurant.name}. All rights reserved.</p>
          <p className="text-dark-600 text-xs bg-dark-800 px-3 py-1 rounded">🚧 Demo Website — Not for real transactions</p>
        </div>
      </div>
    </footer>
  );
}
