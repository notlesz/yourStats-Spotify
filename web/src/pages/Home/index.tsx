import { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { UserContext } from "../../context/userContext";

export default function Home() {
  const userToken = localStorage.getItem('user_token');
  const { user } = useContext(UserContext);

  if (!userToken && !user) {
    return <Navigate to="/" />
  }

  return <Outlet />;
}
