import { db } from './database';
import bcrypt from 'bcryptjs';

export async function seedDevelopmentData(): Promise<void> {
  if (process.env.NODE_ENV === 'production') {
    console.warn('⚠️ seedDevelopmentData is disabled in production environment.');
    return;
  }

  console.log('🌱 Seeding local development accounts...');

  const devAdminPass = process.env.DEV_ADMIN_PASSWORD || 'DevAdminPass123!';
  const devStudentPass = process.env.DEV_STUDENT_PASSWORD || 'DevStudentPass123!';

  const adminHash = await bcrypt.hash(devAdminPass, 10);
  const studentHash = await bcrypt.hash(devStudentPass, 10);

  const existingAdmin = await db.getUserByEmail('admin@formaseo.ma');
  if (!existingAdmin) {
    await db.createUser({
      email: 'admin@formaseo.ma',
      name: 'Direction FormaSEO',
      passwordHash: adminHash,
      role: 'SUPER_ADMIN',
      phone: '+212 522-000000',
      bio: 'Administrateur de l’Académie FormaSEO Casablanca.',
    });
    console.log('✅ Created local dev Super Admin account (admin@formaseo.ma)');
  }

  const existingStudent = await db.getUserByEmail('etudiant@formaseo.ma');
  if (!existingStudent) {
    const student = await db.createUser({
      email: 'etudiant@formaseo.ma',
      name: 'Karim Mansouri',
      passwordHash: studentHash,
      role: 'STUDENT',
      phone: '+212 661-234567',
      bio: 'Étudiant en reconversion professionnelle SEO & Marketing Digital.',
    });

    // Create a demo certificate for development inspection
    db.issueCertificate(student.id, 'course-seo-casablanca');
    console.log('✅ Created local dev Student account (etudiant@formaseo.ma)');
  }

  console.log('✨ Development seeding completed.');
}

if (process.argv[1] && process.argv[1].endsWith('seedDev.ts')) {
  seedDevelopmentData()
    .then(() => process.exit(0))
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
}
