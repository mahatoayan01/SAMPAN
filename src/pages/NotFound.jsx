import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-dark-950 flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="font-heading text-7xl font-bold text-primary-500 mb-4">404</h1>
        <p className="text-white text-xl font-semibold mb-2">Page Not Found</p>
        <p className="text-dark-400 mb-8">The page you're looking for doesn't exist or has been moved.</p>
        <Link to="/" className="btn-primary inline-flex items-center gap-2">
          <Home size={18} /> Back to Home
        </Link>
      </div>
    </div>
  );
}
