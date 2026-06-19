import { useState, useEffect, useCallback } from "react";

/**
 * Custom Hook: useFetch
 * Simula consumo de API REST usando localStorage como base de datos.
 * En producción, reemplazar fetchFn por llamadas reales a Flask.
 */
export function useFetch(fetchFn, deps = []) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const execute = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // Simula latencia de red
      await new Promise((r) => setTimeout(r, 300));
      const result = await fetchFn();
      setData(result);
    } catch (err) {
      setError(err.message || "Error al cargar datos");
    } finally {
      setLoading(false);
    }
  }, deps); // eslint-disable-line

  useEffect(() => {
    execute();
  }, [execute]);

  return { data, loading, error, refetch: execute };
}

/**
 * Custom Hook: useStadiumCRUD
 * Gestiona operaciones CRUD sobre estadios usando localStorage.
 * Simula una API REST Flask en el frontend.
 */
export function useStadiumCRUD(initialData) {
  const STORAGE_KEY = "stadiummap_stadiums";

  const getAll = () => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored);
    // Primera vez: cargar datos iniciales
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialData));
    return initialData;
  };

  const [stadiums, setStadiums] = useState(getAll);

  const save = (list) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    setStadiums(list);
  };

  const create = (stadium) => {
    const all = getAll();
    const newStadium = { ...stadium, id: Date.now() };
    save([...all, newStadium]);
    return newStadium;
  };

  const update = (id, data) => {
    const updated = getAll().map((s) => (s.id === id ? { ...s, ...data } : s));
    save(updated);
  };

  const remove = (id) => {
    const filtered = getAll().filter((s) => s.id !== id);
    save(filtered);
  };

  const getById = (id) => getAll().find((s) => s.id === id);

  return { stadiums, create, update, remove, getById, refetch: () => setStadiums(getAll()) };
}
