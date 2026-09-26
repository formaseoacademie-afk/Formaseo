# FormaSEO Platform — Comprehensive Architecture & Security Audit

**Date:** September 2026  
**Auditor:** Antigravity Engineering (DeepMind)  
**Target:** FormaSEO.ma Production Hardening, Security, LMS Architecture & SEO  

---

## 1. Executive Summary

FormaSEO.ma is an academy web application offering SEO and Digital Marketing training in Casablanca and online. The frontend possesses an approved, high-aesthetic visual identity (Navy `#082238` & Yellow `#F5B82E`, modern Plus Jakarta Sans typography, high-converting hero carousel, and course pages).

However, the underlying technical infrastructure requires production hardening:
1. **Security Vulnerability (Critical):** Hardcoded client-side admin password checks (`admin`, `formaseo2026`, etc.) and unauthenticated admin API endpoints.
2. **Data Storage & State:** Split prototype JSON files (`data_store.json` vs `data_store_formaseo.json`) without atomic transactions, foreign keys, or database constraints.
3. **LMS Core:** Course catalog, modules, lessons, enrollments, and student progress contain placeholder functions (`getCourses() -> []`) rather than real server-side implementations.
4. **Routing:** Custom `window.location.pathname` handling rather than declarative React Router v6 with route guards.
5. **Backend Loop:** Redirection rule `/a-propos -> /a-propos` causing self-redirect danger.

This document details the current state, audited components, and the migration strategy to transform FormaSEO into a hardened, production-ready Academy & LMS platform while preserving 100% of the approved visual identity.

---

## 2. Inventory of Current Architecture

### 2.1 Existing Routes
| Route Path | Type | Current Component / Handler |
|---|---|---|
| `/` | Public | `HomePage.tsx` (Hero, Categories, Audiences, Deliverables, Curriculum, Tools, FAQ, Form) |
| `/formation-marketing-digital-casablanca` | Public | `FormationDigitalPage.tsx` |
| `/formation-seo-casablanca` | Public | `FormationSeoPage.tsx` |
| `/formation-wordpress-casablanca` | Public | `FormationWordPressPage.tsx` |
| `/programme-5-semaines` | Public | `ProgrammePage.tsx` |
| `/ressources-seo` | Public | `ResourcesPage.tsx` |
| `/a-propos` | Public | `AboutPage.tsx` |
| `/faq` | Public | `FaqPage.tsx` |
| `/contact` | Public | `ContactPage.tsx` |
| `/admin` | Admin | `AdminPage.tsx` (Direct auth gate with client password comparison) |

### 2.2 Existing Frontend Components
- **Common:**
  - `Navbar.tsx` (Navigation, Search drawer, Mobile menu drawer, Action pills)
  - `Footer.tsx` (Academy details, Links, Copyright, Legal)
  - `Logo.tsx` (Brand typography and mark)
  - `ApplicationModal.tsx` (Interactive lead/application modal with rich confirmation)
  - `SEOHead.tsx` (Helmet/DOM meta tags & JSON-LD structured data)
- **Home Components:**
  - `HeroSection.tsx` (Interactive curved dark hero canvas, vertical slide carousel, video modal)
  - `CategoryCardsSection.tsx` (SEO Débutant, SEO Avancé, SEO Business)
  - `AudiencesSection.tsx` (Entrepreneurs, Freelances, Étudiants, Dirigeants)
  - `DeliverablesSection.tsx` (Practical sites and assets built by students)
  - `CurriculumPreview.tsx` (5-week interactive syllabus preview tabs)
  - `ToolsSection.tsx` (WordPress, Search Console, GA4, Canva, RankMath)
  - `HowItWorksSection.tsx` (Pedagogical methodology)
  - `FounderSpotlight.tsx` (Instructor spotlight)
  - `FaqSection.tsx` (Accordion FAQ with schema)
  - `ApplicationFormSection.tsx` (On-page lead capture with multi-step confirmation)

### 2.3 Existing Backend API Endpoints (Express)
- `GET /api/settings` (Public)
- `PUT /api/settings` (**Unprotected!**)
- `GET /api/curriculum` (Public)
- `PUT /api/curriculum/:weekNumber` (**Unprotected!**)
- `GET /api/faqs` (Public)
- `POST /api/faqs`, `PUT /api/faqs/:id`, `DELETE /api/faqs/:id` (**Unprotected!**)
- `GET /api/enquiries` (**Unprotected!**)
- `POST /api/enquiries` (Public lead submission with basic validation)
- `PATCH /api/enquiries/:id`, `DELETE /api/enquiries/:id` (**Unprotected!**)
- `GET /api/checklist`, `POST /api/checklist`, `PATCH /api/checklist/:id`, `DELETE /api/checklist/:id` (**Unprotected!**)

---

## 3. Vulnerabilities & Problems Identified

1. **Hardcoded Admin Access:**
   - Client-side check `if (passwordInput === 'admin' || passwordInput === 'formaseo2026' || passwordInput === 'admin123')` in `AdminPage.tsx`.
   - Any visitor inspecting JavaScript bundles can extract these strings and bypass UI gating.
2. **Missing Backend Authentication & Authorization (RBAC):**
   - Direct HTTP requests via `curl` to `GET /api/enquiries` or `PUT /api/settings` return/modify sensitive candidate data without any token or cookie check.
3. **Dual Competing JSON Data Stores:**
   - `server/data_store.json` (Old prototype data) vs `server/data_store_formaseo.json` (Live academy data).
4. **LMS Stubs in API Client:**
   - Methods like `getCourses()`, `getCourseBySlug()`, `getReviews()`, `login()`, `register()` returning empty arrays or `null`.
5. **Self-Referential 301 Redirect:**
   - `app.get('/a-propos', ... => res.redirect(301, '/a-propos'))` causing circular redirect risks on specific server configs.
6. **Package & Repository Hygiene:**
   - `.gitignore` needs to explicitly ensure `.env`, `.env.*`, `node_modules/`, `dist/`, `*.log` are strictly ignored.

---

## 4. Proposed Production Architecture

### 4.1 Security & Authentication Architecture
- **Password Hashing:** `bcryptjs` (salt rounds >= 10).
- **Session / Token Layer:** Secure HTTP-only Cookie + JWT bearer with HMAC-SHA256 signature, `SameSite=Strict`, and `Secure` flags in production.
- **RBAC Server Middleware:**
  - `requireAuth`: Verifies token signature, expiration, and user existence.
  - `requireRole(roles: Role[])`: Checks user role (`SUPER_ADMIN`, `ADMIN`, `INSTRUCTOR`, `STUDENT`).
- **Rate Limiting & Input Validation:** Protect `/api/auth/login`, `/api/enquiries`, and password resets against brute-force attacks.

### 4.2 Database Schema & Entity Relationships
Unified persistence engine supporting:
- **`users`** (`id`, `email`, `password_hash`, `name`, `role`, `avatar_url`, `created_at`, `updated_at`)
- **`courses`** (`id`, `slug`, `title`, `short_desc`, `full_desc`, `category_id`, `level`, `duration_hours`, `price_mad`, `price_eur`, `thumbnail`, `published`, `created_at`)
- **`modules`** (`id`, `course_id`, `title`, `position`, `created_at`)
- **`lessons`** (`id`, `module_id`, `title`, `summary`, `content`, `video_url`, `duration_minutes`, `position`, `is_free_preview`, `created_at`)
- **`lesson_resources`** (`id`, `lesson_id`, `title`, `url`, `file_type`, `file_size`)
- **`enrollments`** (`id`, `user_id`, `course_id`, `status`, `enrolled_at`, `completed_at`)
- **`lesson_progress`** (`id`, `user_id`, `lesson_id`, `completed`, `progress_percent`, `last_watched_seconds`, `completed_at`, `updated_at`)
- **`certificates`** (`id`, `certificate_number`, `user_id`, `course_id`, `issued_at`, `verification_token`, `metadata_json`)
- **`enquiries`** (`id`, `name`, `email`, `phone`, `profile_type`, `goal`, `preferred_format`, `status`, `notes`, `created_at`)
- **`faqs`** (`id`, `question`, `answer`, `category`, `position`)
- **`settings`** (`key`, `value_json`, `updated_at`)
- **`payments`** (`id`, `user_id`, `course_id`, `amount`, `currency`, `provider`, `transaction_ref`, `status`, `created_at`)

### 4.3 Student LMS Portal (`/student/*`)
- `/student/dashboard` (Course progression overview, next lesson, active statistics)
- `/student/courses` (My enrolled courses)
- `/student/courses/:slug` (Course syllabus & module roadmap)
- `/student/courses/:slug/lesson/:lessonId` (Full video & workshop lesson player with mark-as-completed progress engine)
- `/student/progress` (Detailed analytics of completed modules)
- `/student/certificates` (Earned and verifiable completion credentials)
- `/student/profile` (Name, contact, password change)

### 4.4 Declarative React Router Architecture
- `PublicRoutes`: Accessible to all visitors.
- `StudentRoutes`: Guarded by `requireAuth` (`STUDENT`, `INSTRUCTOR`, `ADMIN`, `SUPER_ADMIN`).
- `AdminRoutes`: Guarded by `requireRole(['ADMIN', 'SUPER_ADMIN'])`.
- Public Certificate Verification: `/certificates/:certificateNumber`.

---

## 5. Migration Strategy & Risk Mitigation

| Phase | Actions | Risks & Mitigation |
|---|---|---|
| **Phase 1: Dependencies & Environment** | Install `react-router-dom`, `jsonwebtoken`, `bcryptjs`, `cookie-parser`, types. Ensure clean `.gitignore` and `.env.example`. | Zero UI impact. Validate build with `npm run build`. |
| **Phase 2: Database Layer & Data Consolidation** | Create structured database engine & migration seed with default super admin and student demo users, courses, modules, lessons, faqs, settings, and enquiries. | Backup existing JSON stores into database seed. |
| **Phase 3: Server Auth & Endpoint Protection** | Implement `/api/auth/login`, `/api/auth/register`, `/api/auth/me`, `/api/auth/logout`. Wrap all administrative and student endpoints in auth middleware. | Prevent unauthorized access. Expose public endpoints only for public data. |
| **Phase 4: Routing & Navigation Migration** | Upgrade `App.tsx` to `BrowserRouter`, `Routes`, `Route`, `Navigate`, with guarded layout components. | Preserve all canonical URLs and SEO links. |
| **Phase 5: Student LMS Portal Integration** | Implement student views adhering to the Navy & Yellow design system. | Ensure seamless responsive layout on mobile. |
| **Phase 6: Public Certificate Verification** | Add public verification page `/certificates/:certificateNumber`. | Validate cryptographic token / certificate number. |
| **Phase 7: End-to-End Build & Validation** | Run full TypeScript check and production build verification. | Guarantee zero breakage of existing features. |

---

## 6. Files Matrix

### Files to be Created:
- `/docs/ARCHITECTURE_AUDIT.md` (This document)
- `server/db_schema.sql` (Comprehensive relational schema)
- `server/database.ts` (Robust persistent database engine)
- `server/auth.ts` (Authentication & RBAC middleware)
- `server/controllers/authController.ts`
- `server/controllers/courseController.ts`
- `server/controllers/studentController.ts`
- `server/controllers/certificateController.ts`
- `src/context/AuthContext.tsx` (Client session state)
- `src/components/auth/ProtectedRoute.tsx` (Route guard)
- `src/pages/LoginPage.tsx` (Secure login view with FormaSEO styling)
- `src/pages/RegisterPage.tsx` (Student registration)
- `src/pages/student/StudentDashboardPage.tsx`
- `src/pages/student/StudentCourseViewPage.tsx`
- `src/pages/student/StudentLessonPlayerPage.tsx`
- `src/pages/student/StudentCertificatesPage.tsx`
- `src/pages/student/StudentProfilePage.tsx`
- `src/pages/CertificateVerifyPage.tsx`

### Files to be Updated:
- `package.json` (Add essential dependencies: `react-router-dom`, `jsonwebtoken`, `bcryptjs`, `cookie-parser`)
- `.gitignore` (Hardened hygiene)
- `server/index.ts` (Add auth middleware, cookie parser, new LMS routes, remove invalid redirects)
- `src/App.tsx` (React Router structure with public/student/admin routes)
- `src/services/api.ts` (Full LMS & Auth API client)
- `src/components/common/Navbar.tsx` (Dynamic User menu / Student dashboard link / Logout)
- `src/pages/AdminPage.tsx` (Connect to server auth, remove hardcoded password)
- `src/types/index.ts` (Comprehensive LMS, RBAC, Certificate, Payment types)

### Files that Must Remain Unchanged (Visual Design Integrity):
- `src/components/home/HeroSection.tsx` (Existing approved Hero styling)
- `src/components/home/CategoryCardsSection.tsx` (Existing approved Category cards)
- `src/components/home/AudiencesSection.tsx`
- `src/components/home/CurriculumPreview.tsx`
- `src/components/home/DeliverablesSection.tsx`
- `src/components/home/ToolsSection.tsx`
- `src/components/home/HowItWorksSection.tsx`
- `src/components/home/FounderSpotlight.tsx`
- `src/components/home/FaqSection.tsx`
- `src/index.css` & `tailwind.config.js`
