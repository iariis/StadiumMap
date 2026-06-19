import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box, Typography, Grid, TextField, InputAdornment,
  ToggleButtonGroup, ToggleButton, CircularProgress,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import StadiumIcon from "@mui/icons-material/Stadium";
import StadiumCard from "../components/stadiums/StadiumCard";
import { useStadiumCRUD } from "../hooks/useStadiums";
import { STADIUMS } from "../data/stadiums";

export default function StadiumsPage() {
  const navigate = useNavigate();
  const { stadiums } = useStadiumCRUD(STADIUMS);

  const [search, setSearch] = useState("");
  const [country, setCountry] = useState("all");
  const [loading, setLoading] = useState(true);

  // useEffect: simula carga inicial
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 400);
    return () => clearTimeout(t);
  }, []);

  const filtered = stadiums.filter((s) => {
    const matchSearch =
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.city.toLowerCase().includes(search.toLowerCase());
    const matchCountry = country === "all" || s.country === country;
    return matchSearch && matchCountry;
  });

  return (
    <Box>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" fontWeight={800} color="#fff">
          Estadios Oficiales
        </Typography>
        <Typography variant="body2" color="rgba(255,255,255,0.45)">
          {stadiums.length} sedes del Mundial 2026
        </Typography>
      </Box>

      {/* Filters */}
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mb: 3, alignItems: "center" }}>
        <TextField
          size="small" placeholder="Buscar estadio o ciudad..."
          value={search} onChange={(e) => setSearch(e.target.value)}
          InputProps={{
            startAdornment: <InputAdornment position="start"><SearchIcon sx={{ color: "rgba(255,255,255,0.4)", fontSize: 18 }} /></InputAdornment>,
          }}
          sx={{
            minWidth: 240,
            "& .MuiOutlinedInput-root": {
              bgcolor: "rgba(10,37,64,0.6)", borderRadius: 2, color: "#fff",
              "& fieldset": { borderColor: "rgba(255,255,255,0.12)" },
              "&:hover fieldset": { borderColor: "rgba(0,174,239,0.4)" },
              "&.Mui-focused fieldset": { borderColor: "#00AEEF" },
            },
          }}
        />

        <ToggleButtonGroup
          value={country} exclusive onChange={(_, v) => v && setCountry(v)}
          size="small"
          sx={{
            "& .MuiToggleButton-root": {
              color: "rgba(255,255,255,0.5)", borderColor: "rgba(255,255,255,0.1)",
              fontSize: 12, textTransform: "none", px: 2,
              "&.Mui-selected": { bgcolor: "rgba(0,174,239,0.2)", color: "#00AEEF", borderColor: "rgba(0,174,239,0.3)" },
            },
          }}
        >
          <ToggleButton value="all">Todos</ToggleButton>
          <ToggleButton value="USA">🇺🇸 USA</ToggleButton>
          <ToggleButton value="México">🇲🇽 México</ToggleButton>
          <ToggleButton value="Canadá">🇨🇦 Canadá</ToggleButton>
        </ToggleButtonGroup>
      </Box>

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
          <CircularProgress sx={{ color: "#00AEEF" }} />
        </Box>
      ) : (
        <>
          <Typography variant="caption" color="rgba(255,255,255,0.35)" mb={2} display="block">
            {filtered.length} resultado{filtered.length !== 1 ? "s" : ""}
          </Typography>
          <Grid container spacing={2}>
            {filtered.map((stadium) => (
              <Grid item xs={12} sm={6} lg={4} key={stadium.id}>
                <StadiumCard
                  stadium={stadium}
                  onClick={() => navigate(`/estadios/${stadium.id}`)}
                />
              </Grid>
            ))}
          </Grid>

          {filtered.length === 0 && (
            <Box sx={{ textAlign: "center", py: 8 }}>
              <StadiumIcon sx={{ fontSize: 48, color: "rgba(255,255,255,0.15)", mb: 2 }} />
              <Typography color="rgba(255,255,255,0.4)">
                No se encontraron estadios con "{search}".
              </Typography>
            </Box>
          )}
        </>
      )}
    </Box>
  );
}
