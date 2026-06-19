import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import Layout from "./components/layout/Layout";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import StadiumsPage from "./pages/StadiumsPage";
import StadiumDetailPage from "./pages/StadiumDetailPage";
import MapPage from "./pages/MapPage";
import AdminPage from "./pages/AdminPage";
import ProfilePage from "./pages/ProfilePage";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#00AEEF" },
    secondary: { main: "#D4AF37" },
    background: { default: "#0A2540", paper: "#0F3052" },
  },
  typography: {
    fontFamily: "'Outfit', 'Roboto', sans-serif",
  },
  shape: { borderRadius: 12 },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          scrollbarWidth: "thin",
          scrollbarColor: "#1a3a5c #0A2540",
          "&::-webkit-scrollbar": { width: 6 },
          "&::-webkit-scrollbar-track": { background: "#0A2540" },
          "&::-webkit-scrollbar-thumb": { background: "#1a3a5c", borderRadius: 3 },
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: { color: "#fff" },
      },
    },
    MuiMenu: {
      styleOverrides: {
        paper: { bgcolor: "#0F3052", border: "1px solid rgba(255,255,255,0.1)" },
      },
    },
  },
});

function AppRoutes() {
  return (
    <Routes>
      {/* Públicas */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* Protegidas */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Layout>
              <Navigate to="/home" replace />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <Layout><HomePage /></Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/estadios"
        element={
          <ProtectedRoute>
            <Layout><StadiumsPage /></Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/estadios/:id"
        element={
          <ProtectedRoute>
            <Layout><StadiumDetailPage /></Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/mapa"
        element={
          <ProtectedRoute>
            <Layout><MapPage /></Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin"
        element={
          <ProtectedRoute adminOnly>
            <Layout><AdminPage /></Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/perfil"
        element={
          <ProtectedRoute>
            <Layout><ProfilePage /></Layout>
          </ProtectedRoute>
        }
      />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}
