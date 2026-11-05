# Pashe

**Live site:** https://your-pashe-site.vercel.app
**API repo:** link your `pashe-server` repository here

Pashe (“by your side”) is a community platform where neighbours create, join and track social service events: winter clothes drives, blanket distribution, tree plantations, blood donation camps and clean-ups.

## Features

- **Create events** with type, thumbnail, location and a future-only date, saved with the creator’s email
- **Upcoming Events** page that hides past events, with search by title or area and a filter by event type
- **One-click Join Event** with duplicate-join protection and a live participant count
- **Manage Events** table to update or delete only the events you created, enforced on the server through JWT checks
- **Joined Events** page sorted by event date
- **Email/password and GitHub login** with Better Auth, plus profile view and update (name and photo)
- **Light and dark theme** toggle that remembers your choice, and loading skeletons across the app
- Fully responsive layout from phone to desktop

## Tech

Next.js (App Router), DaisyUI + Tailwind CSS, Better Auth with the MongoDB adapter and JWT plugin, Express, MongoDB.

## Run locally

```bash
npm install
cp .env.example .env.local   # fill in values
npm run dev
```

Add six photos named `g1.jpg` to `g6.jpg` in `public/gallery/` for the home page gallery.

Deployment notes: set `BETTER_AUTH_URL` to your live client URL, and `CLIENT_URL` and `AUTH_URL` on the server to the same URL. For GitHub login, set the OAuth callback to `<live URL>/api/auth/callback/github`.
