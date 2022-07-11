import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getAccessToken } from "../../services/api";

export function LoginCallback() {
  const [auth, setAuth] = useState(false);
  const { search } = useLocation();
  const navigate = useNavigate();

  const query = useMemo(() => new URLSearchParams(search), [search]);
  const token = query.get("code");

  const getCredentials = async (token: string) => {
    const response = await getAccessToken(token);
    if(response.status === 200){
      setAuth(true);
      navigate("/home");
      localStorage.setItem('userIsLogged', 'true');
    }
  };

  useEffect(() => {
    if (token) getCredentials(token);
  }, [token]);

  return <>{!auth && <h1>Você está sendo redirecionado</h1>}</>;
}
