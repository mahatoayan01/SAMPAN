import { Phone, MessageCircle } from 'lucide-react';
import { restaurant } from '../data/restaurant';

export default function FloatingButtons() {
  const phone = restaurant.phone;
  const whatsapp = restaurant.whatsapp;
  const hasPhone = phone && !phone.startsWith('[');
  const hasWhatsapp = whatsapp && !whatsapp.startsWith('[');

  return (
    <div className="fixed bottom-6 right-6 z-30 flex flex-col gap-3">
      {hasWhatsapp && (
        <a href={`https://wa.me/${whatsapp.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer" className="bg-green-600 hover:bg-green-700 text-white p-3.5 rounded-full shadow-lg transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-green-400" aria-label="Chat on WhatsApp">
          <MessageCircle size={24} />
        </a>
      )}
      {hasPhone && (
        <a href={`tel:${phone}`} className="md:hidden bg-primary-500 hover:bg-primary-600 text-dark-900 p-3.5 rounded-full shadow-lg transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary-400" aria-label="Call now">
          <Phone size={24} />
        </a>
      )}
    </div>
  );
}
