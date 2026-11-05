"use client";
import Link from "next/link";
import { useApi } from "@/lib/hooks";
import EventGrid from "../EventGrid";

export default function UpcomingSection() {
  const { data, loading, error } = useApi("/events?limit=6");
  return (
    <section className="section border-y border-base-300 bg-base-200">
      <div className="wrap">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="section-title">Happening soon</h2>
            <p className="section-sub">The next six events, soonest first.</p>
          </div>
          <Link href="/events" className="btn btn-primary">View All Events</Link>
        </div>
        <div className="mt-10">
          <EventGrid
            events={data}
            loading={loading}
            error={error}
            empty={<><p className="font-display text-xl font-bold">Nothing planned yet</p><Link href="/create-event" className="btn btn-primary mt-4">Create Event</Link></>}
          />
        </div>
      </div>
    </section>
  );
}
