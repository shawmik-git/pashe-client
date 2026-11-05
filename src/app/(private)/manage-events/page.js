"use client";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaPenToSquare, FaTrash } from "react-icons/fa6";
import EventForm from "@/components/EventForm";
import Modal from "@/components/Modal";
import Thumb from "@/components/Thumb";
import { api } from "@/lib/api";
import { useApi } from "@/lib/hooks";
import { fmtDate, isPast } from "@/lib/utils";

export default function ManageEventsPage() {
  const { data, loading, error, reload } = useApi("/my-events", true);
  const [editing, setEditing] = useState(null);
  const [deleting, setDeleting] = useState(null);
  const [busy, setBusy] = useState(false);

  const update = async (body) => {
    await api(`/events/${editing._id}`, { method: "PUT", body, auth: true });
    toast.success("Event updated.");
    setEditing(null);
    reload();
  };
  const remove = async () => {
    setBusy(true);
    try {
      await api(`/events/${deleting._id}`, { method: "DELETE", auth: true });
      toast.success("Event deleted.");
      setDeleting(null);
      reload();
    } catch (e) {
      toast.error(e.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="wrap py-12">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="section-title">Manage your events</h1>
          <p className="section-sub">Update or delete the events you created.</p>
        </div>
        <Link href="/create-event" className="btn btn-primary">Create Event</Link>
      </div>

      <div className="mt-8">
        {error ? (
          <div role="alert" className="alert alert-error alert-soft">{error}</div>
        ) : loading ? (
          <div className="space-y-3">{[0, 1, 2, 3].map((i) => <div key={i} className="skeleton h-16 w-full" />)}</div>
        ) : !data?.length ? (
          <div className="rounded-box border border-dashed border-base-300 p-10 text-center">
            <p className="font-display text-xl font-bold">You haven’t created an event yet</p>
            <Link href="/create-event" className="btn btn-primary mt-4">Create Event</Link>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-box border border-base-300">
            <table className="table">
              <thead>
                <tr><th>Event</th><th>Type</th><th>Date</th><th>Joined</th><th className="text-right">Actions</th></tr>
              </thead>
              <tbody>
                {data.map((e) => (
                  <tr key={e._id}>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="h-12 w-16 shrink-0 overflow-hidden rounded-lg bg-base-300"><Thumb src={e.thumbnail} alt="" /></div>
                        <div className="min-w-40">
                          <Link href={`/events/${e._id}`} className="font-semibold hover:text-primary">{e.title}</Link>
                          <p className="text-sm text-base-content/60">{e.location}</p>
                        </div>
                      </div>
                    </td>
                    <td><span className="badge badge-secondary whitespace-nowrap">{e.eventType}</span></td>
                    <td className="whitespace-nowrap">{fmtDate(e.eventDate)} {isPast(e.eventDate) && <span className="badge badge-ghost ml-1">Ended</span>}</td>
                    <td>{e.participants ?? 0}</td>
                    <td>
                      <div className="flex justify-end gap-2">
                        <button className="btn btn-sm btn-primary" onClick={() => setEditing(e)}><FaPenToSquare /> Update</button>
                        <button className="btn btn-sm btn-error btn-outline" onClick={() => setDeleting(e)}><FaTrash /> Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <Modal open={!!editing} onClose={() => setEditing(null)} title="Update event" wide>
        {editing && <EventForm initial={editing} submitLabel="Save Changes" onSubmit={update} onCancel={() => setEditing(null)} />}
      </Modal>
      <Modal open={!!deleting} onClose={() => setDeleting(null)} title="Delete this event?">
        <p className="text-base-content/75">
          “{deleting?.title}” will be removed for everyone who joined it. This can’t be undone.
        </p>
        <div className="mt-6 flex justify-end gap-3">
          <button className="btn btn-ghost" onClick={() => setDeleting(null)}>Keep Event</button>
          <button className="btn btn-error" onClick={remove} disabled={busy}>{busy && <span className="loading loading-spinner" />}Delete Event</button>
        </div>
      </Modal>
    </div>
  );
}
