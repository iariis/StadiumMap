import { useState, useEffect } from "react";
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Button, Box, MenuItem, Typography, IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const COUNTRIES = ["USA", "México", "Canadá"];
const SURFACES = ["Césped natural", "Césped sintético"];

const EMPTY = { name: "", city: "", country: "USA", capacity: "", year: "", matches: "", surface: "Césped natural", description: "" };

export default function StadiumModal({ open, onClose, onSave, initial }) {
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setForm(initial ? { ...initial, capacity: String(initial.capacity), year: String(initial.year), matches: String(initial.matches) } : EMPTY);
    setErrors({});
  }, [initial, open]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
    setErrors((p) => ({ ...p, [name]: "" }));
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Requerido";
    if (!form.city.trim()) e.city = "Requerido";
    if (!form.capacity || isNaN(form.capacity) || Number(form.capacity) < 1000) e.capacity = "Capacidad inválida";
    if (!form.year || isNaN(form.year) || Number(form.year) < 1900) e.year = "Año inválido";
    if (!form.matches || isNaN(form.matches)) e.matches = "Requerido";
    return e;
  };

  const handleSave = () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    onSave({ ...form, capacity: Number(form.capacity), year: Number(form.year), matches: Number(form.matches) });
    onClose();
  };

  return (
    <Dialog
      open={open} onClose={onClose} maxWidth="sm" fullWidth
      PaperProps={{
        sx: {
          bgcolor: "#0F3052", border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: 3, color: "#fff",
        },
      }}
    >
      <DialogTitle sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", pb: 1 }}>
        <Typography fontWeight={700} fontSize={17}>
          {initial ? "Editar Estadio" : "Nuevo Estadio"}
        </Typography>
        <IconButton onClick={onClose} sx={{ color: "rgba(255,255,255,0.5)" }}>
          <CloseIcon fontSize="small" />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, pt: 1 }}>
        <TextField name="name" label="Nombre del estadio" value={form.name} onChange={handleChange}
          error={!!errors.name} helperText={errors.name} fullWidth sx={sx} />
        <Box sx={{ display: "flex", gap: 2 }}>
          <TextField name="city" label="Ciudad" value={form.city} onChange={handleChange}
            error={!!errors.city} helperText={errors.city} fullWidth sx={sx} />
          <TextField name="country" label="País" value={form.country} onChange={handleChange}
            select fullWidth sx={sx}>
            {COUNTRIES.map((c) => <MenuItem key={c} value={c}>{c}</MenuItem>)}
          </TextField>
        </Box>
        <Box sx={{ display: "flex", gap: 2 }}>
          <TextField name="capacity" label="Capacidad" type="number" value={form.capacity}
            onChange={handleChange} error={!!errors.capacity} helperText={errors.capacity} fullWidth sx={sx} />
          <TextField name="year" label="Año inauguración" type="number" value={form.year}
            onChange={handleChange} error={!!errors.year} helperText={errors.year} fullWidth sx={sx} />
        </Box>
        <Box sx={{ display: "flex", gap: 2 }}>
          <TextField name="matches" label="N° partidos" type="number" value={form.matches}
            onChange={handleChange} error={!!errors.matches} helperText={errors.matches} fullWidth sx={sx} />
          <TextField name="surface" label="Superficie" value={form.surface} onChange={handleChange}
            select fullWidth sx={sx}>
            {SURFACES.map((s) => <MenuItem key={s} value={s}>{s}</MenuItem>)}
          </TextField>
        </Box>
        <TextField name="description" label="Descripción" value={form.description} onChange={handleChange}
          multiline rows={2} fullWidth sx={sx} />
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 3, gap: 1 }}>
        <Button onClick={onClose} sx={{ color: "rgba(255,255,255,0.6)", textTransform: "none" }}>
          Cancelar
        </Button>
        <Button
          onClick={handleSave} variant="contained"
          sx={{ bgcolor: "#00AEEF", "&:hover": { bgcolor: "#0098d4" }, borderRadius: 2, textTransform: "none", fontWeight: 600 }}
        >
          {initial ? "Guardar cambios" : "Crear estadio"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

const sx = {
  "& .MuiOutlinedInput-root": {
    bgcolor: "rgba(10,37,64,0.6)", borderRadius: 2,
    "& fieldset": { borderColor: "rgba(255,255,255,0.12)" },
    "&:hover fieldset": { borderColor: "rgba(0,174,239,0.4)" },
    "&.Mui-focused fieldset": { borderColor: "#00AEEF" },
  },
  "& .MuiInputLabel-root": { color: "rgba(255,255,255,0.4)" },
  "& .MuiInputLabel-root.Mui-focused": { color: "#00AEEF" },
  "& .MuiOutlinedInput-input": { color: "#fff" },
  "& .MuiSelect-icon": { color: "rgba(255,255,255,0.4)" },
  "& .MuiFormHelperText-root": { color: "#ff8a80" },
};
