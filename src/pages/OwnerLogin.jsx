import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, AlertTriangle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { restaurant } from '../data/restaurant';

export default function OwnerLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { isLoggedIn, login } = useAuth();
  const navigate = useNavigate();

  if (isLoggedIn) {
    navigate('/owner-dashboard', { replace: true });
    return null;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (login(email, password)) {
      navigate('/owner-dashboard', { replace: true });
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="min-h-screen bg-dark-950 flex items-center justify-center px-4">
      <div className="bg-dark-900 rounded-2xl p-8 max-w-sm w-full">
        <div className="text-center mb-6">
          <div className="bg-primary-500/10 p-3 rounded-full inline-block mb-3">
            <Lock size={28} className="text-primary-500" />
          </div>
          <h1 className="font-heading text-2xl font-bold text-white">Owner Login</h1>
        </div>

        {/* Demo notice */}
        <div className="bg-yellow-900/30 border border-yellow-700/50 rounded-xl p-3 mb-6 flex items-start gap-2">
          <AlertTriangle size={16} className="text-yellow-500 shrink-0 mt-0.5" />
          <div className="text-yellow-300 text-xs">
            <p className="font-semibold mb-1">Demo Login Only</p>
            <p>This is not a secure login. Use these demo credentials:</p>
            <p className="mt-1 font-mono bg-dark-900/50 px-2 py-1 rounded">
              Email: {restaurant.ownerCredentials.email}<br />
              Password: {restaurant.ownerCredentials.password}
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => { setEmail(e.target.value); setError(''); }}
            className="w-full bg-dark-800 text-white px-4 py-3 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 placeholder:text-dark-500"
            autoComplete="email"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => { setPassword(e.target.value); setError(''); }}
            className="w-full bg-dark-800 text-white px-4 py-3 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 placeholder:text-dark-500"
            autoComplete="current-password"
          />
          {error && <p className="text-red-400 text-sm text-center">{error}</p>}
          <button type="submit" className="btn-primary w-full">Log In</button>
        </form>
      </div>
    </div>
  );
}
