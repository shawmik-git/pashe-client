"use client";
import EventCard from "./EventCard";

function Grid({ children }) {
  return <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{children}</div>;
}

export function EventSkeleton() {
  return (
    <div className="overflow-hidden rounded-box border border-base-300">
      <div className="skeleton aspect-[16/10] w-full rounded-none" />
      <div className="space-y-3 p-5">
        <div className="skeleton h-5 w-20" />
        <div className="skeleton h-6 w-full" />
        <div className="skeleton h-4 w-2/3" />
        <div className="skeleton h-4 w-1/2" />
        <div className="skeleton h-10 w-full" />
      </div>
    </div>
  );
}

export default function EventGrid({ events, loading, error, empty, count = 6 }) {
  if (error) return <div role="alert" className="alert alert-error alert-soft">{error}</div>;
  if (loading) return <Grid>{Array.from({ length: count }, (_, i) => <EventSkeleton key={i} />)}</Grid>;
  if (!events?.length) return <div className="rounded-box border border-dashed border-base-300 p-10 text-center">{empty}</div>;
  return <Grid>{events.map((e) => <EventCard key={e._id} event={e} />)}</Grid>;
}
