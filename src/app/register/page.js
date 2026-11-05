"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import AuthShell from "@/components/AuthShell";
import Field from "@/components/Field";
import GithubButton from "@/components/GithubButton";
import { authClient } from "@/lib/auth-client";
import { emailOk, isUrl, nextPath, passwordError } from "@/lib/utils";

export default function RegisterPage() {
  const router = useRouter();
  const [v, setV] = useState({ name: "", email: "", image: "", password: "" });
  const [errors, setErrors] = useState({});
  const [busy, setBusy] = useState(false);
  const set = (k) => (e) => setV({ ...v, [k]: e.target.value });
  const cls = (k) => `input w-full ${errors[k] ? "input-error" : ""}`;

  const submit = async (e) => {
    e.preventDefault();
    const er = {};
    if (v.name.trim().length < 2) er.name = "Enter your name.";
    if (!emailOk(v.email)) er.email = "Enter a valid email address.";
    if (!isUrl(v.image.trim())) er.image = "Enter a valid photo URL starting with http or https.";
    const pe = passwordError(v.password);
    if (pe) er.password = pe;
    setErrors(er);
    if (Object.keys(er).length) return toast.error(Object.values(er)[0]);
    setBusy(true);
    const { error } = await authClient.signUp.email({ name: v.name.trim(), email: v.email, password: v.password, image: v.image.trim() });
    setBusy(false);
    if (error) return toast.error(error.message || "Could not create your account. Try again.");
    toast.success(`Welcome to Pashe, ${v.name.trim()}!`);
    router.push(nextPath());
  };

  return (
    <AuthShell
      title="Create your account"
      sub="Join events and organise your own."
      footer={<>Already have an account? <Link href="/login" className="link link-primary font-semibold">Log in</Link></>}
    >
      <form onSubmit={submit} noValidate>
        <Field label="Name" error={errors.name}><input autoComplete="name" className={cls("name")} value={v.name} onChange={set("name")} /></Field>
        <Field label="Email" error={errors.email}><input type="email" autoComplete="email" className={cls("email")} value={v.email} onChange={set("email")} /></Field>
        <Field label="Photo URL" error={errors.image}><input className={cls("image")} value={v.image} onChange={set("image")} placeholder="https://…" /></Field>
        <Field label="Password" error={errors.password}>
          <input type="password" autoComplete="new-password" className={cls("password")} value={v.password} onChange={set("password")} />
          <p className="text-xs text-base-content/60">At least 6 characters, with one uppercase and one lowercase letter.</p>
        </Field>
        <button className="btn btn-primary mt-4 w-full" disabled={busy}>{busy && <span className="loading loading-spinner" />}Create account</button>
      </form>
      <div className="divider my-5">or</div>
      <GithubButton />
    </AuthShell>
  );
}
