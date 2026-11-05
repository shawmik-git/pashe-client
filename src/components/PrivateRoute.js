"use client";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

// Waits for the session check to finish, so a reload never bounces a logged-in user to Login.
export default function PrivateRoute({ children }) {
  const { data, isPending } = authClient.useSession();
  const router = useRouter();
  const path = usePathname();
  useEffect(() => {
    if (!isPending && !data) router.replace(`/login?next=${encodeURIComponent(path)}`);
  }, [isPending, data, path, router]);
  if (isPending || !data) {
    return <div className="grid min-h-[60vh] place-items-center"><span className="loading loading-ring loading-lg text-primary" /></div>;
  }
  return children;
}
