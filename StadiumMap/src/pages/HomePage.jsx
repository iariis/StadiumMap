import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box, Typography, Grid, Card, CardActionArea, CardContent,
  Chip, Select, MenuItem, FormControl, InputLabel, CircularProgress,
} from "@mui/material";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import PlaceIcon from "@mui/icons-material/Place";
import { MATCHES, STADIUMS, FLAGS } from "../data/stadiums";

export default function HomePage() {
  const navigate = useNavigate();
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterCountry, setFilterCountry] = useState("all");
  const [filterPhase, setFilterPhase] = useState("all");

  // useEffect para carga inicial de datos (simula fetch a API)
  useEffect(() => {
    const timer = setTimeout(() => {
      setMatches(MATCHES);
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const phases = [...new Set(MATCHES.map((m) => m.phase))];
  const countries = ["USA", "México", "Canadá"];

  const filtered = matches.filter((m) => {
    const stadium = STADIUMS.find((s) => s.id === m.stadiumId);
    const countryMatch = filterCountry === "all" || stadium?.country === filterCountry;
    const phaseMatch = filterPhase === "all" || m.phase === filterPhase;
    return countryMatch && phaseMatch;
  });

  return (
    <Box>
      {/* Header */}
      <Box sx={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: 2, mb: 3 }}>
        <Box>
          <Typography variant="h5" fontWeight={800} color="#fff">
            Partidos del Mundial
          </Typography>
          <Typography variant="body2" color="rgba(255,255,255,0.45)">
            Calendario FIFA World Cup 2026
          </Typography>
        </Box>

        <Box sx={{ display: "flex", gap: 1.5, flexWrap: "wrap" }}>
          <FormControl size="small" sx={selectSx}>
            <InputLabel>País sede</InputLabel>
            <Select value={filterCountry} onChange={(e) => setFilterCountry(e.target.value)} label="País sede">
              <MenuItem value="all">Todos</MenuItem>
              {countries.map((c) => <MenuItem key={c} value={c}>{c}</MenuItem>)}
            </Select>
          </FormControl>
          <FormControl size="small" sx={selectSx}>
            <InputLabel>Fase</InputLabel>
            <Select value={filterPhase} onChange={(e) => setFilterPhase(e.target.value)} label="Fase">
              <MenuItem value="all">Todas</MenuItem>
              {phases.map((p) => <MenuItem key={p} value={p}>{p}</MenuItem>)}
            </Select>
          </FormControl>
        </Box>
      </Box>

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
          <CircularProgress sx={{ color: "#00AEEF" }} />
        </Box>
      ) : (
        <Grid container spacing={2}>
          {filtered.map((match) => {
            const stadium = STADIUMS.find((s) => s.id === match.stadiumId);
            return (
              <Grid item xs={12} sm={6} lg={4} key={match.id}>
                <Card
                  elevation={0}
                  sx={{
                    bgcolor: "rgba(15,48,82,0.7)", border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: 3,
                    transition: "transform 0.2s, box-shadow 0.2s",
                    "&:hover": { transform: "translateY(-3px)", boxShadow: "0 8px 32px rgba(0,0,0,0.4)" },
                  }}
                >
                  <CardActionArea onClick={() => navigate(`/estadios/${match.stadiumId}`)}>
                    <CardContent sx={{ p: 2.5 }}>
                      {/* Phase + Date */}
                      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
                        <Chip label={match.phase} size="small"
                          sx={{ bgcolor: "rgba(0,174,239,0.15)", color: "#00AEEF", fontSize: 11, border: "1px solid rgba(0,174,239,0.25)" }} />
                        <Typography variant="caption" color="rgba(255,255,255,0.4)">
                          {new Date(match.date).toLocaleDateString("es-AR", { day: "2-digit", month: "short" })}
                        </Typography>
                      </Box>

                      {/* Teams */}
                      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2 }}>
                        <Box sx={{ textAlign: "center", flex: 1 }}>
                          <Typography fontSize={32}>{FLAGS[match.home] || "🏳️"}</Typography>
                          <Typography variant="caption" color="rgba(255,255,255,0.8)" fontWeight={500} display="block" mt={0.5}>
                            {match.home}
                          </Typography>
                        </Box>
                        <Box sx={{ textAlign: "center", px: 2 }}>
                          <Typography fontWeight={800} color="#D4AF37" fontSize={13}>VS</Typography>
                          <Typography variant="caption" color="rgba(255,255,255,0.4)" display="block" mt={0.3}>
                            {match.time}
                          </Typography>
                        </Box>
                        <Box sx={{ textAlign: "center", flex: 1 }}>
                          <Typography fontSize={32}>{FLAGS[match.away] || "🏳️"}</Typography>
                          <Typography variant="caption" color="rgba(255,255,255,0.8)" fontWeight={500} display="block" mt={0.5}>
                            {match.away}
                          </Typography>
                        </Box>
                      </Box>

                      {/* Stadium */}
                      <Box
                        sx={{
                          display: "flex", alignItems: "center", gap: 1, pt: 1.5,
                          borderTop: "1px solid rgba(255,255,255,0.06)",
                        }}
                      >
                        <PlaceIcon sx={{ fontSize: 14, color: "rgba(255,255,255,0.35)" }} />
                        <Typography variant="caption" color="rgba(255,255,255,0.45)" noWrap>
                          {stadium?.name} • {stadium?.city}
                        </Typography>
                      </Box>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      )}

      {!loading && filtered.length === 0 && (
        <Box sx={{ textAlign: "center", py: 8 }}>
          <SportsSoccerIcon sx={{ fontSize: 48, color: "rgba(255,255,255,0.15)", mb: 2 }} />
          <Typography color="rgba(255,255,255,0.4)">No hay partidos con los filtros seleccionados.</Typography>
        </Box>
      )}
    </Box>
  );
}

const selectSx = {
  minWidth: 140,
  "& .MuiOutlinedInput-root": {
    bgcolor: "rgba(10,37,64,0.6)", borderRadius: 2, color: "#fff",
    "& fieldset": { borderColor: "rgba(255,255,255,0.12)" },
    "&:hover fieldset": { borderColor: "rgba(0,174,239,0.4)" },
    "&.Mui-focused fieldset": { borderColor: "#00AEEF" },
  },
  "& .MuiInputLabel-root": { color: "rgba(255,255,255,0.4)" },
  "& .MuiSelect-icon": { color: "rgba(255,255,255,0.4)" },
};
