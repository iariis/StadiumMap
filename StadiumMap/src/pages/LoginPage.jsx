import EmailIcon from "@mui/icons-material/Email";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import LockIcon from "@mui/icons-material/Lock";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import {
    Alert,
    Box,
    Button,
    Divider,
    IconButton,
    InputAdornment,
    Paper,
    TextField,
    Typography,
} from "@mui/material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      setError("Completá todos los campos.");
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 400)); // simula latencia
    const result = login(form);
    setLoading(false);
    if (result.success) navigate("/home");
    else setError(result.error);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
        background: "linear-gradient(135deg, #0A2540 0%, #0F3052 50%, #0A2540 100%)",
        p: 2,
      }}
    >
      <Paper
        elevation={0}
        sx={{
          width: "100%", maxWidth: 420, bgcolor: "rgba(15,48,82,0.85)",
          backdropFilter: "blur(16px)", border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: 4, p: 4,
        }}
      >
        {/* Logo */}
        <Box sx={{ textAlign: "center", mb: 4 }}>
          <Box
            sx={{
              width: 56, height: 56, borderRadius: 3, bgcolor: "#00AEEF",
              display: "inline-flex", alignItems: "center", justifyContent: "center", mb: 2,
            }}
          >
            <EmojiEventsIcon sx={{ color: "#fff", fontSize: 28 }} />
          </Box>
          <Typography variant="h5" fontWeight={800} color="#fff">
            StadiumMap 2026
          </Typography>
          <Typography variant="body2" color="rgba(255,255,255,0.45)" mt={0.5}>
            FIFA World Cup • Estadios & Sedes
          </Typography>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 2, bgcolor: "rgba(211,47,47,0.15)", color: "#ff8a80", border: "1px solid rgba(211,47,47,0.3)" }}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField
            name="email" type="email" label="Correo electrónico" value={form.email}
            onChange={handleChange} fullWidth autoComplete="email"
            InputProps={{
              startAdornment: <InputAdornment position="start"><EmailIcon sx={{ color: "rgba(255,255,255,0.4)", fontSize: 20 }} /></InputAdornment>,
            }}
            sx={inputSx}
          />
          <TextField
            name="password" type={showPass ? "text" : "password"} label="Contraseña"
            value={form.password} onChange={handleChange} fullWidth
            InputProps={{
              startAdornment: <InputAdornment position="start"><LockIcon sx={{ color: "rgba(255,255,255,0.4)", fontSize: 20 }} /></InputAdornment>,
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPass((p) => !p)} edge="end" sx={{ color: "rgba(255,255,255,0.4)" }}>
                    {showPass ? <VisibilityOffIcon fontSize="small" /> : <VisibilityIcon fontSize="small" />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={inputSx}
          />

          <Button
            type="submit" fullWidth variant="contained" disabled={loading}
            sx={{
              mt: 1, py: 1.4, borderRadius: 2, fontWeight: 700, fontSize: 15,
              bgcolor: "#00AEEF", "&:hover": { bgcolor: "#0098d4" },
              textTransform: "none",
            }}
          >
            {loading ? "Ingresando..." : "Iniciar Sesión"}
          </Button>
        </Box>

        <Divider sx={{ my: 2.5, borderColor: "rgba(255,255,255,0.08)" }} />

        <Typography variant="body2" color="rgba(255,255,255,0.45)" textAlign="center">
          ¿No tenés cuenta?{" "}
          <Link to="/register" style={{ color: "#00AEEF", textDecoration: "none", fontWeight: 600 }}>
            Registrate
          </Link>
        </Typography>

        {/* Hint credenciales */}
        <Box sx={{ mt: 2.5, p: 1.5, bgcolor: "rgba(0,174,239,0.07)", borderRadius: 2, border: "1px solid rgba(0,174,239,0.2)" }}>
          <Typography variant="caption" color="rgba(255,255,255,0.5)" display="block">
            Demo: <strong style={{ color: "#00AEEF" }}>admin@mundial.com</strong> / admin123
          </Typography>
          <Typography variant="caption" color="rgba(255,255,255,0.5)">
            User: <strong style={{ color: "#00AEEF" }}>fan@mundial.com</strong> / fan123
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
}

const inputSx = {
  "& .MuiOutlinedInput-root": {
    bgcolor: "rgba(10,37,64,0.6)",
    borderRadius: 2,
    "& fieldset": { borderColor: "rgba(255,255,255,0.1)" },
    "&:hover fieldset": { borderColor: "rgba(0,174,239,0.4)" },
    "&.Mui-focused fieldset": { borderColor: "#00AEEF" },
  },
  "& .MuiInputLabel-root": { color: "rgba(255,255,255,0.4)" },
  "& .MuiInputLabel-root.Mui-focused": { color: "#00AEEF" },
  "& .MuiOutlinedInput-input": { color: "#fff" },
};
