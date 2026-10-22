import { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [authReady, setAuthReady] = useState(false);
  

useEffect(() => {
  const token = localStorage.getItem("token");

  if (!token) {
    setAuthReady(true);
    return;
  }

  try {
    const decoded = jwtDecode(token);

    if (decoded.exp * 1000 <= Date.now()) {
      localStorage.removeItem("token");
      setUser(null);
    } else {
      setUser(decoded);
    }
  } catch (error) {
    localStorage.removeItem("token");
    setUser(null);
  } finally {
    setAuthReady(true);
  }
}, []);


  function login(token) {
    localStorage.setItem("token", token);
    const decoded = jwtDecode(token);
    setUser(decoded);
  }

  function logout() {
    localStorage.removeItem("token");
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, authReady }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
