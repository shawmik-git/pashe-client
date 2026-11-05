import Link from "next/link";
import { FaFacebookF, FaGithub, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";
import Logo from "./Logo";

const socials = [
  [FaXTwitter, "X", "https://x.com"],
  [FaFacebookF, "Facebook", "https://facebook.com"],
  [FaLinkedinIn, "LinkedIn", "https://linkedin.com"],
  [FaGithub, "GitHub", "https://github.com"],
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-neutral text-neutral-content">
      <div className="wrap relative z-10 grid gap-10 pb-6 pt-14 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <Logo className="text-3xl" />
          <p className="mt-4 max-w-xs text-neutral-content/75">
            Pashe means “by your side”. We help neighbours find, join and organise social service events across Bangladesh.
          </p>
          <div className="mt-5 flex gap-2">
            {socials.map(([Icon, label, href]) => (
              <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label} className="btn btn-circle btn-sm border-neutral-content/30 bg-transparent text-neutral-content hover:bg-secondary hover:text-secondary-content">
                <Icon size={14} />
              </a>
            ))}
          </div>
        </div>
        <FooterCol title="Explore" links={[["/", "Home"], ["/events", "Upcoming Events"], ["/login", "Login"], ["/register", "Register"]]} />
        <FooterCol title="Get involved" links={[["/create-event", "Create Event"], ["/manage-events", "Manage Events"], ["/joined-events", "Joined Events"]]} />
        <div>
          <h3 className="font-display text-lg font-bold">Find us</h3>
          <p className="mt-3 text-neutral-content/75">Dhaka, Bangladesh</p>
          <p className="mt-1 text-neutral-content/75">Made for neighbours who show up.</p>
        </div>
      </div>
      <p aria-hidden className="pointer-events-none -mb-[3vw] select-none text-center font-display text-[24vw] font-extrabold leading-[0.8] text-secondary/20">Pashe</p>
      <div className="relative z-10 border-t border-neutral-content/15 py-4 text-center text-sm text-neutral-content/70">
        © {new Date().getFullYear()} Pashe. All rights reserved.
      </div>
    </footer>
  );
}

function FooterCol({ title, links }) {
  return (
    <div>
      <h3 className="font-display text-lg font-bold">{title}</h3>
      <ul className="mt-3 space-y-2">
        {links.map(([href, label]) => (
          <li key={href}><Link href={href} className="text-neutral-content/75 hover:text-secondary">{label}</Link></li>
        ))}
      </ul>
    </div>
  );
}
