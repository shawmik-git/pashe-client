"use client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import EventForm from "@/components/EventForm";
import { api } from "@/lib/api";

export default function CreateEventPage() {
  const router = useRouter();
  const create = async (body) => {
    await api("/events", { method: "POST", body, auth: true });
    toast.success("Your event is live.");
    router.push("/events");
  };
  return (
    <div className="wrap max-w-3xl py-12">
      <h1 className="section-title">Create an event</h1>
      <p className="section-sub">Tell neighbours what you’re planning. The date must be in the future.</p>
      <div className="mt-8 rounded-box border border-base-300 bg-base-100 p-6">
        <EventForm submitLabel="Create Event" onSubmit={create} />
      </div>
    </div>
  );
}
