import { Box, Typography, Paper, Avatar, Chip, Divider, Button, Grid } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import StadiumIcon from "@mui/icons-material/Stadium";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import PersonIcon from "@mui/icons-material/Person";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { STADIUMS } from "../data/stadiums";

const RECENT = ["MetLife Stadium", "Estadio Azteca", "SoFi Stadium"];

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const stats = [
    { label: "Estadios en BD", value: STADIUMS.length, color: "#00AEEF" },
    { label: "Partidos 2026", value: 9, color: "#D4AF37" },
    { label: "Sedes visitadas", value: 3, color: "#2E7D32" },
  ];

  return (
    <Box maxWidth={560}>
      <Typography variant="h5" fontWeight={800} color="#fff" mb={3}>
        Mi Perfil
      </Typography>

      {/* Card principal */}
      <Paper
        elevation={0}
        sx={{ bgcolor: "rgba(15,48,82,0.7)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 3, p: 3, mb: 2.5 }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2.5 }}>
          <Avatar
            sx={{
              width: 60, height: 60, bgcolor: "#00AEEF", fontSize: 22, fontWeight: 700,
            }}
          >
            {user?.name?.charAt(0).toUpperCase()}
          </Avatar>
          <Box>
            <Typography variant="h6" fontWeight={700} color="#fff">
              {user?.name}
            </Typography>
            <Typography variant="body2" color="rgba(255,255,255,0.5)">
              {user?.email}
            </Typography>
            <Chip
              icon={user?.role === "admin" ? <AdminPanelSettingsIcon sx={{ fontSize: "14px !important" }} /> : <PersonIcon sx={{ fontSize: "14px !important" }} />}
              label={user?.role === "admin" ? "Administrador" : "Usuario"}
              size="small"
              sx={{
                mt: 0.5,
                bgcolor: user?.role === "admin" ? "rgba(212,175,55,0.2)" : "rgba(0,174,239,0.2)",
                color: user?.role === "admin" ? "#D4AF37" : "#00AEEF",
                border: `1px solid ${user?.role === "admin" ? "rgba(212,175,55,0.3)" : "rgba(0,174,239,0.3)"}`,
                fontSize: 11,
              }}
            />
          </Box>
        </Box>

        <Divider sx={{ borderColor: "rgba(255,255,255,0.08)", mb: 2.5 }} />

        {/* Stats */}
        <Grid container spacing={1.5} mb={2.5}>
          {stats.map((s) => (
            <Grid item xs={4} key={s.label}>
              <Box sx={{ textAlign: "center", p: 1.5, bgcolor: "rgba(10,37,64,0.5)", borderRadius: 2 }}>
                <Typography variant="h5" fontWeight={800} color={s.color}>{s.value}</Typography>
                <Typography variant="caption" color="rgba(255,255,255,0.45)" fontSize={10}>{s.label}</Typography>
              </Box>
            </Grid>
          ))}
        </Grid>

        <Divider sx={{ borderColor: "rgba(255,255,255,0.08)", mb: 2 }} />

        {/* Estadios recientes */}
        <Typography variant="caption" color="rgba(255,255,255,0.5)" fontWeight={600} display="block" mb={1}>
          Estadios consultados recientemente
        </Typography>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.8 }}>
          {RECENT.map((name) => (
            <Chip
              key={name}
              icon={<StadiumIcon sx={{ fontSize: "14px !important", color: "rgba(255,255,255,0.5) !important" }} />}
              label={name}
              size="small"
              sx={{ bgcolor: "rgba(10,37,64,0.6)", color: "rgba(255,255,255,0.7)", fontSize: 11, border: "1px solid rgba(255,255,255,0.08)" }}
            />
          ))}
        </Box>
      </Paper>

      <Button
        startIcon={<LogoutIcon />}
        onClick={handleLogout}
        fullWidth
        variant="outlined"
        sx={{
          color: "#f44336", borderColor: "rgba(244,67,54,0.4)", borderRadius: 2,
          textTransform: "none", fontWeight: 600, py: 1.2,
          "&:hover": { bgcolor: "rgba(244,67,54,0.08)", borderColor: "#f44336" },
        }}
      >
        Cerrar Sesión
      </Button>
    </Box>
  );
}
