import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingCart, User } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { restaurant } from '../data/restaurant';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/menu', label: 'Menu' },
  { to: '/location', label: 'Location' },
  { to: '/contact', label: 'Contact' },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { totalItems } = useCart();
  const location = useLocation();

  return (
    <header className="sticky top-0 z-40 bg-dark-950/95 backdrop-blur-md border-b border-dark-800">
      <div className="container-max flex items-center justify-between px-4 sm:px-6 lg:px-8 h-16">
        <Link to="/" className="flex items-center gap-2 shrink-0" onClick={() => setMobileOpen(false)}>
          <img src={restaurant.images.logo} alt={restaurant.shortName} className="h-8 w-8" />
          <span className="font-heading font-bold text-primary-500 text-lg hidden sm:inline">{restaurant.shortName}</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`text-sm font-medium transition-colors hover:text-primary-500 ${
                location.pathname === link.to ? 'text-primary-500' : 'text-dark-200'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link to="/cart" className="relative p-2 text-dark-200 hover:text-primary-500 transition-colors" aria-label="Cart">
            <ShoppingCart size={22} />
            {totalItems > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-accent-red text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {totalItems > 9 ? '9+' : totalItems}
              </span>
            )}
          </Link>
          <Link to="/owner-login" className="hidden md:flex items-center gap-1 text-xs text-dark-400 hover:text-primary-500 transition-colors" aria-label="Owner login">
            <User size={16} />
            <span>Owner</span>
          </Link>
          <button
            className="md:hidden p-2 text-dark-200 hover:text-primary-500"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <nav className="md:hidden bg-dark-900 border-t border-dark-800 px-4 pb-4 pt-2">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`block py-3 text-base font-medium border-b border-dark-800 transition-colors ${
                location.pathname === link.to ? 'text-primary-500' : 'text-dark-200'
              }`}
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/owner-login"
            className="block py-3 text-sm text-dark-400 hover:text-primary-500"
            onClick={() => setMobileOpen(false)}
          >
            Owner Login
          </Link>
        </nav>
      )}
    </header>
  );
}
