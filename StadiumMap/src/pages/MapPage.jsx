import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Paper, Chip, Button } from "@mui/material";
import PlaceIcon from "@mui/icons-material/Place";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { STADIUMS, MATCHES } from "../data/stadiums";
import { useStadiumCRUD } from "../hooks/useStadiums";

// Posiciones SVG aproximadas en el mapa de Norteamérica (viewBox 0 0 800 520)
const MAP_POSITIONS = {
  1: { x: 640, y: 175 },  // MetLife - NJ
  2: { x: 440, y: 265 },  // AT&T - Dallas
  3: { x: 540, y: 270 },  // Mercedes-Benz - Atlanta
  4: { x: 155, y: 270 },  // SoFi - LA
  5: { x: 430, y: 295 },  // NRG - Houston
  6: { x: 460, y: 210 },  // Arrowhead - Kansas City
  7: { x: 630, y: 180 },  // Lincoln - Philly
  8: { x: 135, y: 140 },  // Lumen - Seattle
  9: { x: 660, y: 155 },  // Gillette - Boston
  10: { x: 580, y: 320 }, // Hard Rock - Miami
  11: { x: 140, y: 255 }, // Levi's - SF
  12: { x: 360, y: 360 }, // Azteca - CDMX
  13: { x: 370, y: 310 }, // BBVA - Monterrey
  14: { x: 320, y: 345 }, // Akron - Guadalajara
  15: { x: 155, y: 110 }, // BC Place - Vancouver
  16: { x: 590, y: 145 }, // BMO - Toronto
};

const COUNTRY_COLORS = { USA: "#00AEEF", México: "#2E7D32", Canadá: "#D4AF37" };

export default function MapPage() {
  const navigate = useNavigate();
  const { stadiums } = useStadiumCRUD(STADIUMS);
  const [selected, setSelected] = useState(null);
  const [hovered, setHovered] = useState(null);

  // useEffect: actualiza selección al cambiar datos
  useEffect(() => {
    if (selected) {
      const updated = stadiums.find((s) => s.id === selected.id);
      if (updated) setSelected(updated);
    }
  }, [stadiums]);

  const stadiumMatches = selected
    ? MATCHES.filter((m) => m.stadiumId === selected.id)
    : [];

  return (
    <Box>
      <Typography variant="h5" fontWeight={800} color="#fff" mb={0.5}>
        Mapa Interactivo
      </Typography>
      <Typography variant="body2" color="rgba(255,255,255,0.45)" mb={3}>
        Sedes del Mundial 2026 en Norteamérica • Hacé clic en un marcador
      </Typography>

      <Box sx={{ display: "flex", gap: 2, flexDirection: { xs: "column", md: "row" } }}>
        {/* SVG Map */}
        <Box
          sx={{
            flex: 1, bgcolor: "rgba(15,48,82,0.7)", borderRadius: 3,
            border: "1px solid rgba(255,255,255,0.08)", overflow: "hidden",
            minHeight: 380,
          }}
        >
          <svg
            viewBox="0 0 800 520"
            style={{ width: "100%", height: "100%", minHeight: 320 }}
          >
            {/* Fondo oceánico */}
            <rect width="800" height="520" fill="#0A2540" />

            {/* Canadá */}
            <path
              d="M120,30 L680,30 L720,80 L740,130 L720,160 L680,170 L640,155 L600,148 L560,140 L520,132 L480,128 L440,125 L400,122 L360,120 L320,122 L280,126 L240,132 L200,140 L160,150 L130,160 L115,140 L108,100 Z"
              fill="#1a3a5c" stroke="rgba(212,175,55,0.3)" strokeWidth="1" opacity="0.7"
            />
            {/* USA */}
            <path
              d="M130,160 L160,150 L200,140 L240,132 L280,126 L320,122 L360,120 L400,122 L440,125 L480,128 L520,132 L560,140 L600,148 L640,155 L680,170 L720,160 L740,200 L745,240 L730,290 L700,320 L660,340 L620,360 L580,370 L540,365 L500,360 L460,370 L440,390 L430,370 L400,360 L380,340 L360,310 L330,290 L300,285 L270,290 L250,280 L230,270 L200,265 L170,255 L145,240 L128,210 L122,185 Z"
              fill="#1a4a3c" stroke="rgba(0,174,239,0.3)" strokeWidth="1" opacity="0.7"
            />
            {/* México */}
            <path
              d="M270,290 L300,285 L330,290 L360,310 L380,340 L400,360 L430,370 L440,390 L430,415 L400,430 L370,440 L340,435 L310,420 L290,400 L275,375 L268,345 L265,315 Z"
              fill="#1a3a2c" stroke="rgba(46,125,50,0.4)" strokeWidth="1" opacity="0.7"
            />

            {/* Cuadriculado sutil */}
            {Array.from({ length: 16 }).map((_, i) => (
              <line key={`v${i}`} x1={i * 53} y1="0" x2={i * 53} y2="520"
                stroke="rgba(0,174,239,0.04)" strokeWidth="1" />
            ))}
            {Array.from({ length: 10 }).map((_, i) => (
              <line key={`h${i}`} x1="0" y1={i * 58} x2="800" y2={i * 58}
                stroke="rgba(0,174,239,0.04)" strokeWidth="1" />
            ))}

            {/* Estadios */}
            {stadiums.map((s) => {
              const pos = MAP_POSITIONS[s.id];
              if (!pos) return null;
              const color = COUNTRY_COLORS[s.country] || "#00AEEF";
              const isSelected = selected?.id === s.id;
              const isHovered = hovered === s.id;

              return (
                <g
                  key={s.id}
                  style={{ cursor: "pointer" }}
                  onClick={() => setSelected(s)}
                  onMouseEnter={() => setHovered(s.id)}
                  onMouseLeave={() => setHovered(null)}
                >
                  {/* Halo */}
                  <circle cx={pos.x} cy={pos.y} r={isSelected ? 18 : 12}
                    fill={color} opacity={isSelected ? 0.25 : 0.12} />
                  {/* Dot */}
                  <circle cx={pos.x} cy={pos.y} r={isSelected ? 7 : isHovered ? 6 : 5}
                    fill={color} stroke="#fff" strokeWidth={isSelected ? 2 : 1.5} />
                  {/* Label on hover/select */}
                  {(isSelected || isHovered) && (
                    <text
                      x={pos.x} y={pos.y - 14}
                      textAnchor="middle" fontSize="9" fill="#fff"
                      style={{ pointerEvents: "none", fontFamily: "sans-serif" }}
                    >
                      {s.name.split(" ").slice(0, 2).join(" ")}
                    </text>
                  )}
                </g>
              );
            })}
          </svg>
        </Box>

        {/* Info Panel */}
        <Box sx={{ width: { xs: "100%", md: 280 }, flexShrink: 0 }}>
          {selected ? (
            <Paper
              elevation={0}
              sx={{
                bgcolor: "rgba(15,48,82,0.9)", border: "1px solid rgba(0,174,239,0.3)",
                borderRadius: 3, p: 2.5, height: "100%",
              }}
            >
              <Typography variant="h6" fontWeight={700} color="#fff" mb={0.5}>
                {selected.name}
              </Typography>
              <Typography variant="body2" color="rgba(255,255,255,0.5)" mb={2}>
                📍 {selected.city}, {selected.country}
              </Typography>

              <Box sx={{ display: "flex", flexDirection: "column", gap: 1, mb: 2 }}>
                {[
                  ["Capacidad", selected.capacity.toLocaleString()],
                  ["Inauguración", selected.year],
                  ["Partidos", `${selected.matches} partidos`],
                  ["Superficie", selected.surface],
                ].map(([k, v]) => (
                  <Box key={k} sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Typography variant="caption" color="rgba(255,255,255,0.45)">{k}</Typography>
                    <Typography variant="caption" color="#fff" fontWeight={500}>{v}</Typography>
                  </Box>
                ))}
              </Box>

              {stadiumMatches.length > 0 && (
                <>
                  <Typography variant="caption" color="#D4AF37" fontWeight={600} display="block" mb={1}>
                    Partidos
                  </Typography>
                  {stadiumMatches.map((m) => (
                    <Chip
                      key={m.id}
                      label={`${m.home} vs ${m.away}`}
                      size="small"
                      sx={{
                        mb: 0.5, mr: 0.5, bgcolor: "rgba(0,174,239,0.12)",
                        color: "rgba(255,255,255,0.8)", fontSize: 10,
                      }}
                    />
                  ))}
                </>
              )}

              <Button
                startIcon={<OpenInNewIcon />}
                onClick={() => navigate(`/estadios/${selected.id}`)}
                size="small" fullWidth
                sx={{
                  mt: 2, color: "#00AEEF", borderColor: "rgba(0,174,239,0.4)",
                  textTransform: "none", borderRadius: 2,
                }}
                variant="outlined"
              >
                Ver detalle
              </Button>
            </Paper>
          ) : (
            <Paper
              elevation={0}
              sx={{
                bgcolor: "rgba(15,48,82,0.5)", border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: 3, p: 3, height: "100%",
                display: "flex", flexDirection: "column", alignItems: "center",
                justifyContent: "center", textAlign: "center", gap: 1,
              }}
            >
              <PlaceIcon sx={{ fontSize: 40, color: "rgba(255,255,255,0.15)" }} />
              <Typography variant="body2" color="rgba(255,255,255,0.35)">
                Seleccioná un estadio en el mapa para ver la información
              </Typography>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5, justifyContent: "center", mt: 1 }}>
                {Object.entries(COUNTRY_COLORS).map(([c, col]) => (
                  <Chip key={c} label={c} size="small"
                    sx={{ bgcolor: `${col}22`, color: col, border: `1px solid ${col}44`, fontSize: 11 }} />
                ))}
              </Box>
            </Paper>
          )}
        </Box>
      </Box>
    </Box>
  );
}
