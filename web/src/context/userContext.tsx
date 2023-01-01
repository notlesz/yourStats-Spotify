import { createContext, ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useToast from "../hook/useToast";
import { User } from "../types/user";
import removeAllKeys from "../utils/removeKeys";

interface userProviderProps {
  children: ReactNode;
}

interface userContext {
  user: User | null;
  logout: () => void;
  signIn: (user: User, token: string) => void;
}

export const UserContext = createContext<userContext>({} as any);

export function UserProvider({ children }: userProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();
  const { handleToast } = useToast();
  const recoveredUser = localStorage.getItem("user");

  function logout() {
    setTimeout(() => {
      setUser(null);
      removeAllKeys();
      navigate("/");
      handleToast("success", "Logout realizado com sucesso!");
    }, 3000);
  }

  function signIn(user: User, token: string) {
    setUser(user);
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token_user", token);
    navigate("/home");
  }

  useEffect(() => {
    if (recoveredUser) {
      setUser(JSON.parse(recoveredUser));
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, signIn, logout }}>
      {children}
    </UserContext.Provider>
  );
}
