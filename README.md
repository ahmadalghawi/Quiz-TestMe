# Quiz-TestMe
# Arabic Quiz Platform (اختبرني)

An interactive educational platform for Arabic-speaking students to test their knowledge across various subjects.

![Quiz Platform Screenshot](https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa)

## Features

- 🎯 Interactive quizzes in multiple subjects (Physics, Mathematics, Chemistry, etc.)
- 🌙 Dark/Light mode support
- 🌐 Bilingual support (Arabic/English)
- ⏱️ Timed quizzes with customizable duration
- 📊 Instant feedback and detailed results
- 👥 User roles (Student/Admin)
- 📱 Responsive design for all devices

## Tech Stack

- **Frontend:**
  - React 18
  - TypeScript
  - Tailwind CSS
  - Zustand (State Management)
  - React Router v6
  - React Hook Form + Zod

- **Backend:**
  - Node.js
  - Express
  - Prisma ORM
  - MySQL Database
  - JWT Authentication

## Getting Started

### Prerequisites

- Node.js 18+
- MySQL Database
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/arabic-quiz-platform.git
cd arabic-quiz-platform
```

2. Install dependencies:
```bash
# Install frontend dependencies
npm install

# Install backend dependencies
cd server
npm install
```

3. Set up environment variables:

Create `.env` file in the root directory:
```env
VITE_API_URL=http://localhost:5000/api
```

Create `server/.env` file:
```env
DATABASE_URL="mysql://user:password@localhost:3306/quiz_db"
JWT_SECRET="your-super-secret-key-here"
PORT=5000
```

4. Set up the database:
```bash
cd server
npx prisma generate
npx prisma db push
```

5. Seed the database:
```bash
npm run seed
```

### Running the Application

1. Start the backend server:
```bash
cd server
npm run dev
```

2. Start the frontend development server:
```bash
# From the root directory
npm run dev
```

The application will be available at `http://localhost:5173`

### Default Users

- Admin:
  - Email: admin@example.com
  - Password: admin123

- Student:
  - Email: student@example.com
  - Password: student123

## Project Structure

```
├── src/
│   ├── components/     # Reusable UI components
│   ├── pages/         # Page components
│   ├── store/         # Zustand store configurations
│   ├── services/      # API service functions
│   ├── types/         # TypeScript type definitions
│   └── utils/         # Utility functions
├── server/
│   ├── prisma/        # Database schema and migrations
│   ├── routes/        # API route handlers
│   └── middleware/    # Express middleware
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Lucide Icons](https://lucide.dev/) for beautiful icons
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Unsplash](https://unsplash.com/) for images