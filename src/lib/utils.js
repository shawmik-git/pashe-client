export const EVENT_TYPES = ["Cleanup", "Plantation", "Donation", "Food Drive", "Blood Donation", "Health Camp", "Education", "Other"];

export const fmtDate = (d) =>
  new Date(d).toLocaleString("en-GB", { weekday: "short", day: "numeric", month: "short", year: "numeric", hour: "numeric", minute: "2-digit" });
export const isPast = (d) => new Date(d) < new Date();
// Value for <input type="datetime-local"> in the user's own timezone.
export const toLocalInput = (d) => new Date(d.getTime() - d.getTimezoneOffset() * 6e4).toISOString().slice(0, 16);

export const isUrl = (s) => {
  try { return /^https?:$/.test(new URL(s).protocol); } catch { return false; }
};
export const emailOk = (s) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
export const passwordError = (p) =>
  p.length < 6 ? "Password must be at least 6 characters."
  : !/[A-Z]/.test(p) ? "Password needs at least one uppercase letter."
  : !/[a-z]/.test(p) ? "Password needs at least one lowercase letter."
  : "";

// Where to go after login (?next=/path), only same-site paths.
export const nextPath = () => {
  const n = new URLSearchParams(window.location.search).get("next");
  return n && n.startsWith("/") && !n.startsWith("//") ? n : "/";
};
