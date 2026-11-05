"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import AuthShell from "@/components/AuthShell";
import Field from "@/components/Field";
import GithubButton from "@/components/GithubButton";
import { authClient } from "@/lib/auth-client";
import { emailOk, nextPath } from "@/lib/utils";

export default function LoginPage() {
  const router = useRouter();
  const [v, setV] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [busy, setBusy] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    const er = {};
    if (!emailOk(v.email)) er.email = "Enter a valid email address.";
    if (!v.password) er.password = "Enter your password.";
    setErrors(er);
    if (Object.keys(er).length) return toast.error(Object.values(er)[0]);
    setBusy(true);
    const { data, error } = await authClient.signIn.email({ email: v.email, password: v.password });
    setBusy(false);
    if (error) return toast.error(error.message || "Could not log in. Check your email and password.");
    toast.success(`Welcome back, ${data.user.name}!`);
    router.push(nextPath());
  };

  return (
    <AuthShell
      title="Log in"
      sub="Welcome back. Pick up where you left off."
      footer={<>New to Pashe? <Link href="/register" className="link link-primary font-semibold">Create an account</Link></>}
    >
      <form onSubmit={submit} noValidate>
        <Field label="Email" error={errors.email}>
          <input type="email" autoComplete="email" className={`input w-full ${errors.email ? "input-error" : ""}`} value={v.email} onChange={(e) => setV({ ...v, email: e.target.value })} />
        </Field>
        <Field label="Password" error={errors.password}>
          <input type="password" autoComplete="current-password" className={`input w-full ${errors.password ? "input-error" : ""}`} value={v.password} onChange={(e) => setV({ ...v, password: e.target.value })} />
        </Field>
        <button className="btn btn-primary mt-4 w-full" disabled={busy}>{busy && <span className="loading loading-spinner" />}Log in</button>
      </form>
      <div className="divider my-5">or</div>
      <GithubButton />
    </AuthShell>
  );
}
