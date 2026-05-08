import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { authService } from "../services/authService";
import { setUnauthorizedHandler } from "../services/http";
import { userService } from "../services/userService";
import { AuthContext } from "./AuthContextValue";

export function AuthProvider({ children }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [loading, setLoading] = useState(true);

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
    navigate("/login");
  }, [navigate]);

  useEffect(() => {
    setUnauthorizedHandler(logout);
  }, [logout]);

  useEffect(() => {
    const bootstrap = async () => {
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const profile = await userService.getProfile();
        setUser(profile);
      } catch {
        localStorage.removeItem("token");
        setToken(null);
      } finally {
        setLoading(false);
      }
    };
    bootstrap();
  }, [token]);

  const login = async (payload) => {
    const data = await authService.login(payload);
    localStorage.setItem("token", data.token);
    setToken(data.token);
    setUser(data.user);
    toast.success("Welcome back");
    return data;
  };

  const register = async (payload) => {
    const data = await authService.register(payload);
    toast.success("Account created, please login");
    return data;
  };

  const refreshProfile = async () => {
    const profile = await userService.getProfile();
    setUser(profile);
    return profile;
  };

  const value = useMemo(
    () => ({ user, token, loading, isAuthenticated: Boolean(token), login, register, logout, refreshProfile }),
    [user, token, loading, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
