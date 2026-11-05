"use client";
import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import Avatar from "./Avatar";
import Logo from "./Logo";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const { data, isPending } = authClient.useSession();
  const router = useRouter();
  const user = data?.user;

  // Shows the welcome toast after returning from GitHub login.
  useEffect(() => {
    if (user && sessionStorage.getItem("justLoggedIn")) {
      sessionStorage.removeItem("justLoggedIn");
      toast.success(`Welcome, ${user.name}!`);
    }
  }, [user]);

  const close = () => document.activeElement?.blur();
  const logout = async () => {
    close();
    await authClient.signOut();
    toast.success("You’re logged out. See you at the next event.");
    router.push("/");
  };

  return (
    <header className="sticky top-0 z-40 border-b border-base-300 bg-base-100/90 backdrop-blur">
      <nav className="wrap navbar min-h-16 gap-2" aria-label="Main">
        <div className="flex-1 items-center gap-2 sm:gap-6">
          <Logo />
          <Link href="/" className="hidden text-sm font-medium hover:text-primary sm:block">Home</Link>
          <Link href="/events" className="text-sm font-medium hover:text-primary">Upcoming Events</Link>
        </div>
        <ThemeToggle />
        {isPending ? (
          <div className="skeleton size-9 rounded-full" />
        ) : user ? (
          <>
            <div className="tooltip tooltip-bottom" data-tip={user.name}>
              <div className="dropdown dropdown-end">
                <button tabIndex={0} className="btn btn-ghost btn-circle" aria-label="Open account menu">
                  <Avatar user={user} />
                </button>
                <ul tabIndex={0} className="menu dropdown-content z-50 mt-2 w-52 rounded-box border border-base-300 bg-base-100 p-2">
                  <li><Link href="/create-event" onClick={close}>Create Event</Link></li>
                  <li><Link href="/manage-events" onClick={close}>Manage Events</Link></li>
                  <li><Link href="/joined-events" onClick={close}>Joined Events</Link></li>
                  <li><Link href="/profile" onClick={close}>My Profile</Link></li>
                </ul>
              </div>
            </div>
            <button onClick={logout} className="btn btn-primary btn-sm sm:btn-md">Logout</button>
          </>
        ) : (
          <Link href="/login" className="btn btn-primary btn-sm sm:btn-md">Login</Link>
        )}
      </nav>
    </header>
  );
}