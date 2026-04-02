import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import type { RecordModel } from 'pocketbase';
import { pb } from '../lib/pocketbase';

interface AuthContextType {
  user: RecordModel | null;
  loading: boolean;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<RecordModel | null>(
    pb.authStore.isValid ? pb.authStore.model as RecordModel : null
  );
  // Start loading=true so AuthGuard holds the spinner until the initial
  // authRefresh resolves, preventing components from mounting before auth
  // state is confirmed.
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // On mount, proactively refresh the stored token so it is fresh for the
    // session.  If the refresh fails the token is genuinely expired and we
    // clear the store so the user is redirected to /login.
    if (pb.authStore.isValid && pb.authStore.model) {
      pb.collection('users').authRefresh({ $autoCancel: false } as any)
        .then(({ record }) => {
          setUser(record);
        })
        .catch(() => {
          pb.authStore.clear();
          setUser(null);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }

    // Keep React state in sync whenever the auth store changes (e.g., after
    // ensureAuth() refreshes the token mid-session).
    const unsubscribe = pb.authStore.onChange((_token, model) => {
      setUser(model as RecordModel | null);
      setLoading(false);
    });

    // Listen for the global pb:authError event dispatched by the afterSend
    // interceptor in pocketbase.ts.  Any 401/403 from any collection will
    // trigger this, clearing the user and redirecting to /login via AuthGuard.
    const handleAuthError = () => {
      pb.authStore.clear();
      setUser(null);
    };
    window.addEventListener('pb:authError', handleAuthError);

    return () => {
      unsubscribe();
      window.removeEventListener('pb:authError', handleAuthError);
    };
  }, []);

  const signOut = async () => {
    pb.authStore.clear();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
