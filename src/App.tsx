import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import SendBalance from "./pages/SendBalance";
import SignUp from "./pages/SignUp";

// @ts-ignore
const PrivateRoute = ({ children, redirectTo }) => {
  const isAuthenticated = localStorage.getItem("auth") !== null;
  console.log("isAuth: ", isAuthenticated);
  return isAuthenticated ? children : <Navigate to={redirectTo} />;
};

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route
          path="/"
          element={
              <Home />
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route
          path="/send-balance"
          element={
            <PrivateRoute redirectTo="/login">
              <SendBalance />
            </PrivateRoute>
          }
        />
      </Routes>
    </HashRouter>
  );
}

export default App;
