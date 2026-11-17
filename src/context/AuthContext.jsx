import { createContext, useContext, useState, useEffect } from 'react';
import { restaurant } from '../data/restaurant';

const AuthContext = createContext();

function getStoredAuth() {
  try {
    return sessionStorage.getItem('sampan-auth') === 'true';
  } catch {
    return false;
  }
}

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(getStoredAuth);

  useEffect(() => {
    try {
      sessionStorage.setItem('sampan-auth', isLoggedIn ? 'true' : 'false');
    } catch {
      // storage unavailable
    }
  }, [isLoggedIn]);

  const login = (email, password) => {
    if (
      email === restaurant.ownerCredentials.email &&
      password === restaurant.ownerCredentials.password
    ) {
      setIsLoggedIn(true);
      return true;
    }
    return false;
  };

  const logout = () => setIsLoggedIn(false);

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}
