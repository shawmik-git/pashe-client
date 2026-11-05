"use client";
import Link from "next/link";
import EventGrid from "@/components/EventGrid";
import { useApi } from "@/lib/hooks";

export default function JoinedEventsPage() {
  const { data, loading, error } = useApi("/joined-events", true);
  return (
    <div className="wrap py-12">
      <h1 className="section-title">Events you’ve joined</h1>
      <p className="section-sub">Sorted by event date, soonest first.</p>
      <div className="mt-8">
        <EventGrid
          events={data}
          loading={loading}
          error={error}
          empty={<><p className="font-display text-xl font-bold">You haven’t joined any events yet</p><Link href="/events" className="btn btn-primary mt-4">Browse Events</Link></>}
        />
      </div>
    </div>
  );
}
