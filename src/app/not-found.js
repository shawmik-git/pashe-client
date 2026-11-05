import Link from "next/link";

export default function NotFound() {
  return (
    <div className="wrap grid min-h-[60vh] place-content-center gap-4 text-center">
      <h1 className="section-title">This page doesn’t exist</h1>
      <p className="text-base-content/70">The link may be old, or the event may have been deleted.</p>
      <div><Link href="/events" className="btn btn-primary">See Upcoming Events</Link></div>
    </div>
  );
}
