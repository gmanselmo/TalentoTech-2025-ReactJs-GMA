import { useState, useEffect } from 'react';

const AUTH_EVENT = 'authUpdated';

export function useAuthStore() {
  const readAuthStatus = () => {
    const user = localStorage.getItem('auth');
    return {
      isAuthenticated: !!user,
      user: user,
    };
  };

  const [authState, setAuthState] = useState(readAuthStatus);

  useEffect(() => {
    const handleAuthChange = () => {
      setAuthState(readAuthStatus());
    };
    window.addEventListener(AUTH_EVENT, handleAuthChange);
    return () => {
      window.removeEventListener(AUTH_EVENT, handleAuthChange);
    };
  }, []);

  const login = (userData) => {
    localStorage.setItem('auth', userData);
    window.dispatchEvent(new Event(AUTH_EVENT));
  };

  const logout = () => {
    localStorage.removeItem('auth');
    window.dispatchEvent(new Event(AUTH_EVENT));
  };

  return {
    isAuthenticated: authState.isAuthenticated,
    user: authState.user,
    login,
    logout,
  };
}
