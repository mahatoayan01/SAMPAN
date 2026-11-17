import { useState } from 'react';
import { Phone, MessageCircle, Mail, Send, CalendarDays, Instagram, Facebook } from 'lucide-react';
import { restaurant } from '../data/restaurant';
import { generateBookingId, saveToStorage, getFromStorage } from '../utils';

function BookingForm() {
  const [form, setForm] = useState({ name: '', phone: '', date: '', time: '', guests: '2', notes: '' });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Name is required';
    if (!form.phone.trim() || form.phone.length < 10) errs.phone = 'Valid phone number required';
    if (!form.date) errs.date = 'Date is required';
    if (!form.time) errs.time = 'Time is required';
    if (!form.guests || Number(form.guests) < 1) errs.guests = 'At least 1 guest';
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }

    const booking = {
      id: generateBookingId(),
      ...form,
      guests: Number(form.guests),
      status: 'Pending',
      createdAt: new Date().toISOString(),
    };

    const existing = getFromStorage('sampan-bookings', []);
    saveToStorage('sampan-bookings', [booking, ...existing]);
    setSubmitted(booking);
  };

  const getWhatsAppLink = () => {
    if (!submitted) return '#';
    const wa = restaurant.whatsapp;
    if (!wa || wa.startsWith('[')) return null;
    const num = wa.replace(/[^0-9]/g, '');
    const msg = encodeURIComponent(
      `Hi! I'd like to book a table at ${restaurant.shortName}.\n\nName: ${submitted.name}\nDate: ${submitted.date}\nTime: ${submitted.time}\nGuests: ${submitted.guests}\nNotes: ${submitted.notes || 'None'}\n\nBooking ID: ${submitted.id}`
    );
    return `https://wa.me/${num}?text=${msg}`;
  };

  if (submitted) {
    const waLink = getWhatsAppLink();
    return (
      <div className="bg-dark-900 rounded-xl p-6 text-center">
        <div className="text-4xl mb-3">✅</div>
        <h3 className="text-white font-bold text-xl mb-2">Table Booked!</h3>
        <p className="text-dark-300 mb-1">Booking ID: <span className="text-primary-500 font-mono">{submitted.id}</span></p>
        <p className="text-dark-400 text-sm mb-4">{submitted.date} at {submitted.time} for {submitted.guests} guests</p>
        {waLink && (
          <a href={waLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-5 py-2.5 rounded-lg transition-colors">
            <MessageCircle size={18} /> Confirm on WhatsApp
          </a>
        )}
        <button onClick={() => { setSubmitted(false); setForm({ name: '', phone: '', date: '', time: '', guests: '2', notes: '' }); }} className="block mx-auto mt-4 text-primary-500 hover:underline text-sm">
          Book another table
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-dark-900 rounded-xl p-6 space-y-4">
      <h3 className="text-white font-semibold text-lg flex items-center gap-2 mb-2">
        <CalendarDays size={20} className="text-primary-500" /> Book a Table
      </h3>
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <input type="text" placeholder="Your Name *" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full bg-dark-800 text-white px-4 py-2.5 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 placeholder:text-dark-500" />
          {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
        </div>
        <div>
          <input type="tel" placeholder="Phone Number *" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="w-full bg-dark-800 text-white px-4 py-2.5 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 placeholder:text-dark-500" />
          {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
        </div>
        <div>
          <input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} className="w-full bg-dark-800 text-white px-4 py-2.5 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
          {errors.date && <p className="text-red-400 text-xs mt-1">{errors.date}</p>}
        </div>
        <div>
          <input type="time" value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })} className="w-full bg-dark-800 text-white px-4 py-2.5 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
          {errors.time && <p className="text-red-400 text-xs mt-1">{errors.time}</p>}
        </div>
        <div>
          <input type="number" min="1" max="20" placeholder="Guests *" value={form.guests} onChange={(e) => setForm({ ...form, guests: e.target.value })} className="w-full bg-dark-800 text-white px-4 py-2.5 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 placeholder:text-dark-500" />
          {errors.guests && <p className="text-red-400 text-xs mt-1">{errors.guests}</p>}
        </div>
      </div>
      <textarea placeholder="Special requests (optional)" value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} rows={2} className="w-full bg-dark-800 text-white px-4 py-2.5 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 placeholder:text-dark-500 resize-none" />
      <button type="submit" className="btn-primary w-full flex items-center justify-center gap-2">
        <CalendarDays size={18} /> Book Table
      </button>
    </form>
  );
}

function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.message.trim()) return;
    setSent(true);
  };

  if (sent) {
    return (
      <div className="bg-dark-900 rounded-xl p-6 text-center">
        <div className="text-4xl mb-3">📨</div>
        <h3 className="text-white font-bold text-xl mb-2">Message Sent!</h3>
        <p className="text-dark-400 text-sm">This is a demo — no message was actually sent. In production, connect this form to an email service.</p>
        <button onClick={() => { setSent(false); setForm({ name: '', email: '', message: '' }); }} className="text-primary-500 hover:underline text-sm mt-4">
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-dark-900 rounded-xl p-6 space-y-4">
      <h3 className="text-white font-semibold text-lg flex items-center gap-2 mb-2">
        <Mail size={20} className="text-primary-500" /> Send us a Message
      </h3>
      <input type="text" placeholder="Your Name *" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full bg-dark-800 text-white px-4 py-2.5 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 placeholder:text-dark-500" required />
      <input type="email" placeholder="Email (optional)" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full bg-dark-800 text-white px-4 py-2.5 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 placeholder:text-dark-500" />
      <textarea placeholder="Your message *" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} rows={4} className="w-full bg-dark-800 text-white px-4 py-2.5 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 placeholder:text-dark-500 resize-none" required />
      <button type="submit" className="btn-primary w-full flex items-center justify-center gap-2">
        <Send size={18} /> Send Message
      </button>
      <p className="text-dark-600 text-xs text-center">Demo only — messages are not delivered</p>
    </form>
  );
}

export default function Contact() {
  const phone = restaurant.phone;
  const whatsapp = restaurant.whatsapp;
  const email = restaurant.email;
  const social = restaurant.social;
  const hasPhone = phone && !phone.startsWith('[');
  const hasWhatsapp = whatsapp && !whatsapp.startsWith('[');
  const hasEmail = email && !email.startsWith('[');

  return (
    <div className="min-h-screen bg-dark-950">
      <div className="bg-dark-900 py-10 px-4">
        <div className="container-max text-center">
          <h1 className="font-heading text-4xl font-bold text-white mb-2">Contact Us</h1>
          <p className="text-dark-400">We'd love to hear from you</p>
        </div>
      </div>

      <div className="container-max section-padding">
        {/* Quick Contact Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          {hasPhone && (
            <a href={`tel:${phone}`} className="bg-dark-900 rounded-xl p-6 flex items-center gap-4 hover:ring-2 hover:ring-primary-500/50 transition-all group">
              <div className="bg-primary-500/10 p-3 rounded-full"><Phone size={24} className="text-primary-500" /></div>
              <div>
                <p className="text-dark-400 text-xs">Call Us</p>
                <p className="text-white font-semibold group-hover:text-primary-500 transition-colors">{phone}</p>
              </div>
            </a>
          )}
          {hasWhatsapp && (
            <a href={`https://wa.me/${whatsapp.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer" className="bg-dark-900 rounded-xl p-6 flex items-center gap-4 hover:ring-2 hover:ring-green-500/50 transition-all group">
              <div className="bg-green-600/10 p-3 rounded-full"><MessageCircle size={24} className="text-green-500" /></div>
              <div>
                <p className="text-dark-400 text-xs">WhatsApp</p>
                <p className="text-white font-semibold group-hover:text-green-500 transition-colors">{whatsapp}</p>
              </div>
            </a>
          )}
          {hasEmail ? (
            <a href={`mailto:${email}`} className="bg-dark-900 rounded-xl p-6 flex items-center gap-4 hover:ring-2 hover:ring-primary-500/50 transition-all group">
              <div className="bg-primary-500/10 p-3 rounded-full"><Mail size={24} className="text-primary-500" /></div>
              <div>
                <p className="text-dark-400 text-xs">Email</p>
                <p className="text-white font-semibold group-hover:text-primary-500 transition-colors">{email}</p>
              </div>
            </a>
          ) : (
            <div className="bg-dark-900 rounded-xl p-6 flex items-center gap-4">
              <div className="bg-dark-800 p-3 rounded-full"><Mail size={24} className="text-dark-500" /></div>
              <div>
                <p className="text-dark-400 text-xs">Email</p>
                <p className="text-dark-500 text-sm">[ADD EMAIL ADDRESS]</p>
              </div>
            </div>
          )}
        </div>

        {/* Forms */}
        <div className="grid lg:grid-cols-2 gap-8">
          <BookingForm />
          <ContactForm />
        </div>

        {/* Social Links */}
        <div className="mt-10 text-center">
          <h3 className="text-white font-semibold text-lg mb-4">Follow Us</h3>
          <div className="flex justify-center gap-4">
            {social.instagram && !social.instagram.startsWith('[') && (
              <a href={`https://instagram.com/${social.instagram}`} target="_blank" rel="noopener noreferrer" className="bg-dark-900 p-4 rounded-xl hover:bg-dark-800 transition-colors" aria-label="Instagram">
                <Instagram size={24} className="text-pink-500" />
              </a>
            )}
            {social.facebook && !social.facebook.startsWith('[') && (
              <a href={social.facebook} target="_blank" rel="noopener noreferrer" className="bg-dark-900 p-4 rounded-xl hover:bg-dark-800 transition-colors" aria-label="Facebook">
                <Facebook size={24} className="text-blue-500" />
              </a>
            )}
            {social.zomato && (
              <a href={social.zomato} target="_blank" rel="noopener noreferrer" className="bg-dark-900 p-4 rounded-xl hover:bg-dark-800 transition-colors text-dark-300 hover:text-red-500 text-sm font-bold" aria-label="Zomato">
                Z
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
