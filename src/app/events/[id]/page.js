"use client";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaCalendarDays, FaLocationDot, FaUser, FaUsers } from "react-icons/fa6";
import Thumb from "@/components/Thumb";
import { api } from "@/lib/api";
import { authClient } from "@/lib/auth-client";
import { useApi } from "@/lib/hooks";
import { fmtDate, isPast } from "@/lib/utils";

function DetailsSkeleton() {
  return (
    <div className="wrap grid gap-10 py-10 lg:grid-cols-[1.6fr_1fr]">
      <div className="space-y-4"><div className="skeleton aspect-[16/9] w-full" /><div className="skeleton h-10 w-3/4" /><div className="skeleton h-24 w-full" /></div>
      <div className="skeleton h-72 w-full" />
    </div>
  );
}

export default function EventDetails() {
  const { id } = useParams();
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const { data: ev, loading, error, reload } = useApi(`/events/${id}`);
  const joinedQ = useApi(session ? `/events/${id}/joined` : null, true);
  const [busy, setBusy] = useState(false);

  const join = async () => {
    if (!session) {
      toast.error("Log in to join this event.");
      return router.push(`/login?next=/events/${id}`);
    }
    setBusy(true);
    try {
      await api(`/events/${id}/join`, { method: "POST", auth: true });
      toast.success("You’re in! See you there.");
      reload();
      joinedQ.reload();
    } catch (e) {
      toast.error(e.message);
    } finally {
      setBusy(false);
    }
  };

  if (loading) return <DetailsSkeleton />;
  if (error) {
    return (
      <div className="wrap py-16">
        <div role="alert" className="alert alert-error alert-soft">{error}</div>
        <Link href="/events" className="btn btn-primary mt-6">Back to Upcoming Events</Link>
      </div>
    );
  }
  const ended = isPast(ev.eventDate);
  const joined = joinedQ.data?.joined;
  const rows = [
    [FaLocationDot, "Where", ev.location],
    [FaCalendarDays, "When", fmtDate(ev.eventDate)],
    [FaUsers, "Joined so far", `${ev.participants ?? 0} ${ev.participants === 1 ? "person" : "people"}`],
    [FaUser, "Organiser", ev.creatorName],
  ];

  return (
    <article className="wrap grid gap-10 py-10 lg:grid-cols-[1.6fr_1fr]">
      <div>
        <div className="aspect-[16/9] overflow-hidden rounded-box bg-base-300"><Thumb src={ev.thumbnail} alt={ev.title} /></div>
        <div className="mt-6 flex gap-2">
          <span className="badge badge-secondary">{ev.eventType}</span>
          {ended && <span className="badge badge-ghost">Ended</span>}
        </div>
        <h1 className="section-title mt-3">{ev.title}</h1>
        <p className="mt-5 max-w-prose whitespace-pre-line text-lg leading-relaxed text-base-content/80">{ev.description}</p>
      </div>
      <aside className="h-fit rounded-box border border-base-300 bg-base-100 p-6 lg:sticky lg:top-24">
        <h2 className="font-display text-xl font-bold">Event details</h2>
        <ul className="mt-4 space-y-4">
          {rows.map(([Icon, label, value]) => (
            <li key={label} className="flex gap-3">
              <Icon className="mt-1 shrink-0 text-primary" />
              <div><p className="text-sm text-base-content/60">{label}</p><p className="font-medium">{value}</p></div>
            </li>
          ))}
        </ul>
        <button className="btn btn-primary mt-6 w-full" onClick={join} disabled={busy || ended || joined}>
          {busy && <span className="loading loading-spinner" />}
          {ended ? "This event has ended" : joined ? "You’ve joined this event" : "Join Event"}
        </button>
        {!session && !ended && <p className="mt-3 text-center text-sm text-base-content/60">You’ll be asked to log in first.</p>}
      </aside>
    </article>
  );
}
