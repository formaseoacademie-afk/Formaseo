-- =========================================================================
-- FORMASEO ACADÉMIE — PRODUCTION POSTGRESQL / SUPABASE DATABASE SCHEMA
-- =========================================================================

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. USERS TABLE
CREATE TABLE IF NOT EXISTS users (
    id VARCHAR(64) PRIMARY KEY DEFAULT uuid_generate_v4()::text,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    role VARCHAR(32) NOT NULL DEFAULT 'STUDENT' CHECK (role IN ('SUPER_ADMIN', 'ADMIN', 'INSTRUCTOR', 'STUDENT')),
    phone VARCHAR(64),
    avatar_url TEXT,
    bio TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);

-- 2. COURSE CATEGORIES
CREATE TABLE IF NOT EXISTS course_categories (
    id VARCHAR(64) PRIMARY KEY,
    name VARCHAR(128) NOT NULL,
    slug VARCHAR(128) UNIQUE NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. COURSES TABLE
CREATE TABLE IF NOT EXISTS courses (
    id VARCHAR(64) PRIMARY KEY,
    slug VARCHAR(128) UNIQUE NOT NULL,
    title VARCHAR(255) NOT NULL,
    short_description TEXT NOT NULL,
    full_description TEXT,
    category_id VARCHAR(64) REFERENCES course_categories(id) ON DELETE SET NULL,
    category_name VARCHAR(128) NOT NULL,
    level VARCHAR(64) DEFAULT 'Tous niveaux',
    duration VARCHAR(64) DEFAULT '5 semaines',
    duration_hours INT DEFAULT 30,
    price_mad NUMERIC(10,2) NOT NULL DEFAULT 4500.00,
    price_eur NUMERIC(10,2) NOT NULL DEFAULT 420.00,
    original_price_mad NUMERIC(10,2),
    rating NUMERIC(3,2) DEFAULT 4.9,
    review_count INT DEFAULT 0,
    student_count INT DEFAULT 0,
    thumbnail TEXT NOT NULL,
    instructor_id VARCHAR(64) REFERENCES users(id) ON DELETE SET NULL,
    instructor_name VARCHAR(255),
    instructor_role VARCHAR(255),
    published BOOLEAN DEFAULT true,
    badge VARCHAR(64),
    learning_outcomes JSONB DEFAULT '[]'::jsonb,
    prerequisites JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_courses_slug ON courses(slug);
CREATE INDEX IF NOT EXISTS idx_courses_published ON courses(published);

-- 4. MODULES TABLE
CREATE TABLE IF NOT EXISTS modules (
    id VARCHAR(64) PRIMARY KEY,
    course_id VARCHAR(64) NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    position INT NOT NULL DEFAULT 1,
    duration_hours INT DEFAULT 6,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_modules_course_id ON modules(course_id);

-- 5. LESSONS TABLE
CREATE TABLE IF NOT EXISTS lessons (
    id VARCHAR(64) PRIMARY KEY,
    module_id VARCHAR(64) NOT NULL REFERENCES modules(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    summary TEXT,
    description TEXT,
    content TEXT,
    video_url TEXT,
    duration VARCHAR(32) DEFAULT '30 min',
    duration_minutes INT DEFAULT 30,
    position INT NOT NULL DEFAULT 1,
    is_free_preview BOOLEAN DEFAULT false,
    type VARCHAR(32) DEFAULT 'video',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_lessons_module_id ON lessons(module_id);

-- 6. LESSON RESOURCES
CREATE TABLE IF NOT EXISTS lesson_resources (
    id VARCHAR(64) PRIMARY KEY,
    lesson_id VARCHAR(64) NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    url TEXT NOT NULL,
    type VARCHAR(32) DEFAULT 'pdf',
    file_size VARCHAR(32),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_lesson_resources_lesson_id ON lesson_resources(lesson_id);

-- 7. ENROLLMENTS TABLE
CREATE TABLE IF NOT EXISTS enrollments (
    id VARCHAR(64) PRIMARY KEY DEFAULT uuid_generate_v4()::text,
    user_id VARCHAR(64) NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    course_id VARCHAR(64) NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
    status VARCHAR(32) NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'completed', 'suspended', 'cancelled')),
    enrolled_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMP WITH TIME ZONE,
    CONSTRAINT unique_user_course_enrollment UNIQUE (user_id, course_id)
);

CREATE INDEX IF NOT EXISTS idx_enrollments_user ON enrollments(user_id);
CREATE INDEX IF NOT EXISTS idx_enrollments_course ON enrollments(course_id);

-- 8. LESSON PROGRESS TABLE
CREATE TABLE IF NOT EXISTS lesson_progress (
    id VARCHAR(64) PRIMARY KEY DEFAULT uuid_generate_v4()::text,
    user_id VARCHAR(64) NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    lesson_id VARCHAR(64) NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
    course_id VARCHAR(64) NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
    completed BOOLEAN NOT NULL DEFAULT false,
    progress_percent INT DEFAULT 0,
    last_watched_seconds INT DEFAULT 0,
    completed_at TIMESTAMP WITH TIME ZONE,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT unique_user_lesson_progress UNIQUE (user_id, lesson_id)
);

CREATE INDEX IF NOT EXISTS idx_lesson_progress_user_course ON lesson_progress(user_id, course_id);

-- 9. CERTIFICATES TABLE
CREATE TABLE IF NOT EXISTS certificates (
    id VARCHAR(64) PRIMARY KEY DEFAULT uuid_generate_v4()::text,
    certificate_number VARCHAR(64) UNIQUE NOT NULL,
    user_id VARCHAR(64) NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    course_id VARCHAR(64) NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
    student_name VARCHAR(255) NOT NULL,
    course_title VARCHAR(255) NOT NULL,
    issued_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    verification_token VARCHAR(128) UNIQUE NOT NULL,
    score NUMERIC(4,1) DEFAULT 100.0,
    CONSTRAINT unique_user_course_certificate UNIQUE (user_id, course_id)
);

CREATE INDEX IF NOT EXISTS idx_certificates_number ON certificates(certificate_number);
CREATE INDEX IF NOT EXISTS idx_certificates_token ON certificates(verification_token);

-- 10. PAYMENTS TABLE
CREATE TABLE IF NOT EXISTS payments (
    id VARCHAR(64) PRIMARY KEY DEFAULT uuid_generate_v4()::text,
    transaction_ref VARCHAR(128) UNIQUE NOT NULL,
    user_id VARCHAR(64) NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
    course_id VARCHAR(64) NOT NULL REFERENCES courses(id) ON DELETE RESTRICT,
    amount NUMERIC(10,2) NOT NULL,
    currency VARCHAR(8) NOT NULL DEFAULT 'MAD',
    provider VARCHAR(32) NOT NULL DEFAULT 'cmi',
    status VARCHAR(32) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'paid', 'failed', 'refunded', 'cancelled')),
    raw_response JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_payments_transaction_ref ON payments(transaction_ref);
CREATE INDEX IF NOT EXISTS idx_payments_user ON payments(user_id);

-- 11. ENQUIRIES / LEADS TABLE
CREATE TABLE IF NOT EXISTS enquiries (
    id VARCHAR(64) PRIMARY KEY DEFAULT uuid_generate_v4()::text,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(64) NOT NULL,
    profile_type VARCHAR(128),
    goal TEXT,
    preferred_format VARCHAR(128),
    status VARCHAR(32) NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'in_review', 'enrolled', 'archived')),
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_enquiries_status ON enquiries(status);
CREATE INDEX IF NOT EXISTS idx_enquiries_created ON enquiries(created_at DESC);

-- 12. FAQS TABLE
CREATE TABLE IF NOT EXISTS faqs (
    id VARCHAR(64) PRIMARY KEY DEFAULT uuid_generate_v4()::text,
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    category VARCHAR(128) NOT NULL DEFAULT 'Général',
    display_order INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 13. SETTINGS TABLE
CREATE TABLE IF NOT EXISTS settings (
    key VARCHAR(64) PRIMARY KEY,
    value JSONB NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 14. OWNER CHECKLIST TABLE
CREATE TABLE IF NOT EXISTS checklist (
    id VARCHAR(64) PRIMARY KEY,
    label TEXT NOT NULL,
    status VARCHAR(32) NOT NULL DEFAULT 'en_attente',
    notes TEXT,
    category VARCHAR(128) DEFAULT 'Lancement',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
