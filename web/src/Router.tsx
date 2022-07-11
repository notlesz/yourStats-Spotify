import { Routes, Route } from "react-router-dom";
import { LoginCallback } from "./pages/callback/LoginCallback";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";

export function Router() {
  return (
    <Routes>
      <Route path="/logincallback" element={<LoginCallback />} />
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<Home />} />
    </Routes>
  );
}
