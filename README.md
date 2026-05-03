# 🎓 SkillSphere — Online Learning Platform

**Live URL:** [https://skillsphere.vercel.app](https://skillsphere.vercel.app)

SkillSphere is a modern, dark-themed online learning platform where users can explore and enroll in expert-led courses across Web Development, Design, Marketing, Data Science, Cybersecurity, and more.

---

## ✨ Key Features

- **Hero Slider** — Animated Swiper.js hero with 3 rotating slides
- **Popular Courses** — Top 3 highest-rated courses on the homepage
- **All Courses Page** — Full course catalog with live search & multi-filter
- **Course Details** — Protected route (login required) with curriculum
- **Authentication** — Email/password + Google OAuth via BetterAuth
- **My Profile** — View profile info and learning stats
- **Update Profile** — Change name and photo URL
- **Responsive Design** — Mobile, tablet, and desktop optimized
- **Custom Animations** — Swiper.js slider, CSS animations, hover effects
- **Toast Notifications** — react-hot-toast for all actions
- **404 Page** — Custom not-found page
- **Persistent Layout** — Navbar + Footer across all routes

---

## 🛠 Tech Stack

| Technology | Purpose |
|---|---|
| **Next.js 15** | React framework with App Router |
| **Tailwind CSS** | Utility-first styling |
| **DaisyUI** | Component library with custom theme |
| **BetterAuth** | Authentication (email + Google OAuth) |
| **Prisma** | Database ORM (SQLite) |
| **Swiper.js** | Hero banner slider |
| **react-hot-toast** | Toast notifications |
| **react-icons** | Social media icons |
| **lucide-react** | UI icons |
| **Motion** | Animation library |

---

## 🚀 Getting Started

### 1. Clone & Install

```bash
git clone https://github.com/yourusername/skillsphere.git
cd skillsphere
npm install
```

### 2. Set Up Environment Variables

Copy `.env.local.example` to `.env.local` and fill in your values:

```bash
cp .env.local.example .env.local
```

```env
BETTER_AUTH_SECRET=your_super_secret_key_minimum_32_characters
BETTER_AUTH_URL=http://localhost:3000
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
DATABASE_URL="file:./dev.db"
```

### 3. Set Up the Database

```bash
npx prisma generate
npx prisma db push
```

### 4. Add Assets

Place the following images in `public/assets/`:
- `logo-skillsphere.png`
- `hero-banner.png`
- `auth-background.png`
- `course-webdev.png`
- `course-design.png`
- `course-marketing.png`
- `course-appdev.png`
- `course-data.png`
- `course-cybersecurity.png`
- `instructor-1.png`
- `instructor-2.png`
- `instructor-3.png`

### 5. Run the App

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## 📁 Project Structure

```
skillsphere/
├── app/
│   ├── api/auth/[...all]/  # BetterAuth API handler
│   ├── courses/            # All courses page
│   ├── courses/[id]/       # Course detail (protected)
│   ├── login/              # Login page
│   ├── register/           # Register page
│   ├── my-profile/         # Profile page (protected)
│   ├── my-profile/update/  # Update profile
│   ├── not-found.js        # 404 page
│   ├── layout.js           # Root layout
│   ├── page.js             # Home page
│   └── globals.css         # Global styles
├── components/
│   ├── Navbar.js
│   ├── Footer.js
│   ├── CourseCard.js
│   ├── HeroSection.js
│   ├── StarRating.js
│   └── LoadingSpinner.js
├── data/
│   └── courses.js          # Course & instructor data
├── lib/
│   ├── auth.js             # BetterAuth server config
│   └── auth-client.js      # BetterAuth client config
├── prisma/
│   └── schema.prisma       # Database schema
├── public/
│   └── assets/             # Images
├── .env.local.example
├── next.config.js
├── tailwind.config.js
└── README.md
```

---

## 🔒 Protected Routes

The **Course Details** page (`/courses/[id]`) is protected — unauthenticated users are redirected to the login page and returned after successful login.

---

## 🌐 Deployment

Deploy to Vercel:

```bash
npm run build
vercel --prod
```

Set all `.env.local` variables in your Vercel project settings.

---

## 📦 NPM Packages Used

- `next` v15
- `better-auth` — Authentication
- `prisma` + `@prisma/client` — Database
- `swiper` — Hero slider
- `react-hot-toast` — Notifications
- `motion` — Animations
- `react-icons` — Icons
- `lucide-react` — Icons
- `tailwindcss` + `daisyui` — Styling
