# FORMASEO.MA — PRODUCTION SECURITY & ARCHITECTURE POLICY

This document details the security model, authentication mechanisms, authorization levels, rate limiting, and data protection policies implemented in the FormaSEO Academy platform.

---

## 1. Authentication & Session Management

### 1.1 Pure HttpOnly Cookie Architecture
- Authentication does **NOT** store JWT tokens in `localStorage` or `sessionStorage` (preventing XSS-based token theft).
- When a user logs in or registers via `/api/auth/login` or `/api/auth/register`, the server generates a signed JSON Web Token and issues a secure cookie:
  - **Cookie Name**: `formaseo_session`
  - **HttpOnly**: `true` (inaccessible to client JavaScript)
  - **SameSite**: `Lax` (protects against third-party cross-site request forgery)
  - **Secure**: `true` in production (enforces HTTPS transmission)
  - **Path**: `/`
  - **Max-Age**: 7 days
- On all client requests, the frontend sends `credentials: 'include'`.

### 1.2 JWT Secret Enforcement
- The server performs a mandatory pre-flight check at startup:
  ```typescript
  if (process.env.NODE_ENV === 'production' && !process.env.JWT_SECRET) {
    throw new Error('FATAL: JWT_SECRET environment variable is required in production');
  }
  ```
- No default fallback secret is permitted in production environments.

### 1.3 Password Hashing
- Passwords are never stored in plaintext.
- Passwords are encrypted server-side using **Bcrypt** with 10 salt rounds (`bcryptjs`).

---

## 2. Role-Based Access Control (RBAC)

Authorization is strictly enforced **on the server** via `requireAuth` and `requireRole` middleware.

| Role | Privileges |
| :--- | :--- |
| `SUPER_ADMIN` | Full control over academy settings, user management, course creation, leads CRM, payments, certificates, and system administration. |
| `ADMIN` | Management of students, courses, curriculum, enquiries CRM, and FAQs. Cannot modify system administrator permissions. |
| `INSTRUCTOR` | Management of assigned courses, lesson curriculum, and student progression reviews. |
| `STUDENT` | Access to enrolled courses, video lessons, downloadable resources, certificate generation, and personal profile. |

---

## 3. CSRF (Cross-Site Request Forgery) Protection

- All state-changing HTTP requests (`POST`, `PUT`, `PATCH`, `DELETE`) are screened by the `requireCsrf` middleware.
- The client API layer automatically attaches the standard security header:
  ```http
  X-Requested-With: XMLHttpRequest
  ```
- Browser cross-origin requests cannot set custom headers without passing CORS pre-flight checks, protecting cookie-authenticated endpoints from CSRF exploits.

---

## 4. Rate Limiting & Denial-of-Service Defense

Using `express-rate-limit`, the server applies tiered protection:

1. **Authentication Endpoints (`/api/auth/*`)**:
   - Limit: **15 requests per 15 minutes** per IP address.
   - Prevents brute-force credential stuffing and password-guessing attacks.
2. **Lead & Contact Forms (`/api/enquiries`)**:
   - Limit: **10 submissions per 15 minutes** per IP address.
   - Mitigates automated form spam and CRM pollution.
3. **General API Endpoints (`/api/*`)**:
   - Limit: **200 requests per 15 minutes** per IP.

---

## 5. Input Validation with Zod

Every state-changing API request is validated against strict Zod schemas before reaching business logic:

- `loginSchema`: Validates email syntax and presence of credentials.
- `registerSchema`: Requires valid email, minimum 6-character password, and minimum 2-character name.
- `profileSchema`: Sanitizes name, phone, and limits bio length (1000 chars max).
- `passwordChangeSchema`: Requires valid current password and minimum 6-character new password.
- `enquirySchema`: Validates contact parameters (name, email, phone).
- `progressSchema`: Enforces valid IDs, boolean completion state, and 0–100 progress percent.
- `checkoutSchema` & `verifyPaymentSchema`: Enforces required course IDs and transaction references.

---

## 6. Database Security & SQL Injection Protection

- Relational persistence in PostgreSQL uses **parameterized queries** (`$1`, `$2`, `$3`, etc.) throughout all database operations in `server/database.ts`.
- Direct string interpolation in SQL statements is strictly prohibited.
- Foreign keys enforce referential integrity and cascade deletion rules.

---

## 7. Payment Gateway Security

- The platform implements a clean `PaymentProvider` abstraction.
- In production, online checkout requires valid merchant credentials (`CMI_MERCHANT_ID`, `CMI_STORE_KEY`).
- Course enrollments are **never** unlocked via frontend query parameters (`?payment=success`). Enrollments are only granted upon server-side cryptographic webhook / transaction verification.
- In development/sandbox mode, transactions are created with status `pending` without fake automatic completion.
