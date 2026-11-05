import { FaHandshakeAngle, FaListCheck, FaMagnifyingGlass, FaPenToSquare } from "react-icons/fa6";

const features = [
  [FaPenToSquare, "Create an event in a minute", "Add a title, place, date and photo. Your event appears on the Upcoming Events page straight away."],
  [FaHandshakeAngle, "Join with one click", "Log in, press Join Event, and it lands in your Joined Events list, sorted by date."],
  [FaListCheck, "Manage what you host", "Update details or delete an event from a single table. Only you can change events you created."],
  [FaMagnifyingGlass, "Find a cause near you", "Search by area or filter by Cleanup, Plantation, Donation, Blood Donation and more."],
];

export default function Features() {
  return (
    <section className="section wrap">
      <h2 className="section-title">What you can do on Pashe</h2>
      <p className="section-sub">Everything a neighbourhood group needs to organise and turn up, without the group-chat chaos.</p>
      <div className="mt-10 grid gap-x-12 gap-y-10 sm:grid-cols-2">
        {features.map(([Icon, title, text]) => (
          <div key={title} className="flex gap-4">
            <span className="grid size-12 shrink-0 place-items-center rounded-box bg-primary text-primary-content"><Icon size={20} /></span>
            <div>
              <h3 className="font-display text-xl font-bold">{title}</h3>
              <p className="mt-1 text-base-content/70">{text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
