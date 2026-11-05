"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import EventGrid from "@/components/EventGrid";
import { useApi } from "@/lib/hooks";
import { EVENT_TYPES } from "@/lib/utils";

export default function EventsPage() {
  const [search, setSearch] = useState("");
  const [q, setQ] = useState("");
  const [type, setType] = useState("");
  useEffect(() => {
    const t = setTimeout(() => setQ(search.trim()), 350);
    return () => clearTimeout(t);
  }, [search]);

  const qs = new URLSearchParams({ ...(q && { search: q }), ...(type && { type }) }).toString();
  const { data, loading, error } = useApi(`/events${qs ? `?${qs}` : ""}`);

  return (
    <div className="wrap py-12">
      <h1 className="section-title">Upcoming events</h1>
      <p className="section-sub">Every event below is still to come. Past events are removed automatically.</p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <label className="input w-full sm:max-w-sm">
          <FaMagnifyingGlass className="opacity-60" />
          <input type="search" placeholder="Search by title or area" value={search} onChange={(e) => setSearch(e.target.value)} aria-label="Search events" />
        </label>
        <select className="select w-full sm:w-52" value={type} onChange={(e) => setType(e.target.value)} aria-label="Filter by type">
          <option value="">All types</option>
          {EVENT_TYPES.map((t) => <option key={t}>{t}</option>)}
        </select>
      </div>
      <div className="mt-8">
        <EventGrid
          events={data}
          loading={loading}
          error={error}
          empty={<><p className="font-display text-xl font-bold">{q || type ? "No events match your search" : "No upcoming events yet"}</p><Link href="/create-event" className="btn btn-primary mt-4">Create Event</Link></>}
        />
      </div>
    </div>
  );
}
