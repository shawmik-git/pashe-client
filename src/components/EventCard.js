"use client";
import Link from "next/link";
import { FaCalendarDays, FaLocationDot, FaUsers } from "react-icons/fa6";
import { fmtDate, isPast } from "@/lib/utils";
import Thumb from "./Thumb";

export default function EventCard({ event: e }) {
  return (
    <article className="card h-full overflow-hidden border border-base-300 bg-base-100">
      <figure className="aspect-[16/10] w-full bg-base-300"><Thumb src={e.thumbnail} alt={e.title} /></figure>
      <div className="card-body flex-1 gap-3 p-5">
        <div className="flex items-center gap-2">
          <span className="badge badge-secondary">{e.eventType}</span>
          {isPast(e.eventDate) && <span className="badge badge-ghost">Ended</span>}
        </div>
        <h3 className="line-clamp-2 min-h-14 font-display text-xl font-bold leading-snug">{e.title}</h3>
        <ul className="space-y-1.5 text-sm text-base-content/75">
          <li className="flex items-center gap-2"><FaLocationDot className="shrink-0 text-primary" /><span className="line-clamp-1">{e.location}</span></li>
          <li className="flex items-center gap-2"><FaCalendarDays className="shrink-0 text-primary" />{fmtDate(e.eventDate)}</li>
          <li className="flex items-center gap-2"><FaUsers className="shrink-0 text-primary" />{e.participants ?? 0} joined</li>
        </ul>
        <Link href={`/events/${e._id}`} className="btn btn-primary mt-auto">View Event</Link>
      </div>
    </article>
  );
}
