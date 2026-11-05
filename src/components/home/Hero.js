"use client";
import Link from "next/link";
import { FaCalendarDays, FaLocationDot } from "react-icons/fa6";
import { useApi } from "@/lib/hooks";
import { fmtDate } from "@/lib/utils";
import Thumb from "../Thumb";

// The soonest upcoming event, shown as a ticket. Pulled live from the API.
function Ticket({ event, loading }) {
  return (
    <div className="relative mx-auto w-full max-w-sm lg:mr-0">
      <div className="absolute -right-8 -top-8 size-44 rounded-full bg-secondary" aria-hidden />
      <div className="relative rotate-2 overflow-hidden rounded-box border border-base-content/20 bg-base-100">
        {loading ? (
          <div className="skeleton h-96 w-full rounded-none" />
        ) : event ? (
          <>
            <div className="relative aspect-[16/10]">
              <Thumb src={event.thumbnail} alt={event.title} />
              <span className="badge badge-secondary absolute left-3 top-3">Next up</span>
            </div>
            <div className="space-y-2 p-5">
              <h2 className="line-clamp-2 font-display text-2xl font-bold leading-snug">{event.title}</h2>
              <p className="flex items-center gap-2 text-sm text-base-content/75"><FaLocationDot className="text-primary" />{event.location}</p>
              <p className="flex items-center gap-2 text-sm text-base-content/75"><FaCalendarDays className="text-primary" />{fmtDate(event.eventDate)}</p>
            </div>
            <div className="relative border-t-2 border-dashed border-base-content/25 p-5">
              <span className="absolute -left-3 -top-3 size-6 rounded-full bg-base-200" aria-hidden />
              <span className="absolute -right-3 -top-3 size-6 rounded-full bg-base-200" aria-hidden />
              <Link href={`/events/${event._id}`} className="btn btn-primary w-full">View Event</Link>
            </div>
          </>
        ) : (
          <div className="space-y-3 p-8 text-center">
            <h2 className="font-display text-2xl font-bold">No events yet</h2>
            <p className="text-base-content/70">Be the first to organise something in your area.</p>
            <Link href="/create-event" className="btn btn-primary">Create Event</Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default function Hero() {
  const { data, loading } = useApi("/events?limit=1");
  return (
    <section className="overflow-hidden border-b border-base-300 bg-base-200">
      <div className="wrap grid items-center gap-14 py-16 md:py-24 lg:grid-cols-[1.15fr_1fr]">
        <div>
          <h1 className="font-display text-5xl font-extrabold leading-[1.02] tracking-tight md:text-7xl">Show up for your neighbourhood.</h1>
          <p className="mt-6 max-w-lg text-lg text-base-content/75">
            Find a winter clothes drive, a tree planting or a blood donation camp near you. Join in one click, or start one of your own.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/events" className="btn btn-primary btn-lg">Browse Events</Link>
            <Link href="/create-event" className="btn btn-outline btn-lg">Create Event</Link>
          </div>
        </div>
        <Ticket event={data?.[0]} loading={loading} />
      </div>
    </section>
  );
}
