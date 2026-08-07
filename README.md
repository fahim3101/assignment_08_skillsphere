<div align="center">

# 🎓 SkillSphere

**A modern, dark-themed online learning platform built with Next.js 16, featuring glassmorphism UI, secure authentication, and a full course discovery experience.**

[![Next.js](https://img.shields.io/badge/Next.js-16.2.4-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Prisma](https://img.shields.io/badge/Prisma-6.1-2D3748?style=for-the-badge&logo=prisma&logoColor=white)](https://www.prisma.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Neon-336791?style=for-the-badge&logo=postgresql&logoColor=white)](https://neon.tech/)
[![Better Auth](https://img.shields.io/badge/Better_Auth-1.2-7C3AED?style=for-the-badge)](https://www.better-auth.com/)

[Live Demo](#) · [Report Bug](#) · [Request Feature](#)

</div>

---

## 📖 About The Project

**SkillSphere** is a full-stack online learning platform that lets learners discover, browse, and explore skill-based courses across **Web Development, Design, Marketing, Data Science**, and **Security**.

The platform pairs a polished dark glassmorphism UI with a real authentication system, course filtering, instructor profiles, and authenticated course detail pages.

### ✨ Highlights

- 🌓 **Dark glassmorphism UI** — gradient borders, blur cards, animated hero, and subtle motion
- 🧭 **Course discovery** — featured, trending, and "new" course sections on the homepage
- 🔎 **Search & filter** — full course catalog with category and level filters
- 🔐 **Authentication** — email/password & Google OAuth powered by [Better Auth](https://www.better-auth.com/)
- 👤 **User profile** — view and update personal info (name, photo URL)
- 🛡️ **Protected routes** — course detail pages require an active session
- 📱 **Fully responsive** — mobile, tablet, and desktop breakpoints
- ⚡ **Optimized images** — `next/image` with proper `sizes` for every breakpoint

---

## 🚀 Tech Stack

| Layer            | Technology                                           |
| ---------------- | ---------------------------------------------------- |
| Framework        | Next.js 16 (App Router)                              |
| Language         | JavaScript (React 19)                                |
| Styling          | Tailwind CSS 3.4 + DaisyUI 4                         |
| Icons            | lucide-react · react-icons                           |
| Animations       | motion (Framer Motion successor)                     |
| Carousel         | Swiper.js                                            |
| Auth             | Better Auth (email + Google OAuth)                   |
| ORM              | Prisma 6                                             |
| Database         | PostgreSQL (hosted on [Neon](https://neon.tech/))    |
| Notifications    | react-hot-toast                                      |
| Deployment       | Vercel-ready                                         |

---

## 🖼️ Screenshots

> Add screenshots here once you capture them — drop them in a `screenshots/` folder and reference like:
> `![Homepage](./screenshots/home.png)`

<!--
![Homepage](./screenshots/home.png)
![Courses](./screenshots/courses.png)
![Course Detail](./screenshots/course-detail.png)
![Login](./screenshots/login.png)
-->

---

## ⚙️ Getting Started

Follow these steps to set up SkillSphere locally.

### Prerequisites

- **Node.js** ≥ 18.17 (Node 20+ recommended)
- **npm** (or pnpm / yarn / bun)
- A **PostgreSQL** database — [Neon](https://neon.tech/) free tier works great

### 1. Clone the repository

```bash
git clone https://github.com/fahim3101/skillsphere.git
cd skillsphere
```

### 2. Install dependencies

```bash
npm install --legacy-peer-deps
```

> `--legacy-peer-deps` is required because some peer-dep ranges are tighter than what this stack currently ships.

### 3. Configure environment variables

Copy the example file and fill in your values:

```bash
cp .env.local.example .env.local
```

Then edit `.env.local`:

```env
# Better Auth
BETTER_AUTH_SECRET=            # minimum 32 chars — generate with: openssl rand -base64 32
BETTER_AUTH_URL=http://localhost:3000

# Google OAuth (from Google Cloud Console)
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...

# Neon PostgreSQL
DATABASE_URL=                  # pooled connection (use ?pgbouncer=true&sslmode=require)
DIRECT_URL=                    # direct connection (used by Prisma migrations)

# Public app URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 4. Set up the database

Generate the Prisma client and push the schema:

```bash
npx prisma generate
npx prisma db push
```

### 5. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📜 Available Scripts

| Command          | Description                                |
| ---------------- | ------------------------------------------ |
| `npm run dev`    | Start the dev server with hot reload       |
| `npm run build`  | Generate Prisma client + build for prod    |
| `npm run start`  | Start the production server                |
| `npm run lint`   | Lint with Next.js / ESLint                 |

---

## 📂 Project Structure

```
skillsphere/
├── app/                      # Next.js App Router
│   ├── api/auth/[...all]/    # Better Auth catch-all route
│   ├── courses/              # Catalog + [id] detail pages
│   ├── login/                # Sign-in page
│   ├── register/             # Sign-up page
│   ├── my-profile/           # User profile (view + update)
│   ├── layout.js             # Root layout (Navbar + Footer)
│   └── page.js               # Homepage
├── components/               # Shared UI components
│   ├── Navbar.js
│   ├── Footer.js
│   ├── CourseCard.js
│   ├── HeroSection.js
│   └── StarRating.js
├── data/
│   └── courses.js            # Static course & instructor catalog
├── lib/
│   └── auth-client.js        # Better Auth client config
├── prisma/
│   └── schema.prisma         # User / Session / Account / Verification
├── public/assets/            # Static images (logos, courses, instructors)
├── .env.local.example
└── package.json
```

---

## 🔐 Authentication

SkillSphere uses **Better Auth** with two providers:

- **Email + password** — `signIn.email` / `signUp.email`
- **Google OAuth** — `signIn.social({ provider: "google" })`

Session state is exposed via `useSession()` in client components. Protected pages (e.g. course details, profile) redirect unauthenticated users to `/login?redirect=...`.

To enable Google sign-in, create OAuth credentials at the [Google Cloud Console](https://console.cloud.google.com/apis/credentials) and add the redirect URI:

```
http://localhost:3000/api/auth/callback/google
```

---

## 🎨 Design System

- **Background** — Deep indigo/violet gradient (`#0f0c29` → `#302b63` → `#24243e`)
- **Accents** — Indigo + purple gradients
- **Typography** — [Syne](https://fonts.google.com/specimen/Syne) (display) + system sans (body)
- **Components** — Glass cards (`backdrop-blur` + translucent borders), gradient buttons, neon hover states

---

## 🚢 Deployment

The project is optimized for [Vercel](https://vercel.com/):

1. Push the repo to GitHub.
2. Import it into Vercel.
3. Add every variable from `.env.local` in **Project Settings → Environment Variables**.
4. Update `BETTER_AUTH_URL` and `NEXT_PUBLIC_APP_URL` to your production URL.
5. Run `npx prisma db push` against your production database once.

---

## 🛣️ Roadmap

- [ ] Course enrollment + progress tracking
- [ ] Server-side course data (replace `data/courses.js`)
- [ ] Reviews & ratings by authenticated users
- [ ] Instructor dashboards
- [ ] Stripe / payment integration
- [ ] Email verification flow

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the project
2. Create your feature branch (`git checkout -b feat/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feat/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

Distributed under the **MIT License**. See `LICENSE` for more information.

---

## 🙏 Acknowledgments

- [Better Auth](https://www.better-auth.com/) — modern auth for the JS ecosystem
- [Neon](https://neon.tech/) — serverless Postgres
- [Lucide](https://lucide.dev/) — beautiful icon set
- [Vercel](https://vercel.com/) — hosting & Next.js
- [shadcn / Tailwind UI](https://ui.shadcn.com/) — design inspiration

---

<div align="center">

Made with by [fahim3101](https://github.com/fahim3101)

⭐ Star this repo if you found it useful!

</div>