import { Box, Card, CardContent, CardActionArea, Typography, Chip } from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import StadiumIcon from "@mui/icons-material/Stadium";

export const FLAGS = {
  México: "/flags/mx.png",
  USA: "/flags/us.png",
  Canadá: "/flags/ca.png"
};

const COUNTRY_COLORS = { USA: "#B22234", México: "#006847", Canadá: "#FF0000" };

function CountryFlag({ country }) {
  const src = FLAGS[country];

  if (!src) return null;

  return (
    <Box
      component="img"
      src={src}
      alt={country}
      sx={{
        width: 20,
        height: 14,
        objectFit: "cover",
        borderRadius: "2px",
        boxShadow: "0 0 0 1px rgba(255,255,255,0.22)",
      }}
    />
  );
}

export default function StadiumCard({ stadium, onClick }) {
  const flagColor = COUNTRY_COLORS[stadium.country] || "#00AEEF";

  return (
    <Card
      elevation={0}
      sx={{
        bgcolor: "rgba(15,48,82,0.7)", border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: 3, overflow: "hidden",
        transition: "transform 0.2s, box-shadow 0.2s",
        "&:hover": { transform: "translateY(-4px)", boxShadow: "0 12px 40px rgba(0,0,0,0.4)" },
      }}
    >
      <CardActionArea onClick={onClick}>
        {/* Header / Banner */}
        <Box
          sx={{
            height: 110, position: "relative", overflow: "hidden",
            
          }}
        >
          <Box
      component="img"
      src={stadium.image}
      alt={stadium.name}
      sx={{ width: "100%", height: "100%", objectFit: "cover" }}
    />
          <Box sx={{ position: "absolute", top: 10, left: 12 }}>
            <Chip
              label={
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.7 }}>
                  <CountryFlag country={stadium.country} />
                  <span>{stadium.country}</span>
                </Box>
              }
              size="small"
              sx={{
                bgcolor: "rgba(0,0,0,0.5)", color: "#fff", fontSize: 11,
                border: `1px solid ${flagColor}44`,
              }}
            />
          </Box>
          <Box sx={{ position: "absolute", top: 10, right: 12 }}>
            <Chip
              label={`${stadium.matches} partidos`}
              size="small"
              sx={{ bgcolor: "rgba(212,175,55,0.2)", color: "#D4AF37", fontSize: 11, border: "1px solid rgba(212,175,55,0.3)" }}
            />
          </Box>
        </Box>

        <CardContent sx={{ p: 2 }}>
          <Typography variant="subtitle1" fontWeight={700} color="#fff" noWrap gutterBottom>
            {stadium.name}
          </Typography>
          <Typography variant="body2" color="rgba(255,255,255,0.5)" mb={1.5}>
            📍 {stadium.city}
          </Typography>

          <Box sx={{ display: "flex", gap: 2 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <PeopleIcon sx={{ fontSize: 14, color: "#00AEEF" }} />
              <Typography variant="caption" color="rgba(255,255,255,0.6)">
                {stadium.capacity.toLocaleString()}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <CalendarTodayIcon sx={{ fontSize: 14, color: "#00AEEF" }} />
              <Typography variant="caption" color="rgba(255,255,255,0.6)">
                {stadium.year}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <SportsSoccerIcon sx={{ fontSize: 14, color: "#00AEEF" }} />
              <Typography variant="caption" color="rgba(255,255,255,0.6)">
                {stadium.surface}
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
