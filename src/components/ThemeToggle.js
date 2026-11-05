"use client";
import { useEffect, useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa6";

export default function ThemeToggle() {
  const [dark, setDark] = useState(false);
  useEffect(() => setDark(document.documentElement.dataset.theme === "pashe-dark"), []);
  const toggle = () => {
    const next = dark ? "pashe" : "pashe-dark";
    document.documentElement.dataset.theme = next;
    try { localStorage.setItem("theme", next); } catch {}
    setDark(!dark);
  };
  return (
    <button onClick={toggle} className="btn btn-ghost btn-circle" aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}>
      {dark ? <FaSun size={18} /> : <FaMoon size={18} />}
    </button>
  );
}
