import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { mockSubjects } from '../../src/data/mockData';

const prisma = new PrismaClient();

async function main() {
//   // Create default users
  const adminPassword = await bcrypt.hash('admin123', 10);
  const studentPassword = await bcrypt.hash('student123', 10);

  await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      email: 'admin@example.com',
      name: 'Admin User',
      password: adminPassword,
      role: 'admin',
    },
  });

  await prisma.user.upsert({
    where: { email: 'student@example.com' },
    update: {},
    create: {
      email: 'student@example.com',
      name: 'Student User',
      password: studentPassword,
      role: 'student',
    },
  });

  // Seed subjects, topics, and questions
  for (const subject of mockSubjects) {
    const createdSubject = await prisma.subject.create({
      data: {
        name: subject.name,
        nameAr: subject.nameAr,
        imageUrl: subject.imageUrl,
      },
    });

    for (const topic of subject.topics) {
      const createdTopic = await prisma.topic.create({
        data: {
          name: topic.name,
          nameAr: topic.nameAr,
          subjectId: createdSubject.id,
        },
      });

      for (const question of topic.questions) {
        await prisma.question.create({
          data: {
            text: question.text,
            textAr: question.textAr,
            difficulty: question.difficulty,
            options: question.options,
            correctOptionId: question.correctOptionId,
            topicId: createdTopic.id,
          },
        });
      }
    }
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });