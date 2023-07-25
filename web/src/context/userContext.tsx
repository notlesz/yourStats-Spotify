import { createContext, ReactNode, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useToast from '../hooks/useToast';
import { api, getUserData } from '../services/api';
import { userToken } from '../types/auth';
import { User } from '../types/user';
import { removeAllKeys } from '../utils/keys';

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

  const navigate = useNavigate();

  const { handleToast } = useToast();

  const recoveredUser = localStorage.getItem('user');

  function logout() {
    setTimeout(() => {
      setUser(null);
      removeAllKeys();
      navigate('/');
      handleToast('success', 'Logout realizado com sucesso!');
    }, 3000);
  }

  async function signIn(credentials: userToken) {
    api.defaults.headers.common['Authorization'] = credentials.access_token;
    try {
      const { data } = await getUserData();
      setUser(data);
      localStorage.setItem('user', JSON.stringify(data));
      localStorage.setItem('token_user', JSON.stringify(credentials));
      handleToast('success', 'Login realizado com sucesso!');
      navigate('/home');
    } catch (error) {
      handleToast('error', 'Falha oa realizar login');
      navigate('/');
    }
  }

  useEffect(() => {
    if (recoveredUser) {
      setUser(JSON.parse(recoveredUser));
    }
  }, []);

  return <UserContext.Provider value={{ user, signIn, logout }}>{children}</UserContext.Provider>;
}
