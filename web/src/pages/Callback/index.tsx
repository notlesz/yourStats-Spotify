import { useEffect, useMemo, useState, useContext } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import Loading from "../../components/Loading";
import { getAccessToken, getUserData } from "../../services/api";
import { UserContext } from "../../context/userContext";

export default function LoginCallback() {
  const { search } = useLocation();
  const navigate = useNavigate();
  const { signIn, user } = useContext(UserContext);
  const query = useMemo(() => new URLSearchParams(search), [search]);
  const token = query.get("code");

  const getCredentials = async (token: string) => {
    const response = await getAccessToken(token);
    console.log(response)
    localStorage.setItem('token_user', response.data.access_token)
    if (response.status === 201) {
      const { data } = await getUserData(response.data.access_token);
      signIn(data);
    } 
    if (response.status >= 400) navigate('/');
  };

  useEffect(() => {
    if (token) getCredentials(token);
  }, [token]);

  return (
    <>
      {!user && (
        <div className="h-screen w-screen flex justify-center items-center">
          <Loading />
        </div>
      )}
    </>
  );
}
