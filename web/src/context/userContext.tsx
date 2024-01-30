'use client';
import useToast from '@/hooks/useToast';
import { api, getUserData } from '@/services/api';
import { userToken } from '@/types/auth';
import { User } from '@/types/user';
import { removeAllKeys } from '@/utils/keys';
import { useRouter } from 'next/navigation';
import { ReactNode, createContext, useEffect, useState } from 'react';

interface userProviderProps {
  children: ReactNode;
}

interface userContext {
  user: User | null;
  logout: () => void;
  signIn: (credentials: userToken) => void;
}

export const UserContext = createContext<userContext>({} as any);

export function UserProvider({ children }: userProviderProps) {
  const [user, setUser] = useState<User | null>(null);

  const navigate = useRouter();

  const { handleToast } = useToast();

  function logout() {
    setTimeout(() => {
      setUser(null);
      removeAllKeys();
      navigate.push('/');
      handleToast('success', 'Logout realizado com sucesso!');
    }, 3000);
  }

  async function signIn(credentials: userToken) {
    api.defaults.headers.common['Authorization'] = credentials?.access_token;

    try {
      const { data } = await getUserData();
      console.log(data);

      setUser(data);
      localStorage.setItem('user', JSON.stringify(data));
      localStorage.setItem('token_user', JSON.stringify(credentials));
      handleToast('success', 'Login realizado com sucesso!');
      navigate.push('/home');
    } catch (error) {
      handleToast('error', 'Falha oa realizar login');
      navigate.push('/');
    }
  }

  useEffect(() => {
    const recoveredUser = localStorage.getItem('user');
    if (recoveredUser) {
      setUser(JSON.parse(recoveredUser));
    }
  }, []);

  return <UserContext.Provider value={{ user, signIn, logout }}>{children}</UserContext.Provider>;
}
