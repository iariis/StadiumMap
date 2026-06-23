import { useState, useEffect, useCallback } from "react";

const API_URL = "http://localhost:5000/api/stadiums/";

function mergeStadiumAssets(stadiums, assetsSource) {
  return stadiums.map((stadium) => {
    const assets = assetsSource.find((item) => item.id === stadium.id) || {};
    return {
      ...stadium,
      image: assets.image,
      embed3d: assets.embed3d,
    };
  });
}


export function useFetch(fetchFn, deps = []) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const execute = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      await new Promise((r) => setTimeout(r, 300));
      const result = await fetchFn();
      setData(result);
    } catch (err) {
      setError(err.message || "Error al cargar datos");
    } finally {
      setLoading(false);
    }
  }, deps); 

 

  useEffect(() => {
    execute();
  }, [execute]);

  return { data, loading, error, refetch: execute };
}


export function useStadiumCRUD(initialData) {
  const STORAGE_KEY = "stadiummap_stadiums";

  const getAll = () => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialData));
    return initialData;
  };

  const [stadiums, setStadiums] = useState(getAll);

  useEffect(() => {
    let active = true;

    fetch(API_URL)
      .then((response) => {
        if (!response.ok) {
          throw new Error("No se pudieron cargar estadios desde Flask");
        }
        return response.json();
      })
      .then((apiStadiums) => {
        if (active) {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(apiStadiums));
          setStadiums(mergeStadiumAssets(apiStadiums, initialData));
        }
      })
      .catch(() => {
        if (active) {
          setStadiums(mergeStadiumAssets(getAll(), initialData));
        }
      });

    return () => {
      active = false;
    };
  }, [initialData]);

  const save = (list) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    setStadiums(mergeStadiumAssets(list, initialData));
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

  const getById = (id) => stadiums.find((s) => s.id === id);

  return { stadiums, create, update, remove, getById, refetch: () => setStadiums(mergeStadiumAssets(getAll(), initialData)) };
}
