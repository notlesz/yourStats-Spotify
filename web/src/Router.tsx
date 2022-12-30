import { Routes, Route } from "react-router-dom";
import { UserProvider } from "./context/userContext";
import { Home, HomeMain, Login, LoginCallback } from "./pages";

export function Router() {
  return (
    <UserProvider>
      <Routes>
        <Route path="/login_callback" element={<LoginCallback />} />
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />}>
          <Route path="" element={<HomeMain />} />
        </Route>
      </Routes>
    </UserProvider>
  );
}
