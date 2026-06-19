import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box, Typography, Button, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, IconButton, Tooltip, Chip, TextField,
  InputAdornment, Dialog, DialogTitle, DialogContent, DialogActions,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import StadiumModal from "../components/stadiums/StadiumModal";
import { useStadiumCRUD } from "../hooks/useStadiums";
import { STADIUMS } from "../data/stadiums";

const COUNTRY_FLAGS = { USA: "🇺🇸", México: "🇲🇽", Canadá: "🇨🇦" };

export default function AdminPage() {
  const navigate = useNavigate();
  const { stadiums, create, update, remove } = useStadiumCRUD(STADIUMS);

  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editTarget, setEditTarget] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const filtered = stadiums.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.city.toLowerCase().includes(search.toLowerCase()) ||
      s.country.toLowerCase().includes(search.toLowerCase())
  );

  const handleSave = (data) => {
    if (editTarget) update(editTarget.id, data);
    else create(data);
    setEditTarget(null);
  };

  const handleDelete = () => {
    remove(deleteTarget.id);
    setDeleteTarget(null);
  };

  const openEdit = (s) => { setEditTarget(s); setModalOpen(true); };
  const openNew = () => { setEditTarget(null); setModalOpen(true); };

  return (
    <Box>
      {/* Header */}
      <Box sx={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: 2, mb: 3 }}>
        <Box>
          <Typography variant="h5" fontWeight={800} color="#fff">
            Panel Administrador
          </Typography>
          <Typography variant="body2" color="rgba(255,255,255,0.45)">
            CRUD de Estadios — {stadiums.length} registros
          </Typography>
        </Box>
        <Button
          startIcon={<AddIcon />}
          variant="contained"
          onClick={openNew}
          sx={{
            bgcolor: "#00AEEF", "&:hover": { bgcolor: "#0098d4" },
            borderRadius: 2, textTransform: "none", fontWeight: 600,
          }}
        >
          Nuevo Estadio
        </Button>
      </Box>

      {/* Search */}
      <TextField
        size="small" placeholder="Buscar por nombre, ciudad o país..."
        value={search} onChange={(e) => setSearch(e.target.value)}
        sx={{
          mb: 2, minWidth: 280,
          "& .MuiOutlinedInput-root": {
            bgcolor: "rgba(10,37,64,0.6)", borderRadius: 2, color: "#fff",
            "& fieldset": { borderColor: "rgba(255,255,255,0.12)" },
            "&:hover fieldset": { borderColor: "rgba(0,174,239,0.4)" },
            "&.Mui-focused fieldset": { borderColor: "#00AEEF" },
          },
        }}
        InputProps={{
          startAdornment: <InputAdornment position="start"><SearchIcon sx={{ color: "rgba(255,255,255,0.4)", fontSize: 18 }} /></InputAdornment>,
        }}
      />

      {/* Table */}
      <TableContainer
        component={Paper}
        elevation={0}
        sx={{ bgcolor: "rgba(15,48,82,0.7)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 3 }}
      >
        <Table size="small">
          <TableHead>
            <TableRow sx={{ "& th": { color: "rgba(255,255,255,0.4)", fontSize: 12, fontWeight: 600, py: 1.5, borderBottom: "1px solid rgba(255,255,255,0.08)" } }}>
              <TableCell>Estadio</TableCell>
              <TableCell>Ciudad</TableCell>
              <TableCell>País</TableCell>
              <TableCell align="right">Capacidad</TableCell>
              <TableCell align="right">Año</TableCell>
              <TableCell align="right">Partidos</TableCell>
              <TableCell align="center">Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filtered.map((s) => (
              <TableRow
                key={s.id}
                sx={{
                  "&:hover": { bgcolor: "rgba(255,255,255,0.03)" },
                  "& td": { borderBottom: "1px solid rgba(255,255,255,0.05)", py: 1.2 },
                }}
              >
                <TableCell>
                  <Typography variant="body2" color="#fff" fontWeight={500}>
                    {s.name}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" color="rgba(255,255,255,0.6)">{s.city}</Typography>
                </TableCell>
                <TableCell>
                  <Chip
                    label={`${COUNTRY_FLAGS[s.country] || ""} ${s.country}`}
                    size="small"
                    sx={{ bgcolor: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.7)", fontSize: 11 }}
                  />
                </TableCell>
                <TableCell align="right">
                  <Typography variant="body2" color="rgba(255,255,255,0.6)">
                    {s.capacity.toLocaleString()}
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography variant="body2" color="rgba(255,255,255,0.6)">{s.year}</Typography>
                </TableCell>
                <TableCell align="right">
                  <Chip
                    label={s.matches}
                    size="small"
                    sx={{ bgcolor: "rgba(212,175,55,0.15)", color: "#D4AF37", fontSize: 11 }}
                  />
                </TableCell>
                <TableCell align="center">
                  <Box sx={{ display: "flex", gap: 0.5, justifyContent: "center" }}>
                    <Tooltip title="Ver detalle">
                      <IconButton size="small" onClick={() => navigate(`/estadios/${s.id}`)}
                        sx={{ color: "rgba(255,255,255,0.4)", "&:hover": { color: "#fff" } }}>
                        <OpenInNewIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Editar">
                      <IconButton size="small" onClick={() => openEdit(s)}
                        sx={{ color: "rgba(0,174,239,0.7)", "&:hover": { color: "#00AEEF" } }}>
                        <EditIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Eliminar">
                      <IconButton size="small" onClick={() => setDeleteTarget(s)}
                        sx={{ color: "rgba(244,67,54,0.6)", "&:hover": { color: "#f44336" } }}>
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {filtered.length === 0 && (
        <Typography color="rgba(255,255,255,0.4)" textAlign="center" py={4}>
          Sin resultados para "{search}"
        </Typography>
      )}

      {/* Create / Edit Modal */}
      <StadiumModal
        open={modalOpen}
        onClose={() => { setModalOpen(false); setEditTarget(null); }}
        onSave={handleSave}
        initial={editTarget}
      />

      {/* Delete Confirm Dialog */}
      <Dialog
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        PaperProps={{ sx: { bgcolor: "#0F3052", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 3, color: "#fff" } }}
      >
        <DialogTitle fontWeight={700}>Confirmar eliminación</DialogTitle>
        <DialogContent>
          <Typography color="rgba(255,255,255,0.7)">
            ¿Estás seguro de eliminar <strong>{deleteTarget?.name}</strong>? Esta acción no se puede deshacer.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2.5, gap: 1 }}>
          <Button onClick={() => setDeleteTarget(null)}
            sx={{ color: "rgba(255,255,255,0.6)", textTransform: "none" }}>
            Cancelar
          </Button>
          <Button onClick={handleDelete} variant="contained"
            sx={{ bgcolor: "#f44336", "&:hover": { bgcolor: "#d32f2f" }, borderRadius: 2, textTransform: "none" }}>
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
