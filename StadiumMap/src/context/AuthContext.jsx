import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

const USERS_KEY = "stadiummap_users";
const SESSION_KEY = "stadiummap_session";

// Usuarios iniciales hardcodeados
const DEFAULT_USERS = [
  { id: 1, name: "Admin Mundial", email: "admin@mundial.com", password: "admin123", role: "admin" },
  { id: 2, name: "Fan Fútbol", email: "fan@mundial.com", password: "fan123", role: "user" },
];

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Si no existen usuarios, inicializar en localStorage
  useEffect(() => {
    if (!localStorage.getItem(USERS_KEY)) {
      localStorage.setItem(USERS_KEY, JSON.stringify(DEFAULT_USERS));
    }
    // Restaurar sesión activa
    const session = localStorage.getItem(SESSION_KEY);
    if (session) {
      setUser(JSON.parse(session));
    }
    setLoading(false);
  }, []);

  const getUsers = () => JSON.parse(localStorage.getItem(USERS_KEY) || "[]");

  const register = ({ name, email, password }) => {
    const users = getUsers();
    if (users.find((u) => u.email === email)) {
      return { success: false, error: "El correo ya está registrado." };
    }
    const newUser = { id: Date.now(), name, email, password, role: "user" };
    localStorage.setItem(USERS_KEY, JSON.stringify([...users, newUser]));
    return { success: true };
  };

  const login = ({ email, password }) => {
    const users = getUsers();
    const found = users.find((u) => u.email === email && u.password === password);
    if (!found) return { success: false, error: "Credenciales incorrectas." };
    const sessionUser = { id: found.id, name: found.name, email: found.email, role: found.role };
    setUser(sessionUser);
    localStorage.setItem(SESSION_KEY, JSON.stringify(sessionUser));
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(SESSION_KEY);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook useAuth
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth debe usarse dentro de AuthProvider");
  return ctx;
}
