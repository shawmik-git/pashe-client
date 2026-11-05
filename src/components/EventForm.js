"use client";
import { useState } from "react";
import toast from "react-hot-toast";
import { EVENT_TYPES, isUrl, toLocalInput } from "@/lib/utils";
import Field from "./Field";

export default function EventForm({ initial, submitLabel, onSubmit, onCancel }) {
  const [v, setV] = useState({
    title: initial?.title ?? "",
    description: initial?.description ?? "",
    eventType: initial?.eventType ?? "",
    thumbnail: initial?.thumbnail ?? "",
    location: initial?.location ?? "",
    eventDate: initial ? toLocalInput(new Date(initial.eventDate)) : "",
  });
  const [errors, setErrors] = useState({});
  const [busy, setBusy] = useState(false);
  const set = (k) => (e) => setV({ ...v, [k]: e.target.value });
  const cls = (k, base) => `${base} w-full ${errors[k] ? `${base}-error` : ""}`;

  const check = () => {
    const er = {};
    if (v.title.trim().length < 5) er.title = "Title must be at least 5 characters.";
    if (v.description.trim().length < 20) er.description = "Describe the event in at least 20 characters.";
    if (!v.eventType) er.eventType = "Choose an event type.";
    if (!isUrl(v.thumbnail.trim())) er.thumbnail = "Enter a valid image URL starting with http or https.";
    if (v.location.trim().length < 3) er.location = "Enter where the event takes place.";
    const d = new Date(v.eventDate);
    if (!v.eventDate || isNaN(d)) er.eventDate = "Pick a date and time.";
    else if (d <= new Date() && !(initial && d.getTime() === new Date(initial.eventDate).getTime())) er.eventDate = "The event date must be in the future.";
    return er;
  };

  const submit = async (e) => {
    e.preventDefault();
    const er = check();
    setErrors(er);
    if (Object.keys(er).length) return toast.error(Object.values(er)[0]);
    setBusy(true);
    try {
      await onSubmit({ ...v, eventDate: new Date(v.eventDate).toISOString() });
    } catch (err) {
      toast.error(err.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <form onSubmit={submit} noValidate className="grid gap-x-4 sm:grid-cols-2">
      <div className="sm:col-span-2"><Field label="Event title" error={errors.title}>
        <input className={cls("title", "input")} value={v.title} onChange={set("title")} placeholder="Winter clothes distribution" />
      </Field></div>
      <Field label="Event type" error={errors.eventType}>
        <select className={cls("eventType", "select")} value={v.eventType} onChange={set("eventType")}>
          <option value="" disabled>Choose a type</option>
          {EVENT_TYPES.map((t) => <option key={t}>{t}</option>)}
        </select>
      </Field>
      <Field label="Date and time" error={errors.eventDate}>
        <input type="datetime-local" min={toLocalInput(new Date())} className={cls("eventDate", "input")} value={v.eventDate} onChange={set("eventDate")} />
      </Field>
      <div className="sm:col-span-2"><Field label="Location" error={errors.location}>
        <input className={cls("location", "input")} value={v.location} onChange={set("location")} placeholder="Mirpur 10, Dhaka" />
      </Field></div>
      <div className="sm:col-span-2"><Field label="Thumbnail image URL" error={errors.thumbnail}>
        <input className={cls("thumbnail", "input")} value={v.thumbnail} onChange={set("thumbnail")} placeholder="https://…" />
      </Field></div>
      <div className="sm:col-span-2"><Field label="Description" error={errors.description}>
        <textarea rows={5} className={cls("description", "textarea")} value={v.description} onChange={set("description")} placeholder="What will volunteers do, and what should they bring?" />
      </Field></div>
      <div className="mt-4 flex gap-3 sm:col-span-2">
        <button className="btn btn-primary" disabled={busy}>{busy && <span className="loading loading-spinner" />}{submitLabel}</button>
        {onCancel && <button type="button" className="btn btn-ghost" onClick={onCancel}>Cancel</button>}
      </div>
    </form>
  );
}
