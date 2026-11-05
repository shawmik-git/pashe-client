"use client";
import { useState } from "react";
import toast from "react-hot-toast";
import Avatar from "@/components/Avatar";
import Field from "@/components/Field";
import { authClient } from "@/lib/auth-client";
import { isUrl } from "@/lib/utils";

export default function ProfilePage() {
  const { data } = authClient.useSession();
  const user = data.user;
  const [v, setV] = useState({ name: user.name, image: user.image ?? "" });
  const [errors, setErrors] = useState({});
  const [busy, setBusy] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    const er = {};
    if (v.name.trim().length < 2) er.name = "Enter your name.";
    if (!isUrl(v.image.trim())) er.image = "Enter a valid photo URL starting with http or https.";
    setErrors(er);
    if (Object.keys(er).length) return toast.error(Object.values(er)[0]);
    setBusy(true);
    const { error } = await authClient.updateUser({ name: v.name.trim(), image: v.image.trim() });
    setBusy(false);
    error ? toast.error(error.message || "Could not update your profile.") : toast.success("Profile updated.");
  };

  return (
    <div className="wrap max-w-xl py-12">
      <h1 className="section-title">Your profile</h1>
      <div className="mt-6 flex items-center gap-4">
        <Avatar user={{ ...user, image: v.image }} size="size-20" />
        <div><p className="font-display text-xl font-bold">{user.name}</p><p className="text-base-content/70">{user.email}</p></div>
      </div>
      <form onSubmit={submit} noValidate className="mt-8 rounded-box border border-base-300 bg-base-100 p-6">
        <Field label="Name" error={errors.name}><input className={`input w-full ${errors.name ? "input-error" : ""}`} value={v.name} onChange={(e) => setV({ ...v, name: e.target.value })} /></Field>
        <Field label="Photo URL" error={errors.image}><input className={`input w-full ${errors.image ? "input-error" : ""}`} value={v.image} onChange={(e) => setV({ ...v, image: e.target.value })} /></Field>
        <button className="btn btn-primary mt-4" disabled={busy}>{busy && <span className="loading loading-spinner" />}Save Changes</button>
      </form>
    </div>
  );
}
