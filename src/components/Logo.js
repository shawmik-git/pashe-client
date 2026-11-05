import Link from "next/link";

export default function Logo({ className = "" }) {
  return (
    <Link href="/" className={`font-display text-2xl font-extrabold tracking-tight ${className}`} aria-label="Pashe home">
      Pashe<span className="text-secondary">.</span>
    </Link>
  );
}
