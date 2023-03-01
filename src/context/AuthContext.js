import React, { useState, createContext } from "react";
import { loadLogin } from "../api/loginPersistence";

export const AuthContext = createContext({
  auth: undefined,
  login: () => {},
  logout: () => {},
});

export function AuthProvider(props) {
  const { children } = props;
  const [auth, setAuth] = useState(undefined);

  const login = (userData) => {
    setAuth(userData);
    loadLogin("logedIn");
  };

  const logout = () => {
    setAuth(undefined);
    loadLogin("logedOut");
  };

  const valueContext = { auth, login, logout };

  return (
    <AuthContext.Provider value={valueContext}>{children}</AuthContext.Provider>
  );
}
