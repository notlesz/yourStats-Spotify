import { ReactNode, useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { UserContext, UserProvider } from "./context/userContext";
import { Home, Login, LoginCallback } from "./pages";

interface PrivateRouteProps {
  children: ReactNode;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const { user } = useContext(UserContext);
  const token = localStorage.getItem("token_user");
  return !token && !user ? <Navigate to="/" /> : <>{children}</>;
};

export function Router() {
  return (
    <UserProvider>
      <Routes>
        <Route path="/login_callback" element={<LoginCallback />} />
        <Route path="/" element={<Login />} />
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        ></Route>
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </UserProvider>
  );
}
