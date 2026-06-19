import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box, Typography, Button, Grid, Paper, Chip, Divider, CircularProgress,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PeopleIcon from "@mui/icons-material/People";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import GrassIcon from "@mui/icons-material/Grass";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import MapIcon from "@mui/icons-material/Map";
import StadiumIcon from "@mui/icons-material/Stadium";
import { STADIUMS, MATCHES, FLAGS } from "../data/stadiums";
import { useStadiumCRUD } from "../hooks/useStadiums";

const COUNTRY_FLAGS = { USA: "🇺🇸", México: "🇲🇽", Canadá: "🇨🇦" };

export default function StadiumDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { stadiums } = useStadiumCRUD(STADIUMS);
  const [stadium, setStadium] = useState(null);
  const [loading, setLoading] = useState(true);

  // useEffect: carga del estadio por ID (simula GET /api/stadiums/:id)
  useEffect(() => {
    const t = setTimeout(() => {
      const found = stadiums.find((s) => s.id === Number(id));
      setStadium(found || null);
      setLoading(false);
    }, 300);
    return () => clearTimeout(t);
  }, [id, stadiums]);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
        <CircularProgress sx={{ color: "#00AEEF" }} />
      </Box>
    );
  }

  if (!stadium) {
    return (
      <Box sx={{ textAlign: "center", py: 8 }}>
        <Typography color="rgba(255,255,255,0.5)">Estadio no encontrado.</Typography>
        <Button onClick={() => navigate("/estadios")} sx={{ mt: 2, color: "#00AEEF" }}>
          Volver a estadios
        </Button>
      </Box>
    );
  }

  const stadiumMatches = MATCHES.filter((m) => m.stadiumId === stadium.id);

  const stats = [
    { icon: <PeopleIcon />, label: "Capacidad", value: stadium.capacity.toLocaleString(), color: "#00AEEF" },
    { icon: <CalendarTodayIcon />, label: "Inauguración", value: stadium.year, color: "#D4AF37" },
    { icon: <SportsSoccerIcon />, label: "Partidos", value: stadium.matches, color: "#2E7D32" },
    { icon: <GrassIcon />, label: "Superficie", value: stadium.surface, color: "#00AEEF" },
  ];

  return (
    <Box>
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate("/estadios")}
        sx={{ color: "#00AEEF", textTransform: "none", mb: 2.5, pl: 0 }}
      >
        Volver a estadios
      </Button>

      {/* Hero */}
      <Box
        sx={{
          height: { xs: 160, md: 220 },
          borderRadius: 3,
          background: "linear-gradient(135deg, #0A2540 0%, #1a4a6c 50%, #0F3052 100%)",
          display: "flex", alignItems: "center", justifyContent: "center",
          position: "relative", mb: 3, overflow: "hidden",
          border: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <StadiumIcon sx={{ fontSize: { xs: 80, md: 120 }, color: "rgba(255,255,255,0.06)" }} />
        <Box sx={{ position: "absolute", top: 16, left: 16 }}>
          <Chip
            label={`${COUNTRY_FLAGS[stadium.country] || ""} ${stadium.country}`}
            sx={{ bgcolor: "rgba(0,0,0,0.5)", color: "#fff", border: "1px solid rgba(255,255,255,0.15)" }}
          />
        </Box>
      </Box>

      {/* Title */}
      <Typography variant="h4" fontWeight={800} color="#fff" mb={0.5}>
        {stadium.name}
      </Typography>
      <Typography variant="body1" color="rgba(255,255,255,0.5)" mb={3}>
        📍 {stadium.city}, {stadium.country}
      </Typography>

      {/* Stats */}
      <Grid container spacing={2} mb={3}>
        {stats.map((s) => (
          <Grid item xs={6} sm={3} key={s.label}>
            <Paper
              elevation={0}
              sx={{
                bgcolor: "rgba(15,48,82,0.7)", border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 3, p: 2, textAlign: "center",
              }}
            >
              <Box sx={{ color: s.color, mb: 0.5, "& svg": { fontSize: 20 } }}>{s.icon}</Box>
              <Typography variant="h6" fontWeight={800} color={s.color}>
                {s.value}
              </Typography>
              <Typography variant="caption" color="rgba(255,255,255,0.45)">
                {s.label}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Description */}
      {stadium.description && (
        <Paper
          elevation={0}
          sx={{ bgcolor: "rgba(15,48,82,0.7)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 3, p: 2.5, mb: 3 }}
        >
          <Typography variant="body2" color="rgba(255,255,255,0.7)" lineHeight={1.7}>
            {stadium.description}
          </Typography>
        </Paper>
      )}

      {/* Matches */}
      {stadiumMatches.length > 0 && (
        <Box mb={3}>
          <Typography variant="h6" fontWeight={700} color="#fff" mb={1.5}>
            Partidos programados
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            {stadiumMatches.map((m) => (
              <Paper
                key={m.id}
                elevation={0}
                sx={{
                  bgcolor: "rgba(15,48,82,0.7)", border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: 2, p: 1.5,
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                }}
              >
                <Typography variant="body2" color="#fff">
                  {FLAGS[m.home] || ""} {m.home} <span style={{ color: "#D4AF37" }}>vs</span> {m.away} {FLAGS[m.away] || ""}
                </Typography>
                <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                  <Chip label={m.phase} size="small"
                    sx={{ bgcolor: "rgba(0,174,239,0.15)", color: "#00AEEF", fontSize: 10 }} />
                  <Typography variant="caption" color="rgba(255,255,255,0.4)">
                    {new Date(m.date).toLocaleDateString("es-AR", { day: "2-digit", month: "short" })}
                  </Typography>
                </Box>
              </Paper>
            ))}
          </Box>
        </Box>
      )}

      <Divider sx={{ borderColor: "rgba(255,255,255,0.08)", mb: 2.5 }} />

      <Button
        startIcon={<MapIcon />}
        onClick={() => navigate("/mapa")}
        variant="outlined"
        sx={{
          color: "#00AEEF", borderColor: "rgba(0,174,239,0.4)", borderRadius: 2,
          textTransform: "none",
          "&:hover": { borderColor: "#00AEEF", bgcolor: "rgba(0,174,239,0.08)" },
        }}
      >
        Ver en mapa
      </Button>
    </Box>
  );
}
