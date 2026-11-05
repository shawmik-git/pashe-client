"use client";
const FALLBACK =
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='640' height='400'><rect width='100%25' height='100%25' fill='%23d6e2db'/></svg>";

// Event photo that falls back to a plain tile when the URL is broken.
export default function Thumb({ src, alt = "", className = "" }) {
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      className={`size-full object-cover ${className}`}
      onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = FALLBACK; }}
    />
  );
}
