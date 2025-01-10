# Quiz Backend

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a .env file with your database configuration:
```env
DATABASE_URL="mysql://user:password@localhost:3306/quiz_db"
JWT_SECRET="your-secret-key"
PORT=5000
```

3. Generate Prisma client:
```bash
npm run prisma:generate
```

4. Push database schema:
```bash
npm run prisma:push
```

5. Start development server:
```bash
npm run dev
```

## API Routes

- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `GET /api/subjects` - Get all subjects
- `POST /api/subjects` - Create new subject (admin only)
- `GET /api/topics/:subjectId` - Get topics by subject
- `POST /api/topics` - Create new topic (admin only)
- `GET /api/questions/:topicId` - Get questions by topic
- `POST /api/questions` - Create new question (admin only)