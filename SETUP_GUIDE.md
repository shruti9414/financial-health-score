# 🚀 Financial Health Score - Complete Setup Guide

**IDBI Innovate 2026 Hackathon**

---

## **📋 Pre-Setup Checklist**

Before starting, ensure you have installed:

```
✓ Node.js v16+ (https://nodejs.org)
  - Verify: node --version  &  npm --version

✓ MySQL (https://www.mysql.com/downloads)
  - Verify: mysql --version

✓ Git (https://git-scm.com)
  - Verify: git --version

✓ VS Code (https://code.visualstudio.com) - Optional but recommended
```

---

## **🛠️ Step-by-Step Setup**

### **Step 1: Create MySQL Database**

**Option A: Using MySQL Workbench (GUI)**

1. Open MySQL Workbench
2. Click on File → Open SQL Script
3. Navigate to `financial-health-score/database/schema.sql`
4. Click Execute (⚡ icon)
5. Done! ✓

**Option B: Using Command Line**

```bash
# Open command prompt and navigate to project
cd C:\Users\Admin\Documents\financial-health-score

# Run MySQL
mysql -u root -p < database/schema.sql

# Enter password when prompted (leave empty if no password)
```

**Option C: Manual (Step by step)**

1. Open MySQL command line:
   ```bash
   mysql -u root -p
   ```

2. Copy-paste the SQL from `database/schema.sql`
3. Press Enter
4. Verify tables created:
   ```sql
   USE financial_health_score;
   SHOW TABLES;
   ```

**Verify Success:**
```bash
mysql -u root -p -e "SHOW DATABASES LIKE 'financial_health_score';"
```

Expected output:
```
+---------------------------+
| Database                  |
+---------------------------+
| financial_health_score    |
+---------------------------+
```

---

### **Step 2: Frontend Setup**

Open **Terminal 1**:

```bash
# Navigate to frontend
cd C:\Users\Admin\Documents\financial-health-score\fhs-frontend

# Install dependencies (this will take 2-3 minutes)
npm install

# Check Tailwind installation
npm list tailwindcss

# Start development server
npm run dev
```

**Expected Output:**
```
  VITE v5.0.0  ready in 250 ms

  ➜  Local:   http://localhost:5173/
  ➜  press h to show help
```

**Verify in Browser:**
- Open: http://localhost:5173
- You should see the FHS welcome page
- Server Status should show (will be "Not Connected" until backend starts)

---

### **Step 3: Backend Setup**

Open **Terminal 2**:

```bash
# Navigate to backend
cd C:\Users\Admin\Documents\financial-health-score\fhs-backend

# Install dependencies (this will take 2-3 minutes)
npm install

# Verify TypeScript
npm list typescript

# Start development server
npm run dev
```

**Expected Output:**
```
✓ Database connection successful
✓ Database synchronized
🚀 Server running on http://localhost:3000
📡 API: http://localhost:3000/api
✓ CORS enabled for: http://localhost:5173
```

**Verify API:**
Open browser and go to: http://localhost:3000/api/health

Expected Response:
```json
{
  "message": "Server is running!",
  "status": "OK",
  "timestamp": "2026-06-23T10:30:00.000Z"
}
```

---

### **Step 4: Verify Full Setup**

**Terminal 3** (Optional - Monitor MySQL):

```bash
# Keep MySQL running
# If using XAMPP: Start MySQL from XAMPP Control Panel
# If using MySQL installer: Services should be running automatically
```

**Check Frontend:**
- Refresh http://localhost:5173
- Server Status should now show: ✓ Connected
- If not, check backend is running

---

## **✅ Setup Complete Checklist**

After all steps, verify:

```
✓ MySQL Database
  - [✓] Database "financial_health_score" exists
  - [✓] All 10 tables created
  - [✓] Can connect: mysql -u root -p financial_health_score

✓ Frontend
  - [✓] npm install successful
  - [✓] http://localhost:5173 loads without errors
  - [✓] No TypeScript errors in VS Code

✓ Backend
  - [✓] npm install successful
  - [✓] http://localhost:3000/api/health responds
  - [✓] Database connection successful in terminal

✓ Communication
  - [✓] Frontend Server Status = "✓ Connected"
  - [✓] No CORS errors in browser console
```

---

## **🐛 Troubleshooting**

### **Issue 1: MySQL Connection Failed**

```
Error: connect ECONNREFUSED 127.0.0.1:3306
```

**Solution:**
```bash
# Check if MySQL is running
# Windows: Open Services app, search for MySQL80, ensure it's running

# Or start MySQL from XAMPP Control Panel
# Or run: net start MySQL80

# Test connection:
mysql -u root -p
```

---

### **Issue 2: Port Already in Use (3000)**

```
Error: listen EADDRINUSE :::3000
```

**Solution:**
```bash
# Option A: Use different port
# Edit fhs-backend/.env and change PORT=3001

# Option B: Kill process using port 3000
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

---

### **Issue 3: npm install fails**

```
npm ERR! code ERESOLVE
npm ERR! ERESOLVE could not resolve dependency tree
```

**Solution:**
```bash
# Clear npm cache
npm cache clean --force

# Try with legacy peer deps
npm install --legacy-peer-deps

# Or use npm 7+ (which handles this better)
npm install
```

---

### **Issue 4: TypeScript Errors**

```
error TS7016: Could not find a declaration file for module 'express'
```

**Solution:**
```bash
# Install type definitions
npm install -D @types/express @types/node

# Or restart VS Code
# Or run: npm run build
```

---

### **Issue 5: Tailwind CSS not applied**

```
Frontend loads but styles are not applied
```

**Solution:**
```bash
# In fhs-frontend folder:
npm install -D tailwindcss postcss autoprefixer

# Regenerate config:
npx tailwindcss init -p

# Restart frontend: npm run dev
```

---

### **Issue 6: CORS Errors**

```
Access to XMLHttpRequest blocked by CORS policy
```

**Solution:**
- Ensure backend is running on port 3000
- Check .env files have correct URLs
- Restart both frontend and backend

---

## **📁 Final Project Structure**

```
C:\Users\Admin\Documents\financial-health-score\
│
├── fhs-frontend/                 # React App
│   ├── src/
│   │   ├── main.tsx              # Entry point
│   │   ├── App.tsx               # Main component
│   │   └── index.css             # Styles
│   ├── package.json
│   ├── vite.config.ts
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   ├── tsconfig.json
│   ├── index.html
│   └── .env.local
│
├── fhs-backend/                  # Node.js API
│   ├── src/
│   │   ├── server.ts             # Main server
│   │   └── config/
│   │       └── database.ts       # DB config
│   ├── package.json
│   ├── tsconfig.json
│   ├── .env                      # Environment vars
│   └── node_modules/             # Dependencies (after npm install)
│
├── database/
│   └── schema.sql                # MySQL schema
│
├── .env.example                  # Environment template
├── README.md                      # Main documentation
├── SETUP_GUIDE.md                # This file
└── node_modules/                 # (if npm install run in root)
```

---

## **🎯 Running for Development**

**Every time you start development:**

```bash
# Terminal 1 - Frontend
cd C:\Users\Admin\Documents\financial-health-score\fhs-frontend
npm run dev

# Terminal 2 - Backend
cd C:\Users\Admin\Documents\financial-health-score\fhs-backend
npm run dev

# Terminal 3 - MySQL (keep running)
# Ensure MySQL service is running
```

**Access Points:**
- Frontend: http://localhost:5173
- Backend API: http://localhost:3000/api
- API Health Check: http://localhost:3000/api/health

---

## **🚀 Next Steps**

Once setup is complete:

1. ✓ Setup complete!
2. Create user registration API
3. Create login/authentication
4. Build database models
5. Create score calculation algorithm
6. Build dashboard UI
7. Add visualizations
8. Test full flow
9. Deploy to production

---

## **📞 Help & Support**

If you encounter issues:

1. **Check logs** in both terminal windows
2. **Read error messages** carefully (they usually tell you the problem)
3. **Verify all prerequisites** are installed
4. **Check ports** (3000, 5173, 3306) are available
5. **Restart services** - sometimes a restart fixes things

---

## **✨ You're All Set!**

```
✓ Database: Ready
✓ Frontend: Running on port 5173
✓ Backend: Running on port 3000
✓ Ready to code!

Happy coding! 🎉
```

---

**Created**: 2026-06-23
**Version**: 1.0.0
**Status**: Setup Complete ✓
