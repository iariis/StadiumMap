import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  AppBar, Toolbar, Box, Drawer, List, ListItem, ListItemButton,
  ListItemIcon, ListItemText, Typography, Avatar, IconButton,
  Tooltip, Divider, useMediaQuery, useTheme, Badge,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import StadiumIcon from "@mui/icons-material/Stadium";
import MapIcon from "@mui/icons-material/Map";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import PersonIcon from "@mui/icons-material/Person";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import { useAuth } from "../../context/AuthContext";

const DRAWER_WIDTH = 220;

const NAV_ITEMS = [
  { label: "Inicio", icon: <HomeIcon />, path: "/home" },
  { label: "Estadios", icon: <StadiumIcon />, path: "/estadios" },
  { label: "Mapa", icon: <MapIcon />, path: "/mapa" },
  { label: "Admin", icon: <AdminPanelSettingsIcon />, path: "/admin", role: "admin" },
  { label: "Perfil", icon: <PersonIcon />, path: "/perfil" },
];

export default function Layout({ children }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleNav = (path) => {
    navigate(path);
    setMobileOpen(false);
  };

  const visibleItems = NAV_ITEMS.filter(
    (item) => !item.role || user?.role === item.role
  );

  const drawerContent = (
    <Box sx={{ height: "100%", display: "flex", flexDirection: "column", bgcolor: "#0F3052" }}>
      {/* Logo */}
      <Box sx={{ p: 2.5, display: "flex", alignItems: "center", gap: 1.5 }}>
        <Box
          sx={{
            width: 38, height: 38, borderRadius: 2,
            bgcolor: "#00AEEF", display: "flex", alignItems: "center", justifyContent: "center",
          }}
        >
          <EmojiEventsIcon sx={{ color: "#fff", fontSize: 20 }} />
        </Box>
        <Box>
          <Typography variant="subtitle2" fontWeight={700} color="#fff" lineHeight={1.2}>
            StadiumMap
          </Typography>
          <Typography variant="caption" color="#00AEEF">
            FIFA 2026
          </Typography>
        </Box>
      </Box>

      <Divider sx={{ borderColor: "rgba(255,255,255,0.08)", mx: 2 }} />

      {/* Nav items */}
      <List sx={{ px: 1.5, pt: 1, flexGrow: 1 }}>
        {visibleItems.map((item) => {
          const active = location.pathname === item.path;
          return (
            <ListItem key={item.path} disablePadding sx={{ mb: 0.5 }}>
              <ListItemButton
                onClick={() => handleNav(item.path)}
                sx={{
                  borderRadius: 2,
                  py: 1,
                  bgcolor: active ? "rgba(0,174,239,0.15)" : "transparent",
                  borderLeft: active ? "3px solid #00AEEF" : "3px solid transparent",
                  color: active ? "#00AEEF" : "rgba(255,255,255,0.6)",
                  "&:hover": { bgcolor: "rgba(255,255,255,0.06)", color: "#fff" },
                  transition: "all 0.15s",
                }}
              >
                <ListItemIcon sx={{ color: "inherit", minWidth: 36, "& svg": { fontSize: 20 } }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.label}
                  primaryTypographyProps={{ fontSize: 14, fontWeight: active ? 600 : 400 }}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>

      {/* Bottom user info */}
      <Box sx={{ p: 2, borderTop: "1px solid rgba(255,255,255,0.08)" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1 }}>
          <Avatar sx={{ width: 32, height: 32, bgcolor: "#00AEEF", fontSize: 13 }}>
            {user?.name?.charAt(0).toUpperCase()}
          </Avatar>
          <Box sx={{ overflow: "hidden" }}>
            <Typography variant="caption" fontWeight={600} color="#fff" noWrap display="block">
              {user?.name}
            </Typography>
            <Typography variant="caption" color="#D4AF37" fontSize={10}>
              {user?.role === "admin" ? "Administrador" : "Usuario"}
            </Typography>
          </Box>
        </Box>
        <Typography variant="caption" color="rgba(255,255,255,0.3)">
          🏆 USA • MEX • CAN
        </Typography>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: "flex", height: "100vh", bgcolor: "#0A2540" }}>
      {/* Sidebar desktop */}
      {!isMobile && (
        <Drawer
          variant="permanent"
          sx={{
            width: DRAWER_WIDTH,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: DRAWER_WIDTH,
              border: "none",
              boxShadow: "2px 0 12px rgba(0,0,0,0.3)",
            },
          }}
        >
          {drawerContent}
        </Drawer>
      )}

      {/* Sidebar mobile */}
      {isMobile && (
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
          sx={{ "& .MuiDrawer-paper": { width: DRAWER_WIDTH, border: "none" } }}
        >
          {drawerContent}
        </Drawer>
      )}

      {/* Main */}
      <Box sx={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        {/* Topbar */}
        <AppBar
          position="static"
          elevation={0}
          sx={{ bgcolor: "rgba(15,48,82,0.9)", borderBottom: "1px solid rgba(255,255,255,0.06)", backdropFilter: "blur(12px)" }}
        >
          <Toolbar sx={{ minHeight: 56, gap: 1 }}>
            {isMobile && (
              <IconButton onClick={() => setMobileOpen(true)} sx={{ color: "#fff", mr: 1 }}>
                <MenuIcon />
              </IconButton>
            )}
            <Typography variant="h6" fontWeight={700} color="#fff" sx={{ flexGrow: 1, fontSize: 16 }}>
              StadiumMap 2026
            </Typography>
          
            <Tooltip title="Cerrar sesión">
              <IconButton onClick={logout} sx={{ color: "rgba(255,255,255,0.6)" }}>
                <LogoutIcon fontSize="small" />
              </IconButton>
            </Tooltip>
            <Avatar
              onClick={() => navigate("/perfil")}
              sx={{ width: 34, height: 34, bgcolor: "#00AEEF", fontSize: 13, cursor: "pointer", ml: 0.5 }}
            >
              {user?.name?.charAt(0).toUpperCase()}
            </Avatar>
          </Toolbar>
        </AppBar>

        {/* Content */}
        <Box sx={{ flex: 1, overflow: "auto", p: { xs: 2, md: 3 } }}>
          {children}
        </Box>

        {/* Mobile bottom nav */}
        {isMobile && (
          <Box
            sx={{
              display: "flex", bgcolor: "rgba(15,48,82,0.97)",
              borderTop: "1px solid rgba(255,255,255,0.08)",
              backdropFilter: "blur(12px)",
            }}
          >
            {visibleItems.map((item) => {
              const active = location.pathname === item.path;
              return (
                <Box
                  key={item.path}
                  onClick={() => handleNav(item.path)}
                  sx={{
                    flex: 1, py: 1, display: "flex", flexDirection: "column",
                    alignItems: "center", gap: 0.3, cursor: "pointer",
                    color: active ? "#00AEEF" : "rgba(255,255,255,0.5)",
                    "& svg": { fontSize: 22 },
                  }}
                >
                  {item.icon}
                  <Typography variant="caption" fontSize={10}>{item.label}</Typography>
                </Box>
              );
            })}
          </Box>
        )}
      </Box>
    </Box>
  );
}
