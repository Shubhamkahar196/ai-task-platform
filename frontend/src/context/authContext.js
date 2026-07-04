import axios from "axios";
import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";



import BASE_URL from "../utils/contants";

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const refreshUser = useCallback(async () => {
    try {
      const res = await axios.get(`${BASE_URL}/auth/profile`, {
        withCredentials: true,
      });
      setUser(res.data || null);
    } catch {
      setUser(null);
    }
  }, []);

  useEffect(() => {
    // Initial fetch based on cookie
    (async () => {
      await refreshUser();
      setLoading(false);
    })();
  }, [refreshUser]);

  const login = useCallback(async ({ email, password }) => {
    // backend sets httpOnly cookie; fetch profile afterwards
    await axios.post(
      `${BASE_URL}/auth/login`,
      { email, password },
      { withCredentials: true }
    );
    await refreshUser();
  }, [refreshUser]);

  const signup = useCallback(async ({ name, email, password }) => {
    await axios.post(
      `${BASE_URL}/auth/register`,
      { name, email, password },
      { withCredentials: true }
    );
    await refreshUser();
  }, [refreshUser]);

  const logout = useCallback(() => {
    // If backend has a logout route, use it. Otherwise clear local state.
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({
      user,
      loading,
      login,
      signup,
      logout,
      refreshUser,
    }),
    [user, loading, login, signup, logout, refreshUser]
  );

  return React.createElement(
    AuthContext.Provider,
    { value },
    children
  );
};


export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
};

export default AuthContext;

