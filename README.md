# 🏦 Financial Health Score Platform
**IDBI Innovate 2026 Hackathon**

AI-powered financial health assessment for MSMEs using GST, UPI, and EPFO data.

## 📁 Project Structure

```
financial-health-score/
├── fhs-frontend/          # React 18 + TypeScript + Tailwind
├── fhs-backend/           # Node.js + Express + Sequelize
├── docs/                  # Documentation
├── database/              # MySQL schema
├── .env.example           # Environment template
└── README.md              # This file
```

## 🚀 Quick Start

### Prerequisites
- Node.js v16+ (https://nodejs.org)
- MySQL (https://www.mysql.com/downloads/)
- VS Code (https://code.visualstudio.com/)
- Git (https://git-scm.com/)

### Setup Instructions

1. **Install Dependencies**
   ```bash
   # Frontend
   cd fhs-frontend
   npm install

   # Backend (in new terminal)
   cd fhs-backend
   npm install
   ```

2. **Database Setup**
   ```bash
   # Open MySQL and run:
   mysql -u root -p < ../database/schema.sql
   ```

3. **Environment Variables**
   - Copy `.env.example` to `.env` in both frontend and backend
   - Update credentials

4. **Run Development Servers**
   ```bash
   # Terminal 1 - Frontend
   cd fhs-frontend
   npm run dev

   # Terminal 2 - Backend
   cd fhs-backend
   npm run dev

   # Terminal 3 - MySQL
   # Keep MySQL server running
   ```

5. **Access Application**
   - Frontend: http://localhost:5173
   - Backend: http://localhost:3000
   - API Health: http://localhost:3000/api/health

## 📋 Features (Phase 1 - MVP)

- [x] User Registration & Login
- [x] Business Details Form
- [x] GST Data Integration
- [x] Score Calculation Engine
- [x] Dashboard with Visualizations
- [x] Loan Eligibility Matrix
- [x] User Settings

## 🛠️ Tech Stack

**Frontend:**
- React 18
- TypeScript
- Tailwind CSS
- Recharts (Charts)
- Axios (HTTP)
- React Router

**Backend:**
- Node.js
- Express.js
- Sequelize ORM
- MySQL
- JWT Authentication
- bcryptjs (Password hashing)

**Deployment:**
- Frontend: Vercel (https://vercel.com)
- Backend: Railway (https://railway.app)
- Database: Vercel Postgres or MySQL hosting

## 📚 Documentation

- `/docs/API.md` - API endpoints documentation
- `/docs/DATABASE.md` - Database schema details
- `/docs/FEATURES.md` - Feature detailed specifications

## 🔄 Git Workflow

```bash
# Initialize git
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: FHS platform setup"

# Add remote (after creating GitHub repo)
git remote add origin <your-repo-url>

# Push to GitHub
git push -u origin main
```

## 👥 Team

- **Role**: Full-stack developer
- **Timeline**: 4-day hackathon
- **Goal**: Build working MVP with beautiful UI

## 📞 Support

For setup issues:
1. Check `SETUP_GUIDE.md` in root directory
2. Check backend logs
3. Verify MySQL is running
4. Check environment variables

## 📄 License

This project is for IDBI Innovate 2026 Hackathon.

---

**Status**: 🚧 In Development
**Last Updated**: 2026-06-23
