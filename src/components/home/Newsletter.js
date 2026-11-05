"use client";
import toast from "react-hot-toast";

export default function Newsletter() {
  const submit = (e) => {
    e.preventDefault();
    toast.success("Thanks! We’ll send the weekend’s events to your inbox.");
    e.currentTarget.reset();
  };
  return (
    <section className="bg-secondary text-secondary-content">
      <div className="wrap grid items-center gap-8 py-16 md:grid-cols-2 md:py-20">
        <div>
          <h2 className="section-title">Get the weekend’s events in your inbox</h2>
          <p className="mt-3 max-w-md text-secondary-content/80">One short email every Thursday with the drives, camps and clean-ups near you.</p>
        </div>
        <form onSubmit={submit} className="flex flex-col gap-3 sm:flex-row">
          <input type="email" required placeholder="you@example.com" aria-label="Email address" className="input w-full bg-base-100 text-base-content" />
          <button className="btn btn-primary">Subscribe</button>
        </form>
      </div>
    </section>
  );
}
