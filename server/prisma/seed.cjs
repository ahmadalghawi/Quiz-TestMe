const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const mockSubjects = [
  {
    id: '1',
    name: 'Physics',
    nameAr: 'الفيزياء',
    imageUrl: 'https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa',
    topics: [
      {
        id: '1-1',
        name: 'Forces and Motion',
        nameAr: 'القوى والحركة',
        questions: [
          {
            id: '1-1-1',
            text: 'Calculate the force needed to accelerate a 2kg mass at 5 m/s²',
            textAr: 'احسب القوة اللازمة لتسريع كتلة 2 كجم بمعدل 5 متر/ثانية²',
            difficulty: 'medium',
            options: [
              { id: '1', text: '10 N', textAr: '١٠ نيوتن' },
              { id: '2', text: '7 N', textAr: '٧ نيوتن' },
              { id: '3', text: '15 N', textAr: '١٥ نيوتن' },
              { id: '4', text: '20 N', textAr: '٢٠ نيوتن' }
            ],
            correctOptionId: '1'
          },
          {
            id: '1-1-2',
            text: 'What is the SI unit of force?',
            textAr: 'ما هي وحدة القوة في النظام الدولي؟',
            difficulty: 'easy',
            options: [
              { id: '1', text: 'Newton', textAr: 'نيوتن' },
              { id: '2', text: 'Joule', textAr: 'جول' },
              { id: '3', text: 'Pascal', textAr: 'باسكال' },
              { id: '4', text: 'Watt', textAr: 'واط' }
            ],
            correctOptionId: '1'
          }
        ]
      }
    ]
  },
  {
    id: '2',
    name: 'Mathematics',
    nameAr: 'الرياضيات',
    imageUrl: 'https://images.unsplash.com/photo-1509228468518-180dd4864904',
    topics: [
      {
        id: '2-1',
        name: 'Algebra',
        nameAr: 'الجبر',
        questions: [
          {
            id: '2-1-1',
            text: 'Solve for x: 2x + 5 = 13',
            textAr: 'حل المعادلة: ٢س + ٥ = ١٣',
            difficulty: 'easy',
            options: [
              { id: '1', text: '4', textAr: '٤' },
              { id: '2', text: '3', textAr: '٣' },
              { id: '3', text: '8', textAr: '٨' },
              { id: '4', text: '6', textAr: '٦' }
            ],
            correctOptionId: '1'
          },
          {
            id: '2-1-2',
            text: 'Factorize: x² - 4',
            textAr: 'حلل العبارة: س² - ٤',
            difficulty: 'medium',
            options: [
              { id: '1', text: '(x+2)(x-2)', textAr: '(س+٢)(س-٢)' },
              { id: '2', text: '(x+4)(x-1)', textAr: '(س+٤)(س-١)' },
              { id: '3', text: '(x+1)(x-4)', textAr: '(س+١)(س-٤)' },
              { id: '4', text: '(x+3)(x-3)', textAr: '(س+٣)(س-٣)' }
            ],
            correctOptionId: '1'
          }
        ]
      },
      {
        id: '2-2',
        name: 'Geometry',
        nameAr: 'الهندسة',
        questions: [
          {
            id: '2-2-1',
            text: 'What is the area of a circle with radius 5 units?',
            textAr: 'ما هي مساحة دائرة نصف قطرها ٥ وحدات؟',
            difficulty: 'medium',
            options: [
              { id: '1', text: '78.54', textAr: '٧٨.٥٤' },
              { id: '2', text: '31.42', textAr: '٣١.٤٢' },
              { id: '3', text: '25.13', textAr: '٢٥.١٣' },
              { id: '4', text: '15.71', textAr: '١٥.٧١' }
            ],
            correctOptionId: '1'
          },
          {
            id: '2-2-2',
            text: 'What is the sum of angles in a triangle?',
            textAr: 'ما مجموع زوايا المثلث؟',
            difficulty: 'easy',
            options: [
              { id: '1', text: '180°', textAr: '١٨٠°' },
              { id: '2', text: '360°', textAr: '٣٦٠°' },
              { id: '3', text: '90°', textAr: '٩٠°' },
              { id: '4', text: '270°', textAr: '٢٧٠°' }
            ],
            correctOptionId: '1'
          }
        ]
      }
    ]
  },
  {
    id: '3',
    name: 'Chemistry',
    nameAr: 'الكيمياء',
    imageUrl: 'https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6',
    topics: [
      {
        id: '3-1',
        name: 'Periodic Table',
        nameAr: 'الجدول الدوري',
        questions: [
          {
            id: '3-1-1',
            text: 'What is the atomic number of Oxygen?',
            textAr: 'ما هو العدد الذري للأكسجين؟',
            difficulty: 'easy',
            options: [
              { id: '1', text: '8', textAr: '٨' },
              { id: '2', text: '6', textAr: '٦' },
              { id: '3', text: '7', textAr: '٧' },
              { id: '4', text: '9', textAr: '٩' }
            ],
            correctOptionId: '1'
          },
          {
            id: '3-1-2',
            text: 'Which element has the symbol Fe?',
            textAr: 'ما هو العنصر الذي رمزه Fe؟',
            difficulty: 'medium',
            options: [
              { id: '1', text: 'Iron', textAr: 'الحديد' },
              { id: '2', text: 'Fluorine', textAr: 'الفلور' },
              { id: '3', text: 'Francium', textAr: 'الفرانسيوم' },
              { id: '4', text: 'Fermium', textAr: 'الفيرميوم' }
            ],
            correctOptionId: '1'
          }
        ]
      },
      {
        id: '3-2',
        name: 'Chemical Bonds',
        nameAr: 'الروابط الكيميائية',
        questions: [
          {
            id: '3-2-1',
            text: 'What type of bond forms between sodium and chlorine?',
            textAr: 'ما نوع الرابطة التي تتشكل بين الصوديوم والكلور؟',
            difficulty: 'hard',
            options: [
              { id: '1', text: 'Ionic bond', textAr: 'رابطة أيونية' },
              { id: '2', text: 'Covalent bond', textAr: 'رابطة تساهمية' },
              { id: '3', text: 'Metallic bond', textAr: 'رابطة فلزية' },
              { id: '4', text: 'Hydrogen bond', textAr: 'رابطة هيدروجينية' }
            ],
            correctOptionId: '1'
          }
        ]
      }
    ]
  },
  {
    id: '4',
    name: 'Biology',
    nameAr: 'الأحياء',
    imageUrl: 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8',
    topics: [
      {
        id: '4-1',
        name: 'Cell Biology',
        nameAr: 'بيولوجيا الخلية',
        questions: [
          {
            id: '4-1-1',
            text: 'What is the function of mitochondria?',
            textAr: 'ما هي وظيفة الميتوكوندريا؟',
            difficulty: 'medium',
            options: [
              { id: '1', text: 'Energy production', textAr: 'إنتاج الطاقة' },
              { id: '2', text: 'Protein synthesis', textAr: 'تصنيع البروتين' },
              { id: '3', text: 'Waste removal', textAr: 'إزالة النفايات' },
              { id: '4', text: 'Storage', textAr: 'التخزين' }
            ],
            correctOptionId: '1'
          }
        ]
      }
    ]
  }
];

const prisma = new PrismaClient();

async function main() {
  // Create default users
  const adminPassword = await bcrypt.hash('password123', 10);
  const studentPassword = await bcrypt.hash('password123', 10);

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
    await prisma.subject.create({
      data: {
        name: subject.name,
        nameAr: subject.nameAr,
        imageUrl: subject.imageUrl,
        topics: {
          create: subject.topics.map((topic) => ({
            name: topic.name,
            nameAr: topic.nameAr,
            questions: {
              create: topic.questions.map((question) => ({
                text: question.text,
                textAr: question.textAr,
                difficulty: question.difficulty,
                options: question.options,
                correctOptionId: question.correctOptionId
              }))
            }
          }))
        }
      }
    });
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