
import { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) return;

    try {
      const decoded = jwtDecode(token);

      if (decoded.exp * 1000 <= Date.now()) {
        localStorage.removeItem("token");
        return;
      }

      setUser(decoded);
    } catch (error) {
      localStorage.removeItem("token");
      setUser(null);
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
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
