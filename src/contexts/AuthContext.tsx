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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (pb.authStore.isValid && pb.authStore.model) {
      pb.collection('users').authRefresh().then(({ record }) => {
        setUser(record);
      }).catch(() => {
        pb.authStore.clear();
        setUser(null);
      }).finally(() => {
        setLoading(false);
      });
    } else {
      setLoading(false);
    }

    const unsubscribe = pb.authStore.onChange((_token, model) => {
      setUser(model as RecordModel | null);
      setLoading(false);
    });

    return () => { unsubscribe(); };
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
