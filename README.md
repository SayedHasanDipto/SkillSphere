# SkillSphere 🎓

A modern online learning platform built with **Next.js 15**, **Tailwind CSS v4**, **DaisyUI 5**, and **BetterAuth**.

---

## ✨ Features

- 🔐 **Authentication** — Email/password + Google OAuth via BetterAuth
- 📚 **8 Courses** across Development, Design, Data Science, Marketing, Security, Cloud
- 🔒 **Protected Routes** — Course details require login; redirects back after auth
- 🔍 **Search & Filter** — Search by title, filter by category & level on All Courses page
- 👤 **My Profile** — View & update name/photo URL
- 🎨 **Hero Slider** — Auto-cycling banner with smooth transitions
- 🔥 **Trending Section** — New releases and trending courses
- 💡 **Learning Tips** — Study technique cards
- 🏆 **Top Instructors** — Instructor showcase cards
- 🍞 **Toast Notifications** — Success/error feedback throughout
- 📱 **Responsive** — Mobile-first navbar with hamburger menu
- 🚫 **404 Page** — Custom not-found page
- 🌑 **Dark Theme** — Premium dark mode with amber accents

---

## 🚀 Getting Started

### 1. Install Dependencies

```bash
cd skillsphere
npm install
```

### 2. Set Up Environment Variables

```bash
cp .env.local.example .env.local
```

Edit `.env.local`:

```env
NEXT_PUBLIC_APP_URL=http://localhost:3000
BETTER_AUTH_SECRET=your-super-secret-key-at-least-32-chars
BETTER_AUTH_URL=http://localhost:3000

# Google OAuth (get from console.cloud.google.com)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Database
DATABASE_URL=file:./dev.db
```

### 3. Set Up Database

BetterAuth with SQLite (default for development):

```bash
npx better-auth migrate
```

For PostgreSQL, update `DATABASE_URL` and the adapter in `lib/auth.js`:

```js
import { betterAuth } from "better-auth";
import { Pool } from "pg";

export const auth = betterAuth({
  database: new Pool({ connectionString: process.env.DATABASE_URL }),
  // ...
});
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) 🎉

---

## 📁 Project Structure

```
skillsphere/
├── app/
│   ├── layout.js              # Root layout (AuthProvider, Navbar, Footer, Toaster)
│   ├── page.js                # Home page (hero, popular, trending, tips, instructors)
│   ├── globals.css            # Global styles + Google Fonts
│   ├── not-found.js           # 404 page
│   ├── api/
│   │   └── auth/[...all]/     # BetterAuth API handler
│   ├── auth/
│   │   ├── login/page.js      # Login page
│   │   └── register/page.js   # Register page
│   ├── courses/
│   │   ├── page.js            # All courses (search + filter)
│   │   └── [id]/page.js       # Course detail (protected)
│   ├── my-profile/page.js     # Profile page (protected)
│   └── update-profile/page.js # Update name & photo (protected)
├── components/
│   ├── Navbar.js              # Sticky navbar with auth state
│   ├── Footer.js              # Footer with links & social
│   ├── CourseCard.js          # Reusable course card
│   └── Loader.js              # Spinner component
├── data/
│   └── courses.js             # 8 courses + 4 instructors data
├── lib/
│   ├── auth.js                # BetterAuth server config
│   ├── auth-client.js         # BetterAuth client singleton
│   └── auth-context.js        # React auth context (useAuth hook)
├── .env.local.example         # Environment template
├── next.config.mjs
├── tailwind.config.js
└── postcss.config.mjs
```

---

## 🎨 Tech Stack

| Tool | Purpose |
|------|---------|
| **Next.js 15** | App Router, SSR, file-based routing |
| **Tailwind CSS v4** | Utility-first styling |
| **DaisyUI 5** | Component library (custom `skillsphere` theme) |
| **BetterAuth** | Auth (email/password + Google OAuth) |
| **react-hot-toast** | Toast notifications |
| **react-icons** | Icon library |

---

## 🔑 BetterAuth Setup Notes

### Google OAuth

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create OAuth 2.0 credentials
3. Add `http://localhost:3000/api/auth/callback/google` as an authorized redirect URI
4. Copy Client ID and Secret to `.env.local`

### Update User (Challenge #3)

The update profile page uses:
```js
await authClient.updateUser({ name, image });
```
Per [BetterAuth docs](https://better-auth.com/docs/concepts/users-accounts#update-user).

---

## 🏆 Challenges Implemented

- ✅ **Search Functionality** — Real-time search by course title on /courses
- ✅ **My Profile Page** — Shows user data, enrolled courses (demo), stats
- ✅ **Update Information** — `/update-profile` with name & image URL fields
- ✅ **npm Package** — `motion` package installed (can use for animations)

---

## 🚀 Deployment

Deploy on [Vercel](https://vercel.com):

```bash
npm run build
```

Add all environment variables in Vercel dashboard. Use PostgreSQL (Vercel Postgres, Neon, or Supabase) for production database.

---

## 📝 Notes

- Email verification is intentionally disabled for examiner convenience
- Forgot password flow is not implemented (can be added post-evaluation)
- Enrolled courses on profile page use demo data (first 3 courses)
