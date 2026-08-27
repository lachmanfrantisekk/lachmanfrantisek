import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';

const ADMIN_USER = 'ahoy';
const ADMIN_PASS = 'adminacek';
const SESSION_KEY = 'fl-admin-session';

interface AuthContextValue {
  isAuthed: boolean;
  loading: boolean;
  signIn: (username: string, password: string) => { error?: string };
  signOut: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthed, setIsAuthed] = useState(false);
  const [loading, setLoading] = useState(true);

  useState(() => {
    const stored = sessionStorage.getItem(SESSION_KEY);
    setIsAuthed(stored === 'true');
    setLoading(false);
  });

  const signIn = useCallback((username: string, password: string) => {
    if (username.trim() === ADMIN_USER && password === ADMIN_PASS) {
      sessionStorage.setItem(SESSION_KEY, 'true');
      setIsAuthed(true);
      return {};
    }
    return { error: 'Invalid username or password' };
  }, []);

  const signOut = useCallback(() => {
    sessionStorage.removeItem(SESSION_KEY);
    setIsAuthed(false);
  }, []);

  const value = useMemo(
    () => ({ isAuthed, loading, signIn, signOut }),
    [isAuthed, loading, signIn, signOut],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
