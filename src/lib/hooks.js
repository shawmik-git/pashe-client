"use client";
import { useCallback, useEffect, useState } from "react";
import { api } from "./api";

// Fetches `path` (skips when null). Returns { data, loading, error, reload }.
export function useApi(path, auth = false) {
  const [s, set] = useState({ data: null, loading: true, error: null });
  const load = useCallback(async () => {
    if (!path) return;
    set((p) => ({ ...p, loading: true, error: null }));
    try {
      set({ data: await api(path, { auth }), loading: false, error: null });
    } catch (e) {
      set({ data: null, loading: false, error: e.message });
    }
  }, [path, auth]);
  useEffect(() => { load(); }, [load]);
  return { ...s, reload: load };
}
