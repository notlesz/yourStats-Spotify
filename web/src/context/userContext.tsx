import React, { ReactNode, createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "../types/user";
import removeAllKeys from "../utils/removeKeys";

interface userProviderProps {
  children: ReactNode;
}

interface userContext {
  user: User | null;
  logout: () => void;
  signIn: (user: User) => void;
}

export const UserContext = createContext<userContext>({} as any);

export function UserProvider({ children }: userProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  function logout() {
    setTimeout(() => {
      setUser(null);
      removeAllKeys();
      navigate("/");
    }, 3000)
  }

  function signIn(user: User) {
    setUser(user);
    localStorage.setItem("user", JSON.stringify(user));
    navigate('/home')
  }

  useEffect(() => {
    const recoveredUser = localStorage.getItem("user");
    if (recoveredUser) {
      setUser(JSON.parse(recoveredUser));
    }
  }, []);

  return <UserContext.Provider value={{user, signIn, logout}}>{children}</UserContext.Provider>;
}
